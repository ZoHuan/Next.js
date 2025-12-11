import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["space.coze.cn", "api.dicebear.com", "hnegqpiaaltipnhlwucw.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "space.coze.cn",
        port: "",
        pathname: "/api/coze_space/gen_image/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
