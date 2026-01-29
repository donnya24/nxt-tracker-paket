import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TrackingForm from "@/components/tracker/TrackingForm";
import TrackingResult from "@/components/tracker/TrackingResult";
import TrackingHistory from "@/components/tracker/TrackingHistory";

export default function TrackerPage() {
  // Contoh data untuk preview
  const mockTrackingData = {
    courier: "jne",
    trackingNumber: "1234567890",
    status: "Dalam Pengiriman",
    details: [
      {
        date: "2024-01-20 08:30",
        desc: "Paket diterima di gudang sortir",
        location: "Jakarta Pusat",
      },
      {
        date: "2024-01-20 14:15",
        desc: "Paket dalam proses pengiriman",
        location: "Jakarta Pusat",
      },
      {
        date: "2024-01-21 09:45",
        desc: "Paket tiba di hub tujuan",
        location: "Bandung",
      },
      {
        date: "2024-01-21 11:20",
        desc: "Paket dikirim ke alamat penerima",
        location: "Bandung",
      },
    ],
    sender: "Toko Online ABC",
    receiver: "John Doe",
    weight: "1.5 kg",
    estimatedDelivery: "22 Januari 2024",
  };

  const mockHistoryItems = [
    {
      id: "1",
      trackingNumber: "1234567890",
      courier: "jne",
      status: "DELIVERED",
      lastUpdated: "22 Jan 2024",
    },
    {
      id: "2",
      trackingNumber: "9876543210",
      courier: "tiki",
      status: "IN_TRANSIT",
      lastUpdated: "20 Jan 2024",
    },
    {
      id: "3",
      trackingNumber: "4567891230",
      courier: "pos",
      status: "DELIVERED",
      lastUpdated: "18 Jan 2024",
    },
  ];

  const handleTrackSubmit = (courier: string, trackingNumber: string) => {
    console.log("Tracking:", { courier, trackingNumber });
    // Implementasi API call nanti
  };

  const handleHistorySelect = (trackingNumber: string, courier: string) => {
    console.log("Select from history:", { trackingNumber, courier });
    // Implementasi nanti
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Lacak Paket</h1>
            <p className="text-gray-600">
              Pantau status pengiriman paket Anda secara real-time
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form dan Hasil */}
            <div className="lg:col-span-2 space-y-8">
              <TrackingForm onSubmit={handleTrackSubmit} isLoading={false} />

              <TrackingResult
                data={mockTrackingData}
                isLoading={false}
                error={null}
              />
            </div>

            {/* Riwayat */}
            <div>
              <TrackingHistory
                items={mockHistoryItems}
                onSelect={handleHistorySelect}
              />

              {/* Info Kurir */}
              <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Daftar Kurir yang Didukung
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span>JNE</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span>TIKI</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span>POS Indonesia</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                    <span>SiCepat</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    <span>J&T Express</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
