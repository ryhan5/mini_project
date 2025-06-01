'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { t } from '@/translations';

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

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];
  
  // Get the current path without the language prefix
  const getLocalizedPath = (langCode) => {
    // Remove any existing language prefix
    const pathWithoutLang = pathname.replace(/^\/(en|hi|bn|te|ta|mr)/, '');
    // Add new language prefix
    return `/${langCode}${pathWithoutLang}`;
  };
  
  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
    
    // Update the URL with the new language
    const newPath = getLocalizedPath(langCode);
    router.push(newPath);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="h-4 w-4 text-gray-500" />
        <span className="hidden sm:inline">{currentLang.name}</span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
          <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
            {t('selectLanguage', currentLanguage) || 'Select Language'}
          </div>
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between ${
                currentLanguage === language.code
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <span className="mr-2 text-sm">{language.flag}</span>
                {language.name}
              </div>
              {currentLanguage === language.code && (
                <Check className="h-4 w-4 text-green-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
