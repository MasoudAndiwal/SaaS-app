// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // simplest: just allow the whole host
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',          // '' = any
        pathname: '/**',   // '/**' = any path
      },
    ],
    // alternatively, if you only need the host:
    // domains: ['img.clerk.com'],
  },
};

export default nextConfig;