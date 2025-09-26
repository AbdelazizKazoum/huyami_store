import createMiddleware from "next-intl/middleware";
import { locales } from "./src/i18n/config";

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: "en",

  // Only run middleware on specific paths
  localePrefix: "as-needed",

  // Automatically detect user's preferred language
  localeDetection: true,
});

export const config = {
  // Match only internationalized pathnames (exclude admin routes)
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(fr|ar|en)/:path*",

    // Enable redirects that add missing locales
    // but exclude admin routes, api routes, and static files
    "/((?!admin|api|_next|_vercel|favicon.ico|.*\\.).*)",
  ],
};
