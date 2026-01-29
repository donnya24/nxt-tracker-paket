// components/ui/LazyImage.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";

// Fungsi untuk cache logo menggunakan localStorage
const cacheLogo = (courierCode: string, logoUrl: string) => {
  if (typeof window === "undefined") return;
  try {
    const cachedLogos = JSON.parse(localStorage.getItem("cachedLogos") || "{}");
    cachedLogos[courierCode] = logoUrl;
    localStorage.setItem("cachedLogos", JSON.stringify(cachedLogos));
  } catch (error) {
    console.error("Error caching logo:", error);
  }
};

// Fungsi untuk mendapatkan logo dari cache
const getCachedLogo = (courierCode: string): string | null => {
  if (typeof window === "undefined") return null;
  try {
    const cachedLogos = JSON.parse(localStorage.getItem("cachedLogos") || "{}");
    return cachedLogos[courierCode] || null;
  } catch (error) {
    console.error("Error getting cached logo:", error);
    return null;
  }
};

interface LazyImageProps {
  src: string;
  alt: string;
  fallbackColor: string;
  size?: string; // e.g., "w-10 h-10"
}

export default function LazyImage({
  src,
  alt,
  fallbackColor,
  size = "w-10 h-10",
}: LazyImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // Ref untuk container div (dipakai oleh IntersectionObserver)
  const containerRef = useRef<HTMLDivElement>(null);
  // Ref untuk elemen img itu sendiri
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Pastikan IntersectionObserver ada (hanya di browser)
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      // Jika tidak ada (misal di server rendering), langsung set src
      setImageSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Cek cache dulu
          const cached = getCachedLogo(alt);
          setImageSrc(cached || src);
          observer.disconnect(); // Hanya observasi sekali
        }
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [src, alt]); // Dependency array

  const handleLoad = () => {
    setImageLoaded(true);
    // Cache logo setelah berhasil dimuat
    if (imageSrc) {
      cacheLogo(alt, imageSrc);
    }
  };

  const handleError = () => {
    setImageError(true);
  };

  return (
    // Gunakan containerRef untuk div yang diobservasi
    <div
      ref={containerRef}
      // PERUBAHAN: Gunakan bg-gray-200 untuk loading, dan fallbackColor hanya saat error
      className={`${size} ${imageError ? fallbackColor : "bg-gray-200"} rounded-full flex items-center justify-center relative overflow-hidden flex-shrink-0`}
      style={{ aspectRatio: "1/1" }}
    >
      {imageSrc && !imageError ? (
        // Gunakan imgRef untuk elemen gambar
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        <span className="text-white font-bold text-sm select-none">📦</span>
      )}
      {/* Tampilkan spinner hanya jika gambar sedang dimuat dan belum ada error */}
      {!imageLoaded && !imageError && imageSrc && (
        // PERUBAHAN: Hapus background abu-abu dari spinner agar transparan
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
