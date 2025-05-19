import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "http://localhost:3000",
        "https://ai-image-analyzer-production.up.railway.app",
      ],
      bodySizeLimit: "5mb",
    },
  },
  allowedDevOrigins: ["http://localhost:3000"],
};


export default nextConfig;