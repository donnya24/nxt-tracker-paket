import { NextRequest, NextResponse } from "next/server";

interface TrackingRequest {
  waybill: string;
  courier: string;
}

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
            message: "Terlalu banyak permintaan",
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

    if (waybill.trim().length < 5) {
      return NextResponse.json(
        {
          status: 400,
          message: "Format nomor resi tidak valid",
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

    // Jika API key tidak ada, gunakan mock data
    if (!apiKey || apiKey === "your_api_key_here") {
      const mockData = getMockTrackingData(waybill, courier);
      return NextResponse.json(mockData);
    }

    // Call BinderByte API
    const params = new URLSearchParams({
      api_key: apiKey,
      courier: courier.toLowerCase(),
      awb: waybill.trim(),
    });

    const response = await fetch(`${baseUrl}/track?${params}`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`BinderByte API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        status: 500,
        message: "Terjadi kesalahan pada server",
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
    provider: "BinderByte",
    timestamp: new Date().toISOString(),
  });
}

// Mock data function
function getMockTrackingData(waybill: string, courier: string) {
  const mockHistory = [
    {
      date: "2024-01-25 08:30:00",
      desc: "Paket diterima di gerai [JAKARTA PUSAT]",
    },
    {
      date: "2024-01-25 14:20:00",
      desc: "Paket dalam proses sortir [JAKARTA HUB]",
    },
    {
      date: "2024-01-26 09:15:00",
      desc: "Paket berangkat ke kota tujuan [BANDUNG]",
    },
    {
      date: "2024-01-26 16:45:00",
      desc: "Paket sampai di gerai tujuan [BANDUNG]",
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
        date: "2024-01-26 16:45:00",
        desc: "Paket sampai di gerai tujuan",
        amount: "25000",
        weight: "1.5 kg",
      },
      detail: {
        origin: "JAKARTA PUSAT, DKI JAKARTA",
        destination: "BANDUNG, JAWA BARAT",
        shipper: "JOHN DOE",
        receiver: "JANE SMITH",
      },
      history: mockHistory,
    },
  };
}
