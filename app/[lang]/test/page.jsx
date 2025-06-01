import { languages } from '@/config/languages';
import TestPageClient from './TestPageClient';

export default function TestPage({ params }) {
  const { lang } = params;
  const isValidLanguage = languages.some(language => language.code === lang);
  
  if (!isValidLanguage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-red-600">Invalid Language</h1>
          <p className="text-center mb-4">The requested language is not supported.</p>
          <div className="flex justify-center">
            <a href="/" className="text-blue-600 hover:underline">Go to Home</a>
          </div>
        </div>
      </div>
    );
  }
  
  return <TestPageClient lang={lang} />;
}

export async function generateStaticParams() {
  const { languages } = await import('@/config/languages');
  return languages.map(lang => ({ lang: lang.code }));
}

export const dynamicParams = false;
