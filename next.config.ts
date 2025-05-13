import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'vi',
    localeDetection: false,

  },
  images: {
    remotePatterns: [
      {
        hostname: "placehold.co",
        protocol: "https"
      },
      {
        hostname: "res.cloudinary.com",
        protocol: "http"
      },
      {
        hostname: "res.cloudinary.com",
        protocol: "https"
      },
      {
        hostname: "avatar.iran.liara.run",
        protocol: "https"
      },
    ]
  }
};

export default nextConfig;
