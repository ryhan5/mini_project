'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
const { languages, locales, defaultLocale } = require('@/config/languages');

// Re-export languages and locales for use in other components
export { languages, locales };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLocale);
  const router = useRouter();
  const pathname = usePathname();

  // Initialize language from URL or localStorage
  useEffect(() => {
    const pathParts = pathname.split('/').filter(Boolean);
    const pathLang = pathParts[0];
    const validLang = languages.some(lang => lang.code === pathLang);
    
    if (validLang) {
      setCurrentLanguage(pathLang);
      localStorage.setItem('preferredLanguage', pathLang);
    } else {
      const savedLang = localStorage.getItem('preferredLanguage') || defaultLocale;
      setCurrentLanguage(savedLang);
      
      // Redirect to the saved language if not in URL
      if (savedLang !== pathParts[0]) {
        const newPath = `/${savedLang}${pathname}`;
        router.replace(newPath);
      }
    }
  }, [pathname, router]);

  const changeLanguage = (langCode) => {
    if (langCode === currentLanguage) return;
    
    // Update the state and local storage
    setCurrentLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
    
    // Get current path without language prefix
    const pathWithoutLang = pathname.split('/').filter((part, i) => {
      // Remove the language part from the path
      if (i === 0 && languages.some(lang => lang.code === part)) {
        return false;
      }
      return Boolean(part);
    }).join('/');
    
    // Construct new path with the new language
    const newPath = `/${langCode}${pathWithoutLang ? `/${pathWithoutLang}` : '/home'}`;
    
    // Use replace to avoid adding to browser history
    router.replace(newPath);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
