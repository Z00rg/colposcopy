/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_API_BASE_URL,
        pathname: '/media/**',
      },
    ],
  },
};

module.exports = nextConfig;
