"use client";

import React from "react";

interface CourierSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const COURIERS = [
  { value: "jne", label: "JNE", color: "bg-red-500" },
  { value: "tiki", label: "TIKI", color: "bg-green-500" },
  { value: "pos", label: "POS Indonesia", color: "bg-blue-500" },
  { value: "sicepat", label: "SiCepat", color: "bg-orange-500" },
  { value: "jnt", label: "J&T Express", color: "bg-purple-500" },
  { value: "anteraja", label: "AnterAja", color: "bg-yellow-500" },
  { value: "ninja", label: "Ninja Xpress", color: "bg-pink-500" },
  { value: "lion", label: "Lion Parcel", color: "bg-indigo-500" },
  { value: "ide", label: "ID Express", color: "bg-teal-500" },
  { value: "rex", label: "REX Express", color: "bg-gray-500" },
];

export default function CourierSelect({ value, onChange }: CourierSelectProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {COURIERS.map((courier) => (
        <button
          key={courier.value}
          type="button"
          onClick={() => onChange(courier.value)}
          className={`
            flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200
            ${
              value === courier.value
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }
          `}
        >
          <div
            className={`w-12 h-12 ${courier.color} rounded-full flex items-center justify-center mb-2`}
          >
            <span className="text-white font-bold text-lg">📦</span>
          </div>
          <span className="font-medium text-gray-900">{courier.label}</span>
        </button>
      ))}
    </div>
  );
}
