import { notFound } from 'next/navigation';
import { languages } from '@/config/languages';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function LanguageLayout({ children, params }) {
  // Validate that the requested language exists
  const { lang } = params;
  const isValidLanguage = languages.some(language => language.code === lang);
  
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

export function generateStaticParams() {
  return languages.map((language) => ({
    lang: language.code,
  }));
}

export const dynamicParams = false;
