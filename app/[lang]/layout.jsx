'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { notFound } from 'next/navigation';
import Head from 'next/head';
import { TooltipProvider } from '@/components/ui/tooltip';
import { languages } from '@/config/languages';
import { getPageMetadata } from '@/config/metadata';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function LanguageLayout({ children, params }) {
  const pathname = usePathname();
  const router = useRouter();
  const { lang } = params;
  const { currentLanguage } = useLanguage();
  
  // Validate that the requested language exists
  const isValidLanguage = languages.some(language => language.code === lang);
  
  // Handle redirection for language root paths
  useEffect(() => {
    // If the URL is just /en or /fr, redirect to /en/home or /fr/home
    if (pathname === `/${lang}`) {
      router.replace(`/${lang}/home`);
    }
  }, [pathname, lang, router]);

  if (!isValidLanguage) {
    notFound();
  }

  // Get metadata for the current page
  const metadata = getPageMetadata(pathname, currentLanguage);

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={metadata.keywords?.join(', ')} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://agrosarthi.com${pathname}`} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://agrosarthi.com${pathname}`} />
        <meta name="twitter:title" content={metadata.openGraph.title} />
        <meta name="twitter:description" content={metadata.openGraph.description} />
        <meta name="twitter:image" content="/images/og-image.jpg" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      
      <TooltipProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-1">
            {/* Page title for screen readers */}
            <h1 className="sr-only">{metadata.title}</h1>
            {children}
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </>
  );
}

// Disable static generation for this route
export const dynamic = 'force-dynamic';
