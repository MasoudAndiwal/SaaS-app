import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  remotePatterns:[
    {hostname: 'img.clerk.com'}
  ]
};

export default nextConfig;
