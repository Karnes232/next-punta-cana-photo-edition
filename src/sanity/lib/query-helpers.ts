/**
 * Helper functions and constants for Sanity CMS queries
 * These utilities reduce code duplication and ensure consistency across queries
 */

/**
 * Common GROQ fragments for reusable query patterns
 * These can be embedded in larger queries using template literals
 */

/**
 * Standard image asset query pattern
 * Returns URL, metadata dimensions, and alt text
 */
export const imageAssetFragment = `
  asset -> {
    url,
    metadata {
      dimensions {
        width,
        height
      }
    }
  },
  alt
`

/**
 * Hero section query pattern
 * Returns title, subtitle, images, video, and size settings
 */
export const heroFragment = `
  hero {
    pageName,
    title {
      en,
      es
    },
    subtitle {
      en,
      es
    },
    heroImage[] {
      ${imageAssetFragment}
    },
    heroVideo,
    fullSize
  }
`

/**
 * Testimonial query pattern
 * Returns ID, name, photo, role, and short quote
 */
export const testimonialFragment = `
  testimonials[] {
    _id,
    name,
    photo {
      ${imageAssetFragment}
    },
    role {
      en,
      es
    },
    shortQuote {
      en,
      es
    }
  }
`

/**
 * Gallery item query pattern
 * Returns asset information and alt text
 */
export const galleryItemFragment = `
  gallery[] {
    ${imageAssetFragment}
  }
`

/**
 * Creates standardized fetch options for Sanity queries
 * @param days - Revalidation period in days (default: 3)
 * @param tags - Array of revalidation tags for tag-based cache invalidation
 * @returns Configuration object for Next.js fetch options
 *
 * @example
 * ```typescript
 * const data = await client.fetch(query, params, createFetchOptions(3, ['homepage']))
 * ```
 */
export function createFetchOptions(days: number = 3, tags: string[] = []) {
  return {
    cache: "force-cache" as const,
    next: {
      revalidate: days * 86400, // Convert days to seconds (86400 = 1 day)
      tags,
    },
  }
}

/**
 * Helper for building dynamic cache tags
 * Useful when you need to include parameters in cache tags
 * @param parts - Parts to combine into cache tag names
 * @returns Array of string cache tags
 *
 * @example
 * ```typescript
 * // Returns: ['post:123', 'category:456']
 * createCacheTags(['post', 123], ['category', 456])
 * ```
 */
export function createCacheTags(...parts: Array<string | number>[]): string[] {
  return parts.map(part => part.join(":"))
}

/**
 * Convenience function for creating page-specific fetch options
 * Automatically adds page name to cache tags
 * @param pageName - Name of the page/document type
 * @param days - Revalidation period in days (default: 3)
 * @param additionalTags - Additional cache tags (optional)
 * @returns Configuration object for Next.js fetch options
 *
 * @example
 * ```typescript
 * const data = await client.fetch(
 *   query,
 *   params,
 *   createPageFetchOptions('homepage')
 * )
 * // Result: tags: ['homepage']
 * ```
 */
export function createPageFetchOptions(
  pageName: string,
  days: number = 3,
  additionalTags: string[] = [],
) {
  return createFetchOptions(days, [pageName, ...additionalTags])
}
