import { NextRequest, NextResponse } from "next/server";

interface TrackingRequest {
  waybill: string;
  courier: string;
}

// Di bagian atas file, update VALID_COURIERS:
const VALID_COURIERS = [
  // Populer
  'jne', 'tiki', 'pos', 'jnt', 'sicepat', 'anteraja', 'wahana', 'ninja', 'lion',
  // Express
  'rex', 'ide', 'spx', 'jet', 'pcp', 'jxe',
  // Cargo
  'jntcargo', 'indah', 'dakota',
  // E-commerce
  'shopeexpress', 'kgx', 'sap', 'rpx', 'lazada', 'first'
];

// Rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 30;
const RATE_LIMIT_WINDOW = 60 * 1000;

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "unknown";

    const now = Date.now();
    const userRate = rateLimit.get(ip);

    if (userRate) {
      if (userRate.resetTime < now) {
        rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      } else if (userRate.count >= RATE_LIMIT) {
        return NextResponse.json(
          {
            status: 429,
            message: "Terlalu banyak permintaan. Silakan coba lagi nanti.",
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
    const body: TrackingRequest = await request.json();
    const { waybill, courier } = body;

    // Validation
    if (!waybill || !courier) {
      return NextResponse.json(
        {
          status: 400,
          message: "Nomor resi dan kurir harus diisi",
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
          message: "Nomor resi terlalu pendek. Minimal 5 karakter",
          data: null,
        },
        { status: 400 },
      );
    }

    if (trimmedWaybill.length > 50) {
      return NextResponse.json(
        {
          status: 400,
          message: "Nomor resi terlalu panjang. Maksimal 50 karakter",
          data: null,
        },
        { status: 400 },
      );
    }

    // Validasi kurir
    if (!VALID_COURIERS.includes(courier.toLowerCase())) {
      return NextResponse.json(
        {
          status: 400,
          message: "Kurir tidak didukung",
          data: null,
        },
        { status: 400 },
      );
    }

    // API Key
    const apiKey = process.env.NEXT_PUBLIC_BINDERBYTE_API_KEY;
    const baseUrl =
      process.env.NEXT_PUBLIC_BINDERBYTE_BASE_URL ||
      "https://api.binderbyte.com/v1";

    // Jika API key tidak ada atau demo mode, gunakan mock data
    if (!apiKey || apiKey === "your_api_key_here") {
      const mockData = getMockTrackingData(trimmedWaybill, courier);
      return NextResponse.json(mockData);
    }

    // Call BinderByte API dengan timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 detik timeout

    try {
      const params = new URLSearchParams({
        api_key: apiKey,
        courier: courier.toLowerCase(),
        awb: trimmedWaybill,
      });

      const response = await fetch(`${baseUrl}/track?${params}`, {
        headers: {
          Accept: "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 404) {
          return NextResponse.json(
            {
              status: 404,
              message: "Nomor resi tidak ditemukan",
              data: null,
            },
            { status: 404 },
          );
        }

        return NextResponse.json(
          {
            status: response.status,
            message: `Error dari API kurir: ${response.statusText}`,
            data: null,
          },
          { status: response.status },
        );
      }

      const data = await response.json();

      // Handle jika BinderByte return error
      if (data.status && data.status !== 200) {
        return NextResponse.json(
          {
            status: 400,
            message: data.message || "Data tracking tidak ditemukan",
            data: null,
          },
          { status: 400 },
        );
      }

      return NextResponse.json(data);
    } catch (fetchError: any) {
      clearTimeout(timeoutId);

      if (fetchError.name === "AbortError") {
        return NextResponse.json(
          {
            status: 408,
            message: "Timeout menghubungi server kurir",
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
        message: "Terjadi kesalahan pada server. Silakan coba lagi nanti.",
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
    supported_couriers: VALID_COURIERS,
    timestamp: new Date().toISOString(),
  });
}

// Mock data function
function getMockTrackingData(waybill: string, courier: string) {
  const mockHistory = [
    {
      date: new Date().toISOString().replace("T", " ").substring(0, 19),
      desc: "Paket diterima di gerai [JAKARTA PUSAT]",
    },
    {
      date: new Date(Date.now() - 3600000)
        .toISOString()
        .replace("T", " ")
        .substring(0, 19),
      desc: "Paket dalam proses sortir [JAKARTA HUB]",
    },
    {
      date: new Date(Date.now() - 7200000)
        .toISOString()
        .replace("T", " ")
        .substring(0, 19),
      desc: "Paket berangkat ke kota tujuan [BANDUNG]",
    },
  ];

  return {
    status: 200,
    message: "Success",
    data: {
      summary: {
        awb: waybill,
        courier: courier.toUpperCase(),
        service: "REG",
        status: "ON PROCESS",
        date: mockHistory[0].date,
        desc: mockHistory[0].desc,
        amount: "25000",
        weight: "1.5 kg",
      },
      detail: {
        origin: "JAKARTA PUSAT, DKI JAKARTA",
        destination: "BANDUNG, JAWA BARAT",
        shipper: "TOKO ONLINE ABC",
        receiver: "JANE SMITH",
      },
      history: mockHistory,
    },
  };
}
