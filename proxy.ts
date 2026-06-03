import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Exclou API, _next, fitxers estàtics i assets
  matcher: '/((?!api|_next|_vercel|static|assets|favicon.ico|robots.txt|.*\\.(?:webp|png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2|ttf|eot|pdf|zip|mp4|webm|mov|mp3|wav|ogg)).*)',
};
