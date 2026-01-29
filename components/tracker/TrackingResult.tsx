"use client";

interface TrackingDetail {
  date: string;
  desc: string;
  location?: string;
}

interface TrackingResultProps {
  data: {
    courier: string;
    trackingNumber: string;
    status: string;
    details: TrackingDetail[];
    sender?: string;
    receiver?: string;
    weight?: string;
    estimatedDelivery?: string;
  } | null;
  isLoading?: boolean;
  error?: string | null;
}

export default function TrackingResult({ data, isLoading = false, error = null }: TrackingResultProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="h-3 w-3 bg-gray-200 rounded-full mt-1"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Gagal Melacak</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Masukkan Nomor Resi</h3>
          <p className="text-gray-600">
            Masukkan nomor resi dan pilih kurir untuk melacak status pengiriman paket Anda
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    if (status.toLowerCase().includes('selesai') || status.toLowerCase().includes('delivered')) {
      return 'bg-green-100 text-green-800';
    }
    if (status.toLowerCase().includes('proses') || status.toLowerCase().includes('process')) {
      return 'bg-yellow-100 text-yellow-800';
    }
    return 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Detail Pelacakan</h2>
            <p className="text-blue-100">Resi: {data.trackingNumber}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className={`inline-block px-4 py-2 rounded-full font-semibold ${getStatusColor(data.status)}`}>
              {data.status}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-blue-200">Kurir</p>
            <p className="font-semibold">{data.courier.toUpperCase()}</p>
          </div>
          {data.estimatedDelivery && (
            <div>
              <p className="text-blue-200">Estimasi Pengiriman</p>
              <p className="font-semibold">{data.estimatedDelivery}</p>
            </div>
          )}
          {data.weight && (
            <div>
              <p className="text-blue-200">Berat</p>
              <p className="font-semibold">{data.weight}</p>
            </div>
          )}
        </div>
      </div>

      {/* Tracking Timeline */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Riwayat Pengiriman</h3>
        
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          <div className="space-y-8">
            {data.details.map((detail, index) => (
              <div key={index} className="flex items-start">
                {/* Dot */}
                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                  index === 0 ? 'bg-blue-600' : 'bg-gray-300'
                }`}>
                  {index === 0 ? (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                
                {/* Content */}
                <div className="ml-6 flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900">{detail.desc}</h4>
                    <span className="text-sm text-gray-500 mt-1 md:mt-0">{detail.date}</span>
                  </div>
                  {detail.location && (
                    <p className="text-sm text-gray-600">
                      📍 {detail.location}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Info */}
      {(data.sender || data.receiver) && (
        <div className="border-t border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Pengiriman</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.sender && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Pengirim</h4>
                <p className="text-gray-900">{data.sender}</p>
              </div>
            )}
            {data.receiver && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Penerima</h4>
                <p className="text-gray-900">{data.receiver}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}