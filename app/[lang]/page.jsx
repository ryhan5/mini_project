'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { languages } from '@/config/languages';

export default function LangPage({ params }) {
  const router = useRouter();
  const { lang } = params;
  
  // Validate language
  const isValidLanguage = languages.some(language => language.code === lang);
  
  useEffect(() => {
    if (!isValidLanguage) {
      router.replace('/404');
      return;
    }
    
    // Redirect to the home page for this language
    router.replace(`/${lang}/home`);
  }, [lang, isValidLanguage, router]);
  
  // Show loading state
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
    </div>
  );
}

// Disable static generation for this page
export const dynamic = 'force-dynamic';
