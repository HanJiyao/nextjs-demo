import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' }
    ],
  },

  async headers() {
    return [
      {
        // Match all Unity WebGL build files that are compressed
        source: "/WebGL/Build/:path*.gz",
        headers: [
          {
            key: "Content-Type",
            value: "application/gzip",
          },
          {
            key: "Content-Encoding",
            value: "gzip",
          }
        ],
      },
      {
        source: "/WebGL/Build/:path*.wasm.gz",
        headers: [
          {
            key: "Content-Encoding",
            value: "gzip",
          },
          {
            key: "Content-Type",
            value: "application/wasm",
          },
        ],
      },
      {
        source: "/WebGL/Build/:path*.js.gz",
        headers: [
          {
            key: "Content-Encoding",
            value: "gzip",
          },
          {
            key: "Content-Type",
            value: "application/javascript",
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
