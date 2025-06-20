import { NextResponse } from 'next/server';
import { languages, defaultLocale } from './config/languages';

// Debug flag
const DEBUG = true;

const log = (...args) => {
  if (DEBUG) console.log('[Middleware]', ...args);
};

// List of paths that should be handled by Next.js directly
const EXCLUDED_PATHS = [
  '/_next',
  '/api',
  '/favicon.ico',
  '/images',
  '/fonts',
  '/sitemap',
  '/robots.txt',
  '/manifest.json',
  '/sw.js',
  '/workbox-*.js',
  '/static',
  '/public',
  '/build',
  '/__nextjs_original-stack-frame',
  '/__nextjs_loading',
];

// List of valid paths that don't require a language prefix
const VALID_PATHS = ['/home', '/about'];

export function middleware(request) {
  const { pathname, search, origin } = request.nextUrl;
  
  log(`Processing request for: ${pathname}`);
  
  // Skip excluded paths
  if (EXCLUDED_PATHS.some(path => pathname.startsWith(path))) {
    log(`Skipping: ${pathname} (matches excluded paths)`);
    return NextResponse.next();
  }
  
  // Split pathname into parts
  const pathParts = pathname.split('/').filter(Boolean);
  const maybeLang = pathParts[0];
  
  // Check if the first part is a valid language code
  const isValidLang = languages.some(lang => lang.code === maybeLang);
  
  // If it's a valid language, continue with the request
  if (isValidLang) {
    log(`Valid language detected: ${maybeLang}`);
    
    // If this is just the language code (e.g., /en), redirect to /en/home
    if (pathParts.length === 1) {
      const newUrl = new URL(`/${maybeLang}/home`, origin);
      log(`Redirecting to home: ${newUrl.toString()}`);
      return NextResponse.redirect(newUrl, 307);
    }
    
    return NextResponse.next();
  }
  
  // If no language prefix, redirect to default language with the same path
  const newPath = `/${defaultLocale}${pathname === '/' ? '/home' : pathname}`;
  const newUrl = new URL(newPath, origin);
  log(`Adding default language prefix: ${newUrl.toString()}`);
  return NextResponse.redirect(newUrl, 307);
}

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - public folder (static files)
    '/((?!_next/static|_next/image|favicon.ico|.*\..*).*)',
    '/',
  ],
};

// This ensures the middleware runs on all routes
export const dynamic = 'force-dynamic';
