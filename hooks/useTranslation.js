'use client';

import { useLanguage } from '@/context/LanguageContext';
import translations from '@/translations';

export function useTranslation() {
  const { currentLanguage } = useLanguage();

  const t = (key) => {
    // Always return a string to prevent React rendering errors
    if (!key || typeof key !== 'string') {
      console.warn('Translation key must be a non-empty string');
      return '';
    }

    // Split the key by dots to handle nested objects
    const keys = key.split('.');
    let result = translations[currentLanguage] || translations.en;

    // Traverse the translations object
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        // Fallback to English if translation is missing
        let enResult = translations.en;
        for (const enK of keys) {
          enResult = enResult?.[enK];
          if (!enResult) break;
        }
        // Always return a string
        const fallback = enResult || key;
        return typeof fallback === 'string' ? fallback : key;
      }
    }
    
    // CRITICAL: Always ensure we return a string, never an object
    if (typeof result === 'object' && result !== null) {
      console.warn(`Translation key '${key}' returns an object. Use a more specific key.`);
      return key; // Return the key as a string
    }
    
    // Ensure result is always a string
    const finalResult = result || key;
    return typeof finalResult === 'string' ? finalResult : String(finalResult);
  };

  return t;
}
