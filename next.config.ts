import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

/**
 * Creates cache control headers for Next.js routes
 * @param days - Number of days to cache the content (default: 3)
 * @returns Header object with Cache-Control directive
 */
function createCacheHeaders(days: number = 3) {
  const maxAge = days * 86400 // Convert days to seconds
  const sMaxAge = maxAge
  const staleWhileRevalidate = maxAge * 2

  return {
    key: "Cache-Control",
    value: `public, max-age=${maxAge}, s-maxage=${sMaxAge}, stale-while-revalidate=${staleWhileRevalidate}`,
  }
}

/**
 * Creates immutable cache headers for static assets
 * @returns Header object with immutable Cache-Control directive
 */
function createImmutableCacheHeaders() {
  return {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  }
}

/**
 * Creates security headers
 * @returns Array of security header objects
 */
function createSecurityHeaders() {
  return [
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
  ]
}

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [80, 85, 90, 95, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "vumbnail.com",
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
    // Define all routes that need 3-day caching
    const routes = [
      "/",
      "/es",
      "/weddings",
      "/es/weddings",
      "/wedding-planning",
      "/es/wedding-planning",
      "/stories",
      "/en/stories",
      "/es/stories",
      "/stories/:slug*",
      "/en/stories/:slug*",
      "/es/stories/:slug*",
      "/weddings/photography-video",
      "/en/weddings/photography-video",
      "/es/weddings/photography-video",
      "/weddings/photography-video/:slug*",
      "/en/weddings/photography-video/:slug*",
      "/es/weddings/photography-video/:slug*",
      "/proposals",
      "/en/proposals",
      "/es/proposals",
      "/proposals/:slug*",
      "/en/proposals/:slug*",
      "/es/proposals/:slug*",
      "/policies",
      "/en/policies",
      "/es/policies",
      "/photoshoots",
      "/en/photoshoots",
      "/es/photoshoots",
      "/photoshoots/:slug*",
      "/en/photoshoots/:slug*",
      "/es/photoshoots/:slug*",
      "/faq",
      "/en/faq",
      "/es/faq",
      "/corporate-events",
      "/en/corporate-events",
      "/es/corporate-events",
      "/contact",
      "/en/contact",
      "/es/contact",
      "/about",
      "/en/about",
      "/es/about",
    ]

    return [
      // Security headers for all routes
      {
        source: "/(.*)",
        headers: createSecurityHeaders(),
      },
      // Immutable cache for static assets
      {
        source: "/images/(.*)",
        headers: [createImmutableCacheHeaders()],
      },
      {
        source: "/_next/static/(.*)",
        headers: [createImmutableCacheHeaders()],
      },
      // Dynamic caching for all defined routes
      ...routes.map(route => ({
        source: route,
        headers: [createCacheHeaders(3)],
      })),
    ]
  },
}

export default withNextIntl(nextConfig)
