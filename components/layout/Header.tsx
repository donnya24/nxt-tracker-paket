import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">📦</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PaketTracker</h1>
              <p className="text-sm text-gray-500">
                Lacak pengiriman paket Anda
              </p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Beranda
            </Link>
            <Link
              href="/tracker"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Lacak Paket
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Tentang Kami
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Kontak
            </Link>
          </nav>

          <button className="md:hidden">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
