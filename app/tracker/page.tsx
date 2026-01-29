"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TrackingForm from "@/components/tracker/TrackingForm";
import TrackingResult from "@/components/tracker/TrackingResult";
import {
  Search,
  Package,
  Clock,
  MapPin,
  Users,
  Shield,
  AlertCircle,
} from "lucide-react";

export default function TrackerPage() {
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrackSubmit = async (courier: string, trackingNumber: string) => {
    // Reset state
    setIsLoading(true);
    setError(null);
    setTrackingResult(null);

    // Validasi input
    if (!trackingNumber.trim()) {
      setError("Nomor resi tidak boleh kosong");
      setIsLoading(false);
      return;
    }

    if (trackingNumber.trim().length < 5) {
      setError("Nomor resi terlalu pendek. Minimal 5 karakter");
      setIsLoading(false);
      return;
    }

    try {
      // Panggil API kita sendiri
      const response = await fetch("/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          waybill: trackingNumber.trim(),
          courier: courier,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle API error response
        if (data.message === "Terlalu banyak permintaan") {
          setError("Terlalu banyak permintaan. Silakan coba lagi nanti.");
        } else if (data.message === "Format nomor resi tidak valid") {
          setError(
            "Format nomor resi tidak valid. Periksa kembali nomor resi Anda.",
          );
        } else {
          setError(
            data.message ||
              `Error ${response.status}: Gagal menghubungi server`,
          );
        }
        return;
      }

      if (data.status === 200) {
        setTrackingResult(data.data);
        setError(null);
      } else {
        // Handle jika API BinderByte return error
        if (data.message && data.message.includes("tidak ditemukan")) {
          setError(
            "Nomor resi tidak ditemukan. Periksa nomor resi dan kurir yang dipilih.",
          );
        } else if (data.message && data.message.includes("invalid")) {
          setError("Kurir atau nomor resi tidak valid.");
        } else {
          setError(data.message || "Gagal mendapatkan data tracking.");
        }
      }
    } catch (err: any) {
      console.error("Tracking error:", err);

      // Handle specific network errors
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        setError(
          "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
        );
      } else if (err.name === "AbortError") {
        setError("Request timeout. Silakan coba lagi.");
      } else {
        setError(
          "Terjadi kesalahan pada server. Silakan coba beberapa saat lagi.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Total kurir yang didukung
  const totalCouriers = 25;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-blue-50/30 to-white">
      <Header />

      <main className="flex-1">
        <div className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="text-center mb-10 md:mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-orange-50 border border-blue-200 rounded-full px-4 py-2 mb-6 shadow-sm">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-orange-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  🚀 Lacak paket dengan cepat dan mudah
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 bg-clip-text text-transparent">
                  Lacak Paket
                </span>
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Masukkan nomor resi dan pilih kurir untuk melacak status
                pengiriman secara real-time
              </p>

              {/* Stats */}
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
                  <Package className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {totalCouriers}+ Kurir
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Real-time Data
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Terpercaya
                  </span>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Form dengan search kurir */}
              <div className="mb-8 relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-orange-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative">
                  <TrackingForm
                    onSubmit={handleTrackSubmit}
                    isLoading={isLoading}
                  />
                </div>
              </div>

              {/* Result */}
              <div className="mb-8">
                <TrackingResult
                  data={
                    trackingResult
                      ? {
                          courier: trackingResult.summary?.courier || "",
                          trackingNumber: trackingResult.summary?.awb || "",
                          status: trackingResult.summary?.status || "",
                          details:
                            trackingResult.history?.map((h: any) => ({
                              date: h.date,
                              desc: h.desc,
                            })) || [],
                          sender: trackingResult.detail?.shipper,
                          receiver: trackingResult.detail?.receiver,
                          weight: trackingResult.summary?.weight,
                        }
                      : null
                  }
                  isLoading={isLoading}
                  error={error}
                />
              </div>

              {/* Tips & Info */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Info Box */}
                <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-2xl border border-blue-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-orange-100 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Cara Melacak
                    </h3>
                  </div>
                  <ol className="space-y-3">
                    {[
                      { number: "1", text: "Pilih kurir dari dropdown/search" },
                      { number: "2", text: "Masukkan nomor resi lengkap" },
                      { number: "3", text: "Klik 'Lacak Sekarang'" },
                    ].map((step) => (
                      <li key={step.number} className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-xs mr-3">
                          {step.number}
                        </span>
                        <span className="text-gray-600 text-sm pt-0.5">
                          {step.text}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Kurir Populer */}
                <div className="bg-gradient-to-br from-white to-orange-50/50 rounded-2xl border border-orange-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-blue-100 flex items-center justify-center">
                      <Users className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Kurir Populer
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "JNE",
                      "POS",
                      "J&T",
                      "TIKI",
                      "SiCepat",
                      "AnterAja",
                      "Wahana",
                      "Ninja",
                    ].map((courier) => (
                      <span
                        key={courier}
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-orange-50 border border-blue-200 text-gray-700 rounded-full text-sm font-medium hover:border-blue-300 transition-colors"
                      >
                        {courier}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Dan {totalCouriers - 8} kurir lainnya...
                  </p>
                </div>
              </div>

              {/* Tips Section */}
              <div className="mt-6 bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 text-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold">💡 Tips Pelacakan</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    <li className="flex items-start text-sm">
                      <span className="mr-2">•</span>
                      <span>Nomor resi biasanya 10-15 digit angka/huruf</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="mr-2">•</span>
                      <span>
                        Pastikan pilih kurir yang sesuai dengan pengirim
                      </span>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start text-sm">
                      <span className="mr-2">•</span>
                      <span>Data membutuhkan waktu untuk update di sistem</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="mr-2">•</span>
                      <span>
                        Jika resi tidak ditemukan, tunggu dan coba lagi
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
