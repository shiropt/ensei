import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sjpcyrovzgrvwsspxsjf.supabase.co",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
