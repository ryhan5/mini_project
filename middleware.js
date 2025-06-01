import { NextResponse } from 'next/server';
import { locales, defaultLocale } from './config/languages';

const publicFiles = [
  '/favicon.ico',
  '/images/',
  '/_next/',
  '/api/',
  '/fonts/',
  '/sitemap.xml',
  '/robots.txt'
];

function isPublicFile(pathname) {
  return publicFiles.some(file => pathname.startsWith(file));
}

function isApiRoute(pathname) {
  return pathname.startsWith('/api/');
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for public files, API routes, and static files
  if (isPublicFile(pathname) || isApiRoute(pathname) || pathname.includes('.')) {
    return NextResponse.next();
  }

  // Check if the pathname is missing a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // If the pathname already has a valid locale, continue
  if (pathnameHasLocale) {
    // If the path is just /{locale}, redirect to /{locale}/home
    if (pathname === `/${pathname.split('/')[1]}`) {
      const url = new URL(`/${pathname.split('/')[1]}/home`, request.url);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Get the preferred language from the cookie or use default
  const preferredLanguage = request.cookies.get('NEXT_LOCALE')?.value || defaultLocale;
  
  // Create a new URL with the preferred language
  const newPathname = pathname === '/' ? `/${preferredLanguage}/home` : `/${preferredLanguage}${pathname}`;
  const url = new URL(newPathname, request.url);
  
  // Redirect to the localized URL
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/((?!_next|_vercel|.*\..*).*)',
  ],
};
