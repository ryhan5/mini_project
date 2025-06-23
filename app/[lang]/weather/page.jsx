import { languages } from '@/config/languages';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import dynamic from 'next/dynamic';

// Dynamically import the client component
const WeatherPageClient = dynamic(() => import('./WeatherPageClient'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[60vh]">
      <LoadingSpinner size="lg" />
    </div>
  )
});

// This function tells Next.js which paths to pre-render at build time
export async function generateStaticParams() {
  return languages.map(lang => ({
    lang: lang.code,
  }));
}

// This ensures dynamic parameters are filled in at request time
export const dynamicParams = true;

// Server Component Wrapper
export default function WeatherPage({ params: { lang } }) {
  // Validate language
  const isValidLanguage = languages.some(language => language.code === lang);
  
  if (!isValidLanguage) {
    // This will be handled by the middleware, but we include it here for safety
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Weather Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <LoadingSpinner size="lg" />
            </div>
          }>
            <WeatherPageClient lang={lang} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
