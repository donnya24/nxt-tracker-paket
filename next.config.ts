/**@type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.sicepat.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'anteraja.id',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.wahana.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.ninjaxpress.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lionparcel.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.rex.co.id',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'idexpress.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**', // Allow all for development
      },
    ],
  },
}

module.exports = nextConfig
