import { languages } from '@/config/languages';
import dynamic from 'next/dynamic';

// Dynamically import the client component with SSR disabled
const EquipmentExchangeClient = dynamic(
  () => import('./EquipmentExchangeClient'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    )
  }
);

// This function tells Next.js which paths to pre-render at build time
export async function generateStaticParams() {
  return languages.map(lang => ({
    lang: lang.code,
  }));
}

// This ensures dynamic parameters are filled in at request time
export const dynamicParams = true;

export default function EquipmentExchangePage({ params: { lang } }) {
  // Validate language
  const isValidLanguage = languages.some(language => language.code === lang);
  
  if (!isValidLanguage) {
    // This will be handled by the middleware, but we include it here for safety
    return null;
  }

  return <EquipmentExchangeClient />;
}
