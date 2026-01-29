// Simple service file
export class TrackingService {
  static async track(waybill: string, courier: string) {
    try {
      const apiKey = process.env.NEXT_PUBLIC_BINDERBYTE_API_KEY;
      const baseUrl =
        process.env.NEXT_PUBLIC_BINDERBYTE_BASE_URL ||
        "https://api.binderbyte.com/v1";

      if (!apiKey || apiKey === "your_api_key_here") {
        return this.getMockData(waybill, courier);
      }

      const params = new URLSearchParams({
        api_key: apiKey,
        courier: courier.toLowerCase(),
        awb: waybill.trim(),
      });

      const response = await fetch(`${baseUrl}/track?${params}`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Tracking error:", error);
      throw error;
    }
  }

  private static getMockData(waybill: string, courier: string) {
    return {
      status: 200,
      message: "Success",
      data: {
        summary: {
          awb: waybill,
          courier: courier.toUpperCase(),
          service: "REG",
          status: "ON PROCESS",
          date: new Date().toISOString(),
          desc: "Paket dalam perjalanan",
          amount: "25000",
          weight: "1.5 kg",
        },
        detail: {
          origin: "JAKARTA",
          destination: "BANDUNG",
          shipper: "Pengirim",
          receiver: "Penerima",
        },
        history: [
          {
            date: new Date().toISOString(),
            desc: "Paket diterima di gerai",
          },
        ],
      },
    };
  }
}
