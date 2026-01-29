"use client";

import React, { useState } from "react";
import CourierSelect from "@/components/tracker/CourierSelect";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim() && courier) {
      onSubmit(courier, trackingNumber.trim());
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Lacak Paket</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pilih Kurir
          </label>
          <CourierSelect value={courier} onChange={setCourier} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nomor Resi / Tracking
          </label>
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Contoh: 1234567890"
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
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
