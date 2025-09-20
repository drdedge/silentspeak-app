import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/silentspeak-app',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
