import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/LanguageContext';
import { languages, defaultLocale } from '@/config/languages';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Agrosarthi - Smart Farming Assistant',
  description: 'Make data-driven decisions for your farm with our comprehensive suite of tools',
};

// Generate static params for all supported languages
export function generateStaticParams() {
  return languages.map((lang) => ({
    lang: lang.code,
  }));
}

export default function RootLayout({ children, params }) {
  // Get language from params or default to 'en'
  const lang = params?.lang || defaultLocale;
  
  // Validate the language
  const isValidLanguage = languages.some(l => l.code === lang);
  if (!isValidLanguage) {
    // If invalid language, default to English
    params.lang = defaultLocale;
  }
  
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <LanguageProvider>
            {children}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

// Disable static generation for the root layout
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export const runtime = 'nodejs';
