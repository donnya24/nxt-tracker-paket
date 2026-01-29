import React from "react";
import Link from "next/link";
import { Package, MapPin, Shield, TrendingUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const totalCouriers = 25;

  const features = [
    { icon: <Package size={20} />, text: "Pelacakan Real-time" },
    { icon: <MapPin size={20} />, text: "Update Lokasi" },
    { icon: <Shield size={20} />, text: "Aman & Terpercaya" },
    { icon: <TrendingUp size={20} />, text: "Akurasi Tinggi" },
  ];

  const popularCouriers = [
    "JNE",
    "POS",
    "J&T",
    "TIKI",
    "SiCepat",
    "AnterAja",
    "SPX",
    "Ninja",
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-blue-50 border-t border-blue-100 mt-20">
      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-orange-100 flex items-center justify-center mb-3 text-blue-600">
                {feature.icon}
              </div>
              <p className="font-medium text-gray-800">{feature.text}</p>
            </div>
          ))}
        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand - Logo sama dengan Header */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                {/* Container untuk logo - sama dengan Header */}
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-500 to-orange-400 rounded-xl flex items-center justify-center shadow-lg">
                  {/* Logo dengan Lucide Package icon - sama dengan Header */}
                  <Package className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                  Paket Tracker
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  Lacak dengan presisi
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Platform pelacakan paket terintegrasi untuk {totalCouriers}+ kurir
              di Indonesia. Gratis, cepat, dan selalu update.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-2 h-6 bg-gradient-to-b from-blue-600 to-orange-400 rounded-full mr-2"></span>
              Menu Utama
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/tracker"
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
                >
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                  Lacak Paket
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Couriers */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-2 h-6 bg-gradient-to-b from-blue-600 to-orange-400 rounded-full mr-2"></span>
              Kurir Populer
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {popularCouriers.map((courier, index) => (
                <div
                  key={courier}
                  className="p-2 bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:scale-105"
                >
                  <p className="text-sm font-medium text-gray-800 text-center">
                    {courier}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-2 h-6 bg-gradient-to-b from-blue-600 to-orange-400 rounded-full mr-2"></span>
              Statistik
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-orange-500/10 border border-blue-200">
                <p className="text-2xl font-bold text-blue-600">
                  {totalCouriers}+
                </p>
                <p className="text-sm text-gray-600">Kurir Didukung</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-blue-500/10 border border-orange-200">
                <p className="text-2xl font-bold text-orange-600">24/7</p>
                <p className="text-sm text-gray-600">Update Data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-blue-100 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {currentYear}{" "}
            <span className="font-semibold text-blue-600">Paket Tracker</span>.
            Semua hak dilindungi.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Pelacakan Realtime • Terintegrasi dengan sistem
            kurir terpercaya
          </p>
        </div>
      </div>
    </footer>
  );
}
