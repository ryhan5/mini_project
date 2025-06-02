/** @type {import('next').NextConfig} */
const { locales, defaultLocale } = require('./config/languages');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  
  // Enable static exports for Vercel
  output: 'standalone',
  
  // Configure i18n
  i18n: {
    locales,
    defaultLocale,
    localeDetection: false, // Disable automatic locale detection since we handle it in middleware
  },
  
  // Image optimization
  images: {
    domains: ['vercel.com'],
    minimumCacheTTL: 60,
    unoptimized: true, // Disable image optimization in static export
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  
  // API rewrites
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  
  // Redirects configuration
  async redirects() {
    return [
      // Redirect root to default locale
      {
        source: '/',
        destination: `/${defaultLocale}/home`,
        permanent: false,
      },
      // Handle invalid language test pages
      {
        source: '/:lang(test|te|ta|mr)/test',
        has: [
          {
            type: 'host',
            value: '(?<host>.*)',
          },
        ],
        destination: `/${defaultLocale}/test`,
        permanent: false,
      },
      // Handle other paths
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '(?<host>.*)',
          },
        ],
        destination: '/:path*',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
