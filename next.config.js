/**@type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.sicepat.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "anteraja.id",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.wahana.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.ninjaxpress.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lionparcel.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.rex.co.id",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "idexpress.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**", // Allow all for development
      },
    ],
  },
};

module.exports = nextConfig
