// components/tracker/TrackingResult.tsx
"use client";

import React from "react";
import LazyImage from "@/components/ui/LazyImage";
import { ALL_COURIERS } from "@/data/couriers";

interface TrackingDetail {
  date: string;
  desc: string;
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
    origin?: string;
    destination?: string;
    service?: string;
  } | null;
  isLoading?: boolean;
  error?: string | null;
}

export default function TrackingResult({
  data,
  isLoading = false,
  error = null,
}: TrackingResultProps) {
  // Cek apakah kurir sesuai dengan data yang ada
  const validateCourier = (courierCode: string) => {
    const courierData = ALL_COURIERS.find(
      (c) => c.value === courierCode.toLowerCase(),
    );

    if (!courierData) {
      // Coba cari dengan label jika tidak ditemukan dengan value
      const foundByLabel = ALL_COURIERS.find(
        (c) => c.label.toLowerCase() === courierCode.toLowerCase(),
      );

      return foundByLabel || null;
    }

    return courierData;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 animate-fadeIn">
        <div className="animate-pulse space-y-6">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
            <div className="space-y-2 flex-1">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="h-3 w-3 bg-gray-200 rounded-full mt-2"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
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
      <div className="bg-white rounded-2xl shadow-lg p-8 animate-fadeIn">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Gagal Melacak
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">
              ⚠️ Tips Penyelesaian:
            </h4>
            <ul className="text-sm text-yellow-700 text-left space-y-1">
              <li>• Periksa nomor resi dengan teliti</li>
              <li>• Pastikan kurir yang dipilih sesuai</li>
              <li>• Coba tunggu beberapa saat dan ulangi</li>
              <li>• Hubungi pengirim untuk konfirmasi</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 animate-fadeIn">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Mulai Melacak Paket
          </h3>
          <p className="text-gray-600 mb-4">
            Masukkan nomor resi dan pilih kurir untuk melacak status pengiriman
            paket Anda
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-orange-50 rounded-full border border-blue-200">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-orange-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              Gratis • Real-time • Akurat
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Validasi kurir
  const courierData = validateCourier(data.courier);

  // Status color mapping
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();

    if (
      statusLower.includes("delivered") ||
      statusLower.includes("terkirim") ||
      statusLower.includes("selesai") ||
      statusLower.includes("sampai")
    ) {
      return {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-200",
        icon: "🎉",
      };
    } else if (
      statusLower.includes("process") ||
      statusLower.includes("proses") ||
      statusLower.includes("transit") ||
      statusLower.includes("dalam perjalanan")
    ) {
      return {
        bg: "bg-blue-100",
        text: "text-blue-800",
        border: "border-blue-200",
        icon: "🚚",
      };
    } else if (
      statusLower.includes("pickup") ||
      statusLower.includes("pick up") ||
      statusLower.includes("diterima")
    ) {
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        border: "border-yellow-200",
        icon: "📦",
      };
    } else {
      return {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
        icon: "⏳",
      };
    }
  };

  const statusColor = getStatusColor(data.status);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fadeIn">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center">
            {courierData ? (
              <div className="mr-4 flex-shrink-0">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center p-2">
                  <div className="w-full h-full object-contain">
                      <LazyImage
                        src={courierData.logoUrl}
                        alt={courierData.label}
                        fallbackColor={courierData.color}
                      />
                    </div>
                </div>
              </div>
            ) : (
              <div className="mr-4 flex-shrink-0">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold">Detail Pelacakan</h2>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <p className="text-blue-100 text-sm">
                  Resi: {data.trackingNumber}
                </p>
                {courierData ? (
                  <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                    {courierData.label}
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-red-100/20 rounded-full text-xs font-medium text-red-200">
                    Kurir: {data.courier}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span
              className={`inline-block px-4 py-2 rounded-full font-semibold ${statusColor.bg} ${statusColor.text} border ${statusColor.border}`}
            >
              <span className="mr-2">{statusColor.icon}</span>
              {data.status}
            </span>
            {data.service && (
              <p className="text-blue-100 text-sm mt-2">
                Layanan: {data.service}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Warning jika kurir tidak dikenali */}
      {!courierData && (
        <div className="bg-yellow-50 border-b border-yellow-200 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-yellow-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Kurir <strong>{data.courier}</strong> tidak dikenali dalam
                sistem kami. Data mungkin tidak lengkap.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Package Information */}
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          Informasi Paket
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pengirim */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border border-blue-100">
            <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
              <svg
                className="w-4 h-4 mr-1 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Pengirim
            </h4>
            <p className="font-medium text-gray-900 text-lg">
              {data.sender || "Tidak tersedia"}
            </p>
          </div>

          {/* Penerima */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-4 border border-orange-100">
            <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
              <svg
                className="w-4 h-4 mr-1 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Penerima
            </h4>
            <p className="font-medium text-gray-900 text-lg">
              {data.receiver || "Tidak tersedia"}
            </p>
          </div>

          {/* Asal */}
          <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-4 border border-green-100">
            <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
              <svg
                className="w-4 h-4 mr-1 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Asal
            </h4>
            <p className="font-medium text-gray-900 text-lg">
              {data.origin || "Tidak tersedia"}
            </p>
          </div>

          {/* Tujuan */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4 border border-purple-100">
            <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
              <svg
                className="w-4 h-4 mr-1 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              Tujuan
            </h4>
            <p className="font-medium text-gray-900 text-lg">
              {data.destination || "Tidak tersedia"}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.weight && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Berat</span>
              <span className="font-medium text-gray-900">{data.weight}</span>
            </div>
          )}
          {data.service && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Layanan</span>
              <span className="font-medium text-gray-900">{data.service}</span>
            </div>
          )}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Status</span>
            <span className={`font-medium ${statusColor.text}`}>
              {data.status}
            </span>
          </div>
        </div>
      </div>

      {/* Shipping History */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Riwayat Pengiriman
        </h3>

        {data.details.length > 0 ? (
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-orange-200 to-green-200"></div>

            <div className="space-y-8">
              {data.details.map((detail, index) => (
                <div key={index} className="flex items-start group">
                  {/* Timeline dot */}
                  <div
                    className={`
                    relative z-10 w-12 h-12 rounded-full flex items-center justify-center
                    flex-shrink-0 shadow-lg transition-all duration-300 group-hover:scale-110
                    ${
                      index === 0
                        ? "bg-gradient-to-br from-green-500 to-green-600 ring-4 ring-green-100"
                        : index === data.details.length - 1
                          ? "bg-gradient-to-br from-blue-500 to-blue-600 ring-4 ring-blue-100"
                          : "bg-gradient-to-br from-orange-500 to-orange-600 ring-4 ring-orange-100"
                    }
                  `}
                  >
                    {index === 0 ? (
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <span className="text-white font-bold text-sm">
                        {data.details.length - index}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="ml-6 flex-1 bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-200 group-hover:border-blue-300 transition-colors duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-lg">
                        {detail.desc}
                      </h4>
                      <span className="text-sm text-gray-500 mt-1 md:mt-0 bg-gray-100 px-3 py-1 rounded-full">
                        {new Date(detail.date).toLocaleString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center mt-2">
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${index === 0 ? "bg-green-500" : index === data.details.length - 1 ? "bg-blue-500" : "bg-orange-500"}`}
                      ></div>
                      <span className="text-xs text-gray-500">
                        Update #{data.details.length - index}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-gray-700 mb-2">
              Belum ada riwayat pengiriman
            </h4>
            <p className="text-gray-500">
              Data riwayat pengiriman akan muncul setelah paket mulai diproses
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              Terakhir diperbarui: {new Date().toLocaleString("id-ID")}
            </span>
          </div>
          <div className="mt-2 md:mt-0 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              Data dari sistem kurir {courierData?.label || data.courier}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
