'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function LanguageProvider({ children, lang }) {
  const { setLanguage } = useLanguage();
  
  // Update the language in context when it changes
  useEffect(() => {
    setLanguage(lang);
  }, [lang, setLanguage]);

  return children;
}
