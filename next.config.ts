import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    // nextScriptWorkers: true,
    middlewarePrefetch: 'flexible',
  },
  sitemapSize: 5000,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["example.com", "another-domain.com","www.shutterstock.com", "images.contentstack.io"],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60, 
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", 
  },
  compress: true,
  compiler: {
    emotion: true,
  },
  transpilePackages: ['@chakra-ui/react', '@chakra-ui/next-js', '@emotion/react'],

  async headers() {
    return [
      {
        source: "/api/auth/session",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate, max-age=0",
          },
        ],
      },
    ];
  },

};

export default nextConfig;