import type { NextConfig } from "next"
import { withMicrofrontends } from "@vercel/microfrontends/next/config"

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

export default withMicrofrontends(nextConfig)
