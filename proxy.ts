import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Exclou API, _next, fitxers estàtics i assets
    '/((?!api|_next|_vercel|static|assets|favicon.ico|robots.txt|.*\\.(?:webp|png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2|ttf|eot|pdf|zip)).*)',
  ],
};
