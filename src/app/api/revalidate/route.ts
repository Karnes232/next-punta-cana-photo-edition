import { NextRequest, NextResponse } from "next/server"
import { revalidateTag, revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { secret, type, tags, paths } = body

    // Verify the secret to prevent unauthorized access
    // if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    //   return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    // }

    console.log("Revalidating:", { type, tags, paths })

    // Revalidate by tags (most efficient for our setup)
    if (tags && Array.isArray(tags)) {
      for (const tag of tags) {
        revalidateTag(tag)
        console.log(`Revalidated tag: ${tag}`)
      }
    }

    // Revalidate by paths (fallback)
    if (paths && Array.isArray(paths)) {
      for (const path of paths) {
        revalidatePath(path)
        console.log(`Revalidated path: ${path}`)
      }
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      tags: tags || [],
      paths: paths || [],
    })
  } catch (err) {
    console.error("Revalidation error:", err)
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 })
  }
}
