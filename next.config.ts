import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  enablePrerenderSourceMaps: true,
  //productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
}

export default nextConfig
