// components/tracker/CourierSelect.tsx
"use client";

import React, { useState } from "react";
import LazyImage from "@/components/ui/LazyImage";
import { COURIER_CATEGORIES } from "@/data/couriers"; // Impor dari data pusat

interface CourierSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const TOTAL_COURIERS = COURIER_CATEGORIES.reduce(
  (total, category) => total + category.couriers.length,
  0,
);

export default function CourierSelect({ value, onChange }: CourierSelectProps) {
  const [activeCategory, setActiveCategory] = useState("Express");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCouriers = COURIER_CATEGORIES.map((category) => ({
    ...category,
    couriers: category.couriers.filter(
      (courier) =>
        searchQuery === "" ||
        courier.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        courier.value.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  })).filter((category) => category.couriers.length > 0);

  const totalFiltered = filteredCouriers.reduce(
    (total, cat) => total + cat.couriers.length,
    0,
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500">
          {searchQuery === ""
            ? `${TOTAL_COURIERS} kurir tersedia`
            : `${totalFiltered} hasil ditemukan`}
        </span>
      </div>

      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari kurir (JNE, POS, J&T, dll)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute left-3 top-3 text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {searchQuery === "" && (
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
          {COURIER_CATEGORIES.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category.name
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name} ({category.couriers.length})
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {(searchQuery === ""
          ? COURIER_CATEGORIES.find((cat) => cat.name === activeCategory)
              ?.couriers
          : filteredCouriers.flatMap((cat) => cat.couriers)
        )?.map((courier) => (
          <button
            key={courier.value}
            type="button"
            onClick={() => onChange(courier.value)}
            className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 hover:shadow-md ${
              value === courier.value
                ? "border-blue-500 bg-blue-50 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <LazyImage
              src={courier.logoUrl}
              alt={courier.value}
              fallbackColor={courier.color}
            />
            <span className="font-medium text-gray-900 text-sm text-center mt-2">
              {courier.label}
            </span>
          </button>
        ))}
      </div>

      {searchQuery !== "" && filteredCouriers.length === 0 && (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
          <svg
            className="w-12 h-12 mx-auto mb-3 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="font-medium">Kurir "{searchQuery}" tidak ditemukan</p>
          <p className="text-sm mt-1">
            Coba kata kunci lain seperti: JNE, POS, J&T, dll
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Tampilkan semua kurir
          </button>
        </div>
      )}

      {value && searchQuery === "" && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <div className="mr-2">
              {(() => {
                const selectedCourier = COURIER_CATEGORIES.flatMap(
                  (cat) => cat.couriers,
                ).find((c) => c.value === value);
                return selectedCourier ? (
                  <LazyImage
                    src={selectedCourier.logoUrl}
                    alt={selectedCourier.value}
                    size="w-6 h-6"
                    fallbackColor={selectedCourier.color}
                  />
                ) : (
                  <div
                    className={`w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center`}
                  >
                    <span className="text-white text-xs">✓</span>
                  </div>
                );
              })()}
            </div>
            <span className="text-sm font-medium text-gray-700">
              Kurir terpilih:{" "}
              <span className="text-blue-600">
                {
                  COURIER_CATEGORIES.flatMap((cat) => cat.couriers).find(
                    (c) => c.value === value,
                  )?.label
                }
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
