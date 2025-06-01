'use client';

import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { LanguageProvider } from '@/context/LanguageContext';

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}
