import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "unsplash.com", // Often used for Unsplash+ images
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org", // Useful for logos/flags
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
