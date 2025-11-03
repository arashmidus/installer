import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow LAN devices (e.g., 192.168.x.x) to access dev server assets without warnings
  experimental: {
    allowedDevOrigins: [
      // Common local dev origins
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://0.0.0.0:3000",
      // Match any 192.168.x.x host (http/https) on any port
      /^https?:\/\/192\.168\.\d+\.\d+(?::\d+)?$/,
    ],
  },
};

export default nextConfig;
