// next.config.js cho Next.js PWA với SSR trên Amplify Gen 2
/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
});

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    forceSwcTransforms: true,
    // useLightningcss: false, // Có thể bỏ dòng này
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  compiler: {
    styledComponents: true,
  },

  // PWA config cho SSR
  images: {
    domains: [], // Thêm external domains nếu cần
  },

  // Headers cho PWA
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },

  webpack: (config: any) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
});

module.exports = nextConfig;
