import { createMiddleware } from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['ca', 'es', 'en', 'fr'],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'ca',
  localePrefix: 'as-needed', // Add prefix only for non-default locales
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    /*
     * Match all pathnames except for:
     * - ... if they start with `/api`, `/_next`, `/_vercel`, `/static`, `/assets`, `/favicon.ico`, `/robots.txt`
     * - ... if they contain a dot (e.g. `/file.jpg`)
     */
    '/((?!api|_next|_vercel|static|assets|favicon.ico|robots.txt).*)',
  ],
};