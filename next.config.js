/** @type {import('next').NextConfig} */
const { languages, defaultLocale } = require('./config/languages.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  
  // Enable static exports for Vercel
  output: 'standalone',
  
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
  
  // Removed redirects as they're now handled in middleware
  // This prevents conflicts with our custom routing logic
};

module.exports = nextConfig;
