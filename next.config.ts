/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'atlascolposcopy.ru',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'atlascolposcopy.ru',
        pathname: '/media/**',
      },
    ],
  },
};

module.exports = nextConfig;
