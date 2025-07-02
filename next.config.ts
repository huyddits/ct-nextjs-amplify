/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  // Force service worker to update
  runtimeCaching: [],
  buildExcludes: [/middleware-manifest.json$/],
  // Disable default SW caching for custom SW
  sw: 'sw.js',
  // Force SW reload
  reloadOnOnline: true,
});
const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Tắt lightningcss
    lightningcss: false,
  },
  // Image optimization
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    formats: ['image/webp'],
  },
  // Static file handling
  async rewrites() {
    return [
      {
        source: '/sw.js',
        destination: '/sw.js',
      },
    ];
  },

  // PWA headers with stronger cache control
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
      {
        source: '/workbox-:hash.js',
        headers: [{ key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' }],
      },
    ];
  },
  // Ensure static files are properly handled
  trailingSlash: false,
  // Add build time to force cache invalidation
  env: {
    BUILD_TIME: new Date().toISOString(),
  },
});

module.exports = nextConfig;
