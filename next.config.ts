import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "http://localhost:3000", 
        "http://192.168.0.43:3000"
      ],
      bodySizeLimit: "5mb",
    },
  },
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.0.43:3000",
    "http://10.111.1.253:3000",
  ],
};


export default nextConfig;