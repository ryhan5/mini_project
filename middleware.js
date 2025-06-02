import { NextResponse } from 'next/server';
import { locales, defaultLocale } from './config/languages';

// List of public paths that don't require localization
const publicFiles = [
  '/favicon.ico',
  '/images/',
  '/_next/',
  '/fonts/',
  '/sitemap.xml',
  '/robots.txt'
];

// Files that should be excluded from middleware
const excludeFiles = [
  '/_next/static',
  '/_next/image',
  '/_next/webpack',
  '/_next/web-vitals',
  '/api',
  '/static',
  '/public',
  '/favicon.ico',
  '/manifest.json',
  '/sw.js',
  '/workbox-*.js',
  '/worker-*.js',
  '/*.png',
  '/*.jpg',
  '/*.jpeg',
  '/*.gif',
  '/*.svg',
  '/*.ico',
  '/*.json',
  '/*.txt',
  '/*.xml',
  '/*.webmanifest',
  '/*.woff',
  '/*.woff2',
  '/*.ttf',
  '/*.eot',
  '/*.css',
  '/*.js',
  '/*.map'
];

function isExcluded(pathname) {
  return excludeFiles.some(file => 
    pathname.startsWith(file) || 
    pathname.endsWith(file) ||
    pathname.includes('.')
  );
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for excluded paths
  if (isExcluded(pathname)) {
    return NextResponse.next();
  }

  // Check if the pathname is missing a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // If the pathname already has a valid locale, continue
  if (pathnameHasLocale) {
    // If the path is just /{locale}, redirect to /{locale}/home
    const locale = pathname.split('/')[1];
    if (pathname === `/${locale}`) {
      const url = new URL(`/${locale}/home`, request.url);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Get the preferred language from the cookie or use default
  const preferredLanguage = request.cookies.get('NEXT_LOCALE')?.value || defaultLocale;
  
  // Create a new URL with the preferred language
  const newPathname = pathname === '/' ? `/${preferredLanguage}/home` : `/${preferredLanguage}${pathname}`;
  const url = new URL(newPathname, request.url);
  
  // Set a cookie with the selected language and redirect
  const response = NextResponse.redirect(url);
  response.cookies.set('NEXT_LOCALE', preferredLanguage, { path: '/' });
  return response;
}

export const config = {
  matcher: [
    '/((?!_next|_vercel|.*\..*).*)',
  ],
};
