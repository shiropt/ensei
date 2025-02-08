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
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/stadiums",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
