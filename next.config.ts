import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: false,
  experimental: {
    optimizePackageImports: ['react', 'react-dom']
  }
};

export default nextConfig;
