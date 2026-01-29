"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import {
  Package,
  Search,
  Clock,
  Shield,
  TrendingUp,
  MapPin,
  Users,
} from "lucide-react";
import Image from "next/image";
import { ALL_COURIERS } from "@/data/couriers";

export default function Home() {
  // Filter untuk 23 kurir utama (sesuai dengan array yang ada di halaman)
  const popularCouriers = [
    "JNE",
    "TIKI",
    "POS",
    "J&T",
    "SiCepat",
    "AnterAja",
    "Wahana",
    "Ninja",
    "Lion",
    "REX",
    "ID Express",
    "SPX",
    "JET",
    "PCP",
    "JX",
    "Shopee",
    "KGX",
    "SAP",
    "RPX",
    "Lazada",
    "First",
    "Indah",
    "Dakota",
  ];

  const displayedCouriers = ALL_COURIERS.filter((courier) =>
    popularCouriers.includes(courier.label),
  ).slice(0, 23); // Ambil 23 pertama

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-blue-50/30 to-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-orange-400/5 animate-gradient"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-orange-50 border border-blue-200 rounded-full px-4 py-2 mb-8 shadow-sm">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-orange-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  🎉 Mendukung 25+ kurir pengiriman
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 bg-clip-text text-transparent">
                  Lacak Paket
                </span>
                <br />
                <span className="text-gray-900">Dengan Mudah</span>
              </h1>

              <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-600 leading-relaxed">
                Lacak status pengiriman paket dari berbagai kurir Indonesia
                dalam satu platform yang cepat dan akurat
              </p>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/tracker"
                  className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-500 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-500 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    <Search className="w-5 h-5" />
                    Lacak Paket Sekarang
                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                </Link>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span>Real-time</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span>Terpercaya</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-orange-500" />
                    <span>Gratis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Cara Melacak Paket
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Hanya 3 langkah mudah untuk mengetahui status paket Anda
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: <Search className="w-8 h-8" />,
                  title: "Masukkan Nomor Resi",
                  description: "Salin nomor resi dari email/sms kurir",
                  color: "from-blue-500 to-blue-600",
                  bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
                },
                {
                  icon: <Package className="w-8 h-8" />,
                  title: "Pilih Kurir",
                  description: "Pilih kurir pengirim sesuai dengan resi Anda",
                  color: "from-orange-500 to-orange-600",
                  bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
                },
                {
                  icon: <MapPin className="w-8 h-8" />,
                  title: "Lihat Hasil",
                  description: "Dapatkan informasi status pengiriman terbaru",
                  color: "from-blue-500 to-orange-500",
                  bgColor: "bg-gradient-to-br from-blue-500 to-orange-500",
                },
              ].map((step, index) => (
                <div key={index} className="group relative">
                  <div className="relative p-8 rounded-3xl bg-gradient-to-b from-white to-blue-50/50 border border-blue-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:border-blue-300 hover:-translate-y-2">
                    {/* Icon */}
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                      <div
                        className={`text-transparent bg-gradient-to-br ${step.color} bg-clip-text`}
                      >
                        {step.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supported Couriers */}
        <section className="py-20 bg-gradient-to-b from-blue-50/30 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Kurir yang Didukung
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Kami mendukung berbagai kurir pengiriman terpercaya di Indonesia
              </p>
            </div>

            {/* Couriers Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
              {displayedCouriers.map((courier) => (
                <div key={courier.value} className="group relative">
                  <div className="relative p-4 md:p-5 rounded-2xl bg-white border border-blue-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-300 hover:scale-105">
                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Logo Kurir - Memenuhi frame */}
                    <div className="relative w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center shadow-inner overflow-hidden">
                      {courier.logoUrl ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={courier.logoUrl}
                            alt={`Logo ${courier.label}`}
                            fill
                            className="object-cover p-1"
                            sizes="(max-width: 768px) 48px, 56px"
                            onError={(e) => {
                              // Fallback ke emoji jika gambar error
                              e.currentTarget.style.display = "none";
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                const fallback = document.createElement("span");
                                fallback.className = "text-lg md:text-xl";
                                fallback.textContent = "📦";
                                parent.innerHTML = "";
                                parent.appendChild(fallback);
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <span className="text-lg md:text-xl">📦</span>
                      )}
                    </div>

                    <p className="font-semibold text-gray-900 text-center text-sm md:text-base relative z-10">
                      {courier.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {displayedCouriers.length}+
                </div>
                <p className="text-gray-700">Kurir Didukung</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-200">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  24/7
                </div>
                <p className="text-gray-700">Update Data</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-orange-500/10 border border-blue-200">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-2">
                  100%
                </div>
                <p className="text-gray-700">Gratis Digunakan</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-20 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500"></div>
          <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Siap Melacak Paket Anda?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Gratis, tanpa registrasi, dan hasil real-time langsung dari sistem
              kurir
            </p>
            <Link
              href="/tracker"
              className="group relative inline-flex items-center justify-center bg-white text-gray-900 font-bold px-8 py-4 rounded-2xl hover:shadow-2xl transition-all duration-300 shadow-lg transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-500 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-2">
                <Search className="w-5 h-5" />
                Mulai Lacak Sekarang
                <div className="w-5 h-5 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </Link>

            {/* Features */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Real-time Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Multi Kurir Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <span>Tidak Perlu Login</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
