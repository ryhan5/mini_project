'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { t } from '@/translations/index'; // Make sure to include /index
import { cn } from '@/lib/utils';

export default function LanguageSelector() {
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Memoize the current language to prevent unnecessary re-renders
  const memoizedCurrentLanguage = useMemo(() => currentLanguage, [currentLanguage]);
  
  // Get the current path with the new language prefix
  const getLocalizedPath = useCallback((langCode) => {
    if (!pathname) return `/${langCode}/home`;
    
    // Remove any existing language prefix and ensure path starts with a slash
    const pathWithoutLang = pathname.replace(/^\/(en|hi|bn|te|ta|mr)/, '');
    const cleanPath = pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`;
    
    // Add new language prefix
    return `/${langCode}${cleanPath}`;
  }, [pathname]);
  
  // Handle language change
  const handleLanguageChange = useCallback((langCode) => {
    if (langCode === memoizedCurrentLanguage) {
      setIsOpen(false);
      return;
    }
    
    // Update the language in context
    changeLanguage(langCode);
    setIsOpen(false);
    
    // Update the URL with the new language
    const newPath = getLocalizedPath(langCode);
    router.push(newPath);
  }, [memoizedCurrentLanguage, changeLanguage, getLocalizedPath, router]);
  
  // Get current language display info
  const currentLang = useMemo(() => 
    languages.find(lang => lang.code === memoizedCurrentLanguage) || languages[0],
    [memoizedCurrentLanguage, languages]
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center space-x-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors',
          'text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
          isOpen ? 'bg-gray-100' : ''
        )}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={t('selectLanguage', memoizedCurrentLanguage) || 'Select language'}
      >
        <Globe className="h-4 w-4 text-gray-500" aria-hidden="true" />
        <span className="hidden sm:inline">{currentLang?.name || memoizedCurrentLanguage}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-500" aria-hidden="true" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" aria-hidden="true" />
        )}
      </button>

      {/* Dropdown menu */}
      <div 
        className={cn(
          'absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200',
          'transition-all duration-150 ease-in-out',
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        )}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="language-selector"
      >
        <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
          {t('selectLanguage', memoizedCurrentLanguage) || 'Select Language'}
        </div>
        <div className="py-1 max-h-60 overflow-auto">
          {languages.map((language) => {
            const isCurrent = memoizedCurrentLanguage === language.code;
            return (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={cn(
                  'w-full text-left px-4 py-2.5 text-sm flex items-center justify-between',
                  'focus:outline-none focus:bg-gray-50',
                  isCurrent 
                    ? 'bg-green-50 text-green-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                )}
                role="menuitem"
                aria-current={isCurrent ? 'true' : undefined}
              >
                <div className="flex items-center">
                  <span className="mr-3 text-base" aria-hidden="true">
                    {language.flag}
                  </span>
                  <span>{language.name}</span>
                  {language.nativeName && language.nativeName !== language.name && (
                    <span className="ml-2 text-xs text-gray-500">
                      {language.nativeName}
                    </span>
                  )}
                </div>
                {isCurrent && (
                  <Check className="h-4 w-4 text-green-600" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
