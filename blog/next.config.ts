import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["space.coze.cn", "ui-avatars.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "space.coze.cn",
        port: "",
        pathname: "/api/coze_space/gen_image/**",
      },
    ],
  },
};

export default nextConfig;
