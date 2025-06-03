import { NextResponse } from 'next/server';
import { languages } from '../config/languages';

// Debug flag
const DEBUG = true;

const log = (...args) => {
  if (DEBUG) console.log('[Middleware]', ...args);
};

const PUBLIC_FILE = /^\.(?!.*\.[a-z0-9]+$).*/i;

// Default language
const DEFAULT_LANG = 'en';

// List of paths that should be handled by Next.js directly
const EXCLUDED_PATHS = [
  '/_next',
  '/api',
  '/favicon.ico',
  '/images',
  '/fonts',
  '/favicon',
  '/sitemap',
  '/robots.txt',
  '/sitemap.xml',
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
  
  // Skip public files and excluded paths
  if (PUBLIC_FILE.test(pathname) || EXCLUDED_PATHS.some(path => pathname.startsWith(path))) {
    log(`Skipping: ${pathname} (matches excluded paths)`);
    return NextResponse.next();
  }
  
  // Handle root path - redirect to /en/home
  if (pathname === '/' || pathname === '') {
    const newUrl = new URL(`/${DEFAULT_LANG}/home`, origin);
    log(`Redirecting root path to: ${newUrl.toString()}`);
    return NextResponse.redirect(newUrl, 307);
  }

  // Remove trailing slashes
  const cleanPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  
  // Check if the first segment is a valid language code
  const segments = cleanPath.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  // Handle language root paths (e.g., /en -> /en/home)
  if (segments.length === 1 && languages.some(lang => lang.code === firstSegment)) {
    const newUrl = new URL(`/${firstSegment}/home`, origin);
    log(`Redirecting language root to: ${newUrl.toString()}`);
    return NextResponse.redirect(newUrl, 307);
  }
  
  // Handle language-less paths (e.g., /home -> /en/home)
  if (firstSegment && !languages.some(lang => lang.code === firstSegment)) {
    // Check if the path is a valid path that should have a language prefix
    if (VALID_PATHS.some(validPath => cleanPath.startsWith(validPath))) {
      const newUrl = new URL(`/${DEFAULT_LANG}${cleanPath}`, origin);
      log(`Adding default locale to path: ${newUrl.toString()}`);
      return NextResponse.redirect(newUrl, 307);
    }
  }
  
  // Continue with the request if no redirection is needed
  log(`Passing through: ${pathname}`);
  return NextResponse.next();
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
