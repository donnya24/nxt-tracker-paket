// components/tracker/TrackingForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import CourierSelect from "./CourierSelect";
import LazyImage from "@/components/ui/LazyImage";
import { ALL_COURIERS } from "@/data/couriers"; // Impor dari data pusat

interface TrackingFormProps {
  onSubmit: (courier: string, trackingNumber: string) => void;
  isLoading?: boolean;
}

export default function TrackingForm({
  onSubmit,
  isLoading = false,
}: TrackingFormProps) {
  const [courier, setCourier] = useState("jne");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [recentCouriers, setRecentCouriers] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("recent_couriers");
      if (saved) {
        setRecentCouriers(JSON.parse(saved));
      }
    }
  }, []);

  const saveRecentCourier = (courierCode: string) => {
    const updated = [
      courierCode,
      ...recentCouriers.filter((c) => c !== courierCode),
    ].slice(0, 3);
    setRecentCouriers(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("recent_couriers", JSON.stringify(updated));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim() && courier) {
      saveRecentCourier(courier);
      onSubmit(courier, trackingNumber.trim());
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Lacak Paket</h2>

      {recentCouriers.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">
            Kurir terakhir digunakan:
          </p>
          <div className="flex space-x-2">
            {recentCouriers.map((recentCourier) => {
              const courierData = ALL_COURIERS.find(
                (c) => c.value === recentCourier,
              ); // Gunakan ALL_COURIERS
              return (
                <button
                  key={recentCourier}
                  type="button"
                  onClick={() => setCourier(recentCourier)}
                  className={`flex items-center px-3 py-1 rounded-lg text-sm ${
                    courier === recentCourier
                      ? "bg-blue-100 text-blue-700 border border-blue-300"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {courierData && (
                    <div className="mr-2 flex-shrink-0">
                      <LazyImage
                        src={courierData.logoUrl}
                        alt={courierData.value}
                        size="w-6 h-6"
                        fallbackColor={courierData.color}
                      />
                    </div>
                  )}
                  {courierData
                    ? courierData.label
                    : recentCourier.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pilih Kurir
          </label>
          <CourierSelect value={courier} onChange={setCourier} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Nomor Resi / Tracking
            </label>
            <button
              type="button"
              onClick={() => setTrackingNumber("1234567890")}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Isi contoh
            </button>
          </div>
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Contoh: SPX123456789"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Masukkan nomor resi yang Anda terima dari kurir
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading || !trackingNumber.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Memproses...
            </span>
          ) : (
            "Lacak Sekarang"
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Tips Pelacakan
        </h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">✓</span>
            Pastikan nomor resi sudah benar dan tidak ada spasi
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">✓</span>
            Pilih kurir yang sesuai dengan paket Anda
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">✓</span>
            Data mungkin membutuhkan waktu beberapa saat untuk diperbarui
          </li>
        </ul>
      </div>
    </div>
  );
}
