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
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Add specific caching for homepage
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/es",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/weddings",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/es/weddings",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/wedding-planning",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/es/wedding-planning",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      // Add specific caching for stories page
      {
        source: "/stories",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/en/stories",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/es/stories",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      // Add specific caching for individual story pages
      {
        source: "/stories/:slug*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/en/stories/:slug*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/es/stories/:slug*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      // Add specific caching for photography-video page
      {
        source: "/weddings/photography-video",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/en/weddings/photography-video",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/es/weddings/photography-video",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      // Add specific caching for individual photography-video package pages
      {
        source: "/weddings/photography-video/:slug*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/en/weddings/photography-video/:slug*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/es/weddings/photography-video/:slug*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      // Add specific caching for proposals page
      {
        source: "/proposals",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/en/proposals",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/es/proposals",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      // Add specific caching for individual proposal pages
      {
        source: "/proposals/:slug*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/en/proposals/:slug*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/es/proposals/:slug*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      // Add specific caching for policies page
      {
        source: "/policies",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/en/policies",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/es/policies",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      // Add specific caching for photoshoots page
      {
        source: "/photoshoots",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/en/photoshoots",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/es/photoshoots",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      // Add specific caching for individual photoshoot pages
      {
        source: "/photoshoots/:slug*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/en/photoshoots/:slug*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/es/photoshoots/:slug*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      // Add specific caching for FAQ page
      {
        source: "/faq",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/en/faq",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/es/faq",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      // Add specific caching for corporate-events page
      {
        source: "/corporate-events",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/en/corporate-events",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/es/corporate-events",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      // Add specific caching for contact page
      {
        source: "/contact",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/en/contact",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/es/contact",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      // Add specific caching for about page
      {
        source: "/about",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/en/about",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
      {
        source: "/es/about",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
          },
        ],
      },
    ]
  },
}

export default withNextIntl(nextConfig)
