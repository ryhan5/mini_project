import { notFound } from 'next/navigation';
import { languages } from '@/config/languages';

export default function LangPage({ params }) {
  const { lang } = params;
  
  // Validate that the requested language exists
  const isValidLanguage = languages.some(language => language.code === lang);
  
  if (!isValidLanguage) {
    notFound();
  }
  
  // This will be caught by the middleware which will handle the redirection to /{lang}/home
  return null;
}

export function generateStaticParams() {
  return languages.map(language => ({
    lang: language.code
  }));
}

export const dynamicParams = false;
