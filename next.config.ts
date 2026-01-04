import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://antariks.id https://www.antariks.id https://app.antariks.id https://www.app.antariks.id",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
