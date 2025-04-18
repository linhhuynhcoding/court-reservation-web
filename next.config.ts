import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "placehold.co",
        protocol: "https"
      },
      {
        hostname: "img.courtsite.my",
        protocol: "https"
      },
      {
        hostname: "res.cloudinary.com",
        protocol: "http"
      },
      {
        hostname: "avatar.iran.liara.run",
        protocol: "https"
      },
    ]
  }
};

export default nextConfig;
