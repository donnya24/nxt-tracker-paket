"use client";

import React from "react";

interface TrackingHistoryItem {
  id: string;
  trackingNumber: string;
  courier: string;
  status: string;
  lastUpdated: string;
}

interface TrackingHistoryProps {
  items: TrackingHistoryItem[];
  onSelect: (trackingNumber: string, courier: string) => void;
}

export default function TrackingHistory({
  items,
  onSelect,
}: TrackingHistoryProps) {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
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
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Riwayat Kosong
          </h3>
          <p className="text-gray-600">
            Lacak paket untuk menambahkan riwayat pelacakan
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Riwayat Lacakan</h2>
        <span className="text-sm text-gray-500">{items.length} item</span>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition cursor-pointer"
            onClick={() => onSelect(item.trackingNumber, item.courier)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold">📦</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {item.trackingNumber}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {item.courier.toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === "DELIVERED"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 mt-3">
              <span>Terakhir diperbarui: {item.lastUpdated}</span>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Lacak Ulang →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:border-gray-400 transition text-center">
          + Tampilkan Lebih Banyak
        </button>
      </div>
    </div>
  );
}
