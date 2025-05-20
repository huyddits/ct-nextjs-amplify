// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  experimental: {
    forceSwcTransforms: true,
    useLightningcss: false,
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
  webpack: (config: any) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

module.exports = nextConfig;
