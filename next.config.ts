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
  // バンドル最適化設定
  experimental: {
    optimizePackageImports: ['@mantine/core', '@tabler/icons-react'],
  },
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
