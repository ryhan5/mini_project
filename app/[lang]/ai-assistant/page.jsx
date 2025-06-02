'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { languages } from '@/config/languages';

// Dynamically import the ChatInterface component with SSR disabled
const ChatInterface = dynamic(
  () => import('./components/ChatInterface'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-gray-600">Loading AI Assistant...</p>
        </div>
      </div>
    )
  }
);

// This function tells Next.js which paths to pre-render at build time
export async function generateStaticParams() {
  return languages.map((lang) => ({
    lang: lang.code,
  }));
}

// This ensures dynamic parameters are filled in at request time
export const dynamicParams = true;

export default function AIAssistantPage({ params }) {
  const { lang } = params;
  const isValidLanguage = languages.some(language => language.code === lang);
  
  if (!isValidLanguage) {
    // This will be handled by the middleware, but we include it here for safety
    return null;
  }

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-gray-600">Loading AI Assistant...</p>
        </div>
      </div>
    }>
      <ChatInterface lang={lang} />
    </Suspense>
  );
}