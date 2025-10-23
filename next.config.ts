import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [80, 90, 95, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    // Update image caching to match 3-day revalidation
    minimumCacheTTL: 259200, // 3 days
  },
  // Add experimental features for better caching
  experimental: {
    staleTimes: {
      dynamic: 30, // 30 seconds for dynamic content
      static: 259200, // 3 days for static content
    },
  },
  // Add headers for static assets
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Add specific caching for homepage
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400',
          },
        ],
      },
      {
        source: '/es',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400',
          },
        ],
      },
      {
        source: '/weddings',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400',
          },
        ],
      },
      {
        source: '/es/weddings',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400',
          },
        ],
      },
      {
        source: '/wedding-planning',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400',
          },
        ],
      },
      {
        source: '/es/wedding-planning',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400',
          },
        ],
      },
    ]
  },
}

export default withNextIntl(nextConfig)