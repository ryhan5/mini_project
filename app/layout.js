import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Agrosarthi - Smart Farming Assistant',
  description: 'Make data-driven decisions for your farm with our comprehensive suite of tools',
};

export default function RootLayout({ children, params }) {
  // Default to English if no language is specified
  const lang = params?.lang || 'en';
  
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
