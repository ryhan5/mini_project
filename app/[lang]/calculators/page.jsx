'use client';

import { languages } from '@/config/languages';
import dynamic from 'next/dynamic';

// Dynamically import the client component with SSR disabled
const CalculatorsList = dynamic(
  () => import('./CalculatorsList'),
  { ssr: false }
);

// This function tells Next.js which paths to pre-render at build time
export async function generateStaticParams() {
  return languages.map(lang => ({
    lang: lang.code,
  }));
}

// This ensures dynamic parameters are filled in at request time
export const dynamicParams = true;

export default function CalculatorsPage({ params: { lang } }) {
  // Validate language
  const isValidLanguage = languages.some(language => language.code === lang);
  
  if (!isValidLanguage) {
    // This will be handled by the middleware, but we include it here for safety
    return null;
  }
  
  return <CalculatorsList lang={lang} />;
}