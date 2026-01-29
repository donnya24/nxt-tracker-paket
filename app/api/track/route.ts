import { NextRequest, NextResponse } from "next/server";

interface TrackingRequest {
  waybill: string;
  courier: string;
}

// Di bagian atas file, update VALID_COURIERS:
const VALID_COURIERS = [
  // Populer
  "jne",
  "tiki",
  "pos",
  "jnt",
  "sicepat",
  "anteraja",
  "wahana",
  "ninja",
  "lion",
  // Express
  "rex",
  "ide",
  "spx",
  "jet",
  "pcp",
  "jxe",
  // Cargo
  "jntcargo",
  "indah",
  "dakota",
  // E-commerce
  "kgx",
  "sap",
  "rpx",
  "lazada",
  "first",
];

// Rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 30;
const RATE_LIMIT_WINDOW = 60 * 1000;

// Fungsi untuk mengubah error message menjadi user-friendly
const getFriendlyErrorMessage = (
  errorType: string,
  details?: string,
): string => {
  switch (errorType) {
    case "RATE_LIMIT":
      return "Terlalu banyak permintaan. Silakan tunggu beberapa saat dan coba lagi.";

    case "MISSING_FIELDS":
      return "Nomor resi dan kurir wajib diisi.";

    case "INVALID_WAYBILL_SHORT":
      return "Nomor resi terlalu pendek. Minimal 5 karakter.";

    case "INVALID_WAYBILL_LONG":
      return "Nomor resi terlalu panjang. Maksimal 50 karakter.";

    case "INVALID_COURIER":
      return "Kurir yang dipilih tidak didukung.";

    case "API_KEY_MISSING":
      return "Sistem sedang dalam pemeliharaan. Silakan coba lagi nanti.";

    case "API_TIMEOUT":
      return "Waktu pencarian habis. Silakan coba lagi.";

    case "API_NOT_FOUND":
      return "Nomor resi tidak ditemukan dalam sistem kurir.";

    case "API_BAD_REQUEST":
      return "Format nomor resi atau kurir tidak valid.";

    case "API_ERROR":
      return `Gagal menghubungi sistem kurir: ${details || "Silakan coba lagi."}`;

    case "SERVER_ERROR":
      return "Terjadi kesalahan pada server. Silakan coba beberapa saat lagi.";

    default:
      return "Terjadi kesalahan. Silakan coba lagi.";
  }
};

export async function POST(request: NextRequest) {
  try {
    // Rate limiting dengan IP detection yang lebih baik
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ip = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : realIp || "unknown";

    const now = Date.now();
    const userRate = rateLimit.get(ip);

    if (userRate) {
      if (userRate.resetTime < now) {
        rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      } else if (userRate.count >= RATE_LIMIT) {
        return NextResponse.json(
          {
            status: 429,
            success: false,
            message: getFriendlyErrorMessage("RATE_LIMIT"),
            data: null,
          },
          { status: 429 },
        );
      } else {
        userRate.count++;
        rateLimit.set(ip, userRate);
      }
    } else {
      rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }

    // Parse request body
    let body: TrackingRequest;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: "Format permintaan tidak valid.",
          data: null,
        },
        { status: 400 },
      );
    }

    const { waybill, courier } = body;

    // Validation
    if (!waybill || !courier) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: getFriendlyErrorMessage("MISSING_FIELDS"),
          data: null,
        },
        { status: 400 },
      );
    }

    // Validasi format nomor resi
    const trimmedWaybill = waybill.trim();
    if (trimmedWaybill.length < 5) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: getFriendlyErrorMessage("INVALID_WAYBILL_SHORT"),
          data: null,
        },
        { status: 400 },
      );
    }

    if (trimmedWaybill.length > 50) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: getFriendlyErrorMessage("INVALID_WAYBILL_LONG"),
          data: null,
        },
        { status: 400 },
      );
    }

    // Validasi kurir
    const lowerCourier = courier.toLowerCase();
    if (!VALID_COURIERS.includes(lowerCourier)) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: getFriendlyErrorMessage("INVALID_COURIER"),
          data: null,
        },
        { status: 400 },
      );
    }

    // API Key
    const apiKey =
      process.env.BINDERBYTE_API_KEY ||
      process.env.NEXT_PUBLIC_BINDERBYTE_API_KEY;

    // Jika API key tidak ada atau demo mode, gunakan mock data
    if (!apiKey || apiKey === "your_api_key_here" || apiKey === "demo") {
      const mockData = getMockTrackingData(trimmedWaybill, courier);
      return NextResponse.json({
        ...mockData,
        success: true,
        note: "Data demo - Gunakan API key asli untuk data real-time",
      });
    }

    // Call BinderByte API dengan timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 detik timeout

    try {
      const params = new URLSearchParams({
        api_key: apiKey,
        courier: lowerCourier,
        awb: trimmedWaybill,
      });

      const response = await fetch(
        `https://api.binderbyte.com/v1/track?${params}`,
        {
          headers: {
            Accept: "application/json",
            "User-Agent": "PackageTracker/1.0",
          },
          signal: controller.signal,
          cache: "no-store",
        },
      );

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        let errorType = "API_ERROR";
        let errorDetails = response.statusText;

        if (response.status === 404) {
          errorType = "API_NOT_FOUND";
          errorDetails = "Data tidak ditemukan";
        } else if (response.status === 400) {
          errorType = "API_BAD_REQUEST";
        } else if (response.status === 429) {
          errorType = "RATE_LIMIT";
        }

        return NextResponse.json(
          {
            status: response.status,
            success: false,
            message: getFriendlyErrorMessage(errorType, errorDetails),
            data: null,
          },
          { status: response.status },
        );
      }

      // Handle jika BinderByte return error dalam response body
      if (data.status && data.status !== 200 && data.status !== "success") {
        return NextResponse.json(
          {
            status: 400,
            success: false,
            message: data.message || getFriendlyErrorMessage("API_NOT_FOUND"),
            data: null,
          },
          { status: 400 },
        );
      }

      // Format response yang konsisten
      return NextResponse.json({
        status: 200,
        success: true,
        message: "Berhasil mendapatkan data tracking",
        data: data.data || data,
      });
    } catch (fetchError: any) {
      clearTimeout(timeoutId);

      if (fetchError.name === "AbortError") {
        return NextResponse.json(
          {
            status: 408,
            success: false,
            message: getFriendlyErrorMessage("API_TIMEOUT"),
            data: null,
          },
          { status: 408 },
        );
      }

      throw fetchError;
    }
  } catch (error: any) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        status: 500,
        success: false,
        message: getFriendlyErrorMessage("SERVER_ERROR"),
        data: null,
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    name: "Package Tracker API",
    version: "1.0.0",
    description: "API untuk melacak paket dari berbagai kurir Indonesia",
    supported_couriers: VALID_COURIERS.map((c) => c.toUpperCase()),
    timestamp: new Date().toISOString(),
    endpoints: {
      track: "POST /api/track",
      status: "GET /api/track",
    },
  });
}

// Mock data function yang lebih baik
function getMockTrackingData(waybill: string, courier: string) {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

  const formatDate = (date: Date) =>
    date.toISOString().replace("T", " ").substring(0, 19);

  const mockHistory = [
    {
      date: formatDate(twoDaysAgo),
      desc: `Paket diterima di gerai ${getCityByCourier(courier)}`,
      location: getCityByCourier(courier),
    },
    {
      date: formatDate(yesterday),
      desc: `Paket dalam proses sortir di hub ${getCityByCourier(courier)}`,
      location: getCityByCourier(courier),
    },
    {
      date: formatDate(now),
      desc: `Paket sedang dalam perjalanan ke tujuan`,
      location: "Dalam perjalanan",
    },
  ];

  return {
    status: 200,
    data: {
      summary: {
        awb: waybill,
        courier: courier.toUpperCase(),
        service: "REGULAR",
        status: "ON PROCESS",
        date: formatDate(now),
        desc: "Paket sedang dalam proses pengiriman",
        amount: "25000",
        weight: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 9)} kg`,
      },
      detail: {
        origin: `${getCityByCourier(courier)}, INDONESIA`,
        destination: `${getRandomCity()}, INDONESIA`,
        shipper: "TOKO ONLINE EXAMPLE",
        receiver: "CUSTOMER EXAMPLE",
      },
      history: mockHistory,
    },
  };
}

// Helper functions
function getCityByCourier(courier: string): string {
  const cities: Record<string, string> = {
    jne: "JAKARTA",
    tiki: "SURABAYA",
    pos: "BANDUNG",
    jnt: "JAKARTA",
    sicepat: "BOGOR",
    anteraja: "JAKARTA",
    wahana: "SEMARANG",
    ninja: "JAKARTA",
    lion: "JAKARTA",
  };
  return cities[courier.toLowerCase()] || "JAKARTA";
}

function getRandomCity(): string {
  const cities = [
    "BANDUNG",
    "SURABAYA",
    "SEMARANG",
    "YOGYAKARTA",
    "MALANG",
    "DENPASAR",
    "MAKASSAR",
  ];
  return cities[Math.floor(Math.random() * cities.length)];
}
