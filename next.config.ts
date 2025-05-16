// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  experimental: {
    forceSwcTransforms: true,
  },
  optimizeFonts: false,
};

module.exports = nextConfig;
