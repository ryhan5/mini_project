'use client';

import { useLanguage } from '@/context/LanguageContext';
import translations from '@/translations';

export function useTranslation() {
  const { currentLanguage } = useLanguage();

  const t = (key) => {
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
        return enResult || key; // Return the key if no translation found
      }
    }
    
    return result || key; // Return the key if no translation found
  };

  return t;
}
