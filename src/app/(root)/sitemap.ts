import { MetadataRoute } from "next"
import { client } from "@/sanity/lib/client"

// Base URL for the website
const baseUrl = "https://www.puntacanaphotoedition.com"

// Static pages - both English and Spanish
const staticPages = [
  "/",
  "/about",
  "/contact",
  "/wedding-photography",
  "/photoshoots",
  "/proposals",
  "/corporate-events",
  "/wedding-planning",
  "/faq",
  "/policies",
  "/stories",
  // Spanish versions
  "/es",
  "/es/about",
  "/es/contact",
  "/es/wedding-photography",
  "/es/photoshoots",
  "/es/proposals",
  "/es/corporate-events",
  "/es/wedding-planning",
  "/es/faq",
  "/es/policies",
  "/es/stories",
]

// Fetch blog posts from Sanity
async function getBlogPosts() {
  try {
    const posts = await client.fetch(
      `*[_type == "blogPost"] {
        slug {
          current
        }
      }`,
      {},
      {
        cache: "force-cache",
        next: { revalidate: 259200 },
      },
    )
    return posts || []
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

// Fetch photoshoot packages from Sanity
async function getPhotoshootPackages() {
  try {
    const packages = await client.fetch(
      `*[_type == "photoshootsPackages"] {
        slug {
          current
        }
      }`,
      {},
      {
        cache: "force-cache",
        next: { revalidate: 259200 },
      },
    )
    return packages || []
  } catch (error) {
    console.error("Error fetching photoshoot packages:", error)
    return []
  }
}

// Fetch proposal packages from Sanity
async function getProposalPackages() {
  try {
    const packages = await client.fetch(
      `*[_type == "proposalPackages"] {
        slug {
          current
        }
      }`,
      {},
      {
        cache: "force-cache",
        next: { revalidate: 259200 },
      },
    )
    return packages || []
  } catch (error) {
    console.error("Error fetching proposal packages:", error)
    return []
  }
}

// Fetch photography video packages from Sanity
async function getPhotographyVideoPackages() {
  try {
    const packages = await client.fetch(
      `*[_type == "photography-video-packages"] {
        slug {
          current
        }
      }`,
      {},
      {
        cache: "force-cache",
        next: { revalidate: 259200 },
      },
    )
    return packages || []
  } catch (error) {
    console.error("Error fetching photography video packages:", error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all dynamic content
  const [
    blogPosts,
    photoshootPackages,
    proposalPackages,
    photographyVideoPackages,
  ] = await Promise.all([
    getBlogPosts(),
    getPhotoshootPackages(),
    getProposalPackages(),
    getPhotographyVideoPackages(),
  ])

  // Build sitemap entries for static pages
  const staticEntries: MetadataRoute.Sitemap = staticPages.map(page => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: page === "/" ? 1.0 : 0.8,
  }))

  // Build sitemap entries for blog posts
  const blogEntries: MetadataRoute.Sitemap = []
  for (const post of blogPosts) {
    if (post.slug?.current) {
      blogEntries.push(
        {
          url: `${baseUrl}/stories/${post.slug.current}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        },
        {
          url: `${baseUrl}/es/stories/${post.slug.current}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        },
      )
    }
  }

  // Build sitemap entries for photoshoot packages
  const photoshootEntries: MetadataRoute.Sitemap = []
  for (const pkg of photoshootPackages) {
    if (pkg.slug?.current) {
      photoshootEntries.push(
        {
          url: `${baseUrl}/photoshoots/${pkg.slug.current}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        },
        {
          url: `${baseUrl}/es/photoshoots/${pkg.slug.current}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        },
      )
    }
  }

  // Build sitemap entries for proposal packages
  const proposalEntries: MetadataRoute.Sitemap = []
  for (const pkg of proposalPackages) {
    if (pkg.slug?.current) {
      proposalEntries.push(
        {
          url: `${baseUrl}/proposals/${pkg.slug.current}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        },
        {
          url: `${baseUrl}/es/proposals/${pkg.slug.current}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        },
      )
    }
  }

  // Build sitemap entries for photography video packages
  const photographyVideoEntries: MetadataRoute.Sitemap = []
  for (const pkg of photographyVideoPackages) {
    if (pkg.slug?.current) {
      photographyVideoEntries.push(
        {
          url: `${baseUrl}/wedding-photography/${pkg.slug.current}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        },
        {
          url: `${baseUrl}/es/wedding-photography/${pkg.slug.current}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        },
      )
    }
  }

  // Combine all entries
  return [
    ...staticEntries,
    ...blogEntries,
    ...photoshootEntries,
    ...proposalEntries,
    ...photographyVideoEntries,
  ]
}
