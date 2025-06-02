/** @type {import('next').NextConfig} */
const { locales, defaultLocale } = require('./config/languages');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  images: {
    domains: ['vercel.com'],
    minimumCacheTTL: 60,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  // Ensure client-side navigation works with Vercel
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '(?<host>.*)',
          },
        ],
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
