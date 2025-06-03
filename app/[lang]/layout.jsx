'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { notFound } from 'next/navigation';
import { languages } from '@/config/languages';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function LanguageLayout({ children, params }) {
  const pathname = usePathname();
  const router = useRouter();
  const { lang } = params;
  
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

// Disable static generation for this route
export const dynamic = 'force-dynamic';
