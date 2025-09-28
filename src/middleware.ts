import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

export default createMiddleware(routing)

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  // - … the ones starting with `/tui` (admin interface)
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    // - … the ones starting with `/tui` (admin interface)
    "/((?!api|trpc|_next|studio|_vercel|.*\\..*).*)",
    // Also match pathnames that start with a locale
    "/(en|es)/:path*",
  ],
}
