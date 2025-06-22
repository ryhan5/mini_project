'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/translations/index'; 
import Image from 'next/image';
import { 
  Menu, 
  X, 
  Home, 
  CloudSun, 
  Calculator, 
  Book, 
  Bot, 
  LayoutDashboard, 
  Calendar,
  Tractor,
  Leaf,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';

// Navigation items with translation keys
const navigation = [
  { name: 'nav.home', href: '/home', icon: Home },
  { name: 'nav.weather', href: '/weather', icon: CloudSun },
  { name: 'nav.cropCalendar', href: '/crop-calendar', icon: Calendar },
  { name: 'nav.cropAI', href: '/crop-assistant', icon: Bot },
  { name: 'nav.calculators', href: '/calculators', icon: Calculator },
  { name: 'nav.equipment', href: '/equipment-exchange', icon: Tractor },
  { name: 'nav.guides', href: '/knowledge-hub', icon: Book },
  { name: 'nav.dashboard', href: '/dashboard', icon: LayoutDashboard, protected: true }
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  
  // Memoize the current language to prevent unnecessary re-renders
  const memoizedCurrentLanguage = useMemo(() => currentLanguage, [currentLanguage]);
  
  // Get the current path with the correct language prefix
  const getLocalizedPath = useMemo(() => (path) => {
    if (!path) return `/${memoizedCurrentLanguage}/home`;
    
    // Remove any existing language prefix
    const pathWithoutLang = path.replace(/^\/(en|hi|bn|te|ta|mr)/, '');
    // Ensure path starts with a slash and doesn't have double slashes
    const cleanPath = pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`;
    // Add current language prefix
    return `/${memoizedCurrentLanguage}${cleanPath}`;
  }, [memoizedCurrentLanguage]);
  
  // Memoize the active path check
  const isActive = useMemo(() => (href) => {
    if (!pathname) return false;
    const path = pathname.replace(/^\/(en|hi|bn|te|ta|mr)/, '');
    const hrefPath = href === '/' ? '/home' : href;
    return path === hrefPath || path.startsWith(`${hrefPath}/`);
  }, [pathname]);
  
  // Memoize the navigation items with translated labels
  const translatedNavigation = useMemo(() => 
    navigation.map(item => ({
      ...item,
      label: t(item.name, memoizedCurrentLanguage) || item.name.replace('nav.', '')
    })),
    [memoizedCurrentLanguage]
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href={getLocalizedPath('/home')} className="flex items-center group">
                <Image
              src="/images/logo.jpeg"
              alt="Agrosarthi Logo"
              width={160}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
              </Link>
            </div>
            <nav className="hidden lg:ml-8 lg:flex lg:space-x-1 overflow-x-auto">
              <div className="flex space-x-1">
                {translatedNavigation.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={getLocalizedPath(item.href)}
                      className={cn(
                        'inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap',
                        active 
                          ? 'bg-green-50 text-green-700 font-semibold' 
                          : 'text-gray-600 hover:text-green-700 hover:bg-green-50',
                        item.protected && 'text-purple-600 hover:text-purple-700'
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {React.createElement(item.icon, { 
                        className: cn("mr-1.5 h-4 w-4 flex-shrink-0", 
                          active ? 'opacity-100' : 'opacity-70'
                        ) 
                      })}
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
          <div className="hidden lg:flex items-center space-x-2">
            <LanguageSelector />
          </div>
          <div className="flex items-center space-x-2 lg:hidden">
            <LanguageSelector />
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={cn(
          'lg:hidden transition-all duration-300 ease-in-out overflow-hidden',
          mobileMenuOpen ? 'max-h-screen' : 'max-h-0'
        )}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="pt-2 pb-4 space-y-1 px-2">
          {translatedNavigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={getLocalizedPath(item.href)}
                className={cn(
                  'group flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors',
                  active
                    ? 'bg-green-50 text-green-700 font-semibold'
                    : 'text-gray-600 hover:text-green-700 hover:bg-green-50',
                  item.protected && 'text-purple-600 hover:text-purple-700'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className={cn(
                  'mr-3 rounded-md p-1.5',
                  active 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-gray-100 text-gray-500 group-hover:bg-green-50 group-hover:text-green-600'
                )}>
                  {React.createElement(item.icon, { 
                    className: cn("h-5 w-5"),
                    'aria-hidden': 'true'
                  })}
                </span>
                <span>{item.label}</span>
                
                {active && (
                  <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {t('common.current', memoizedCurrentLanguage)}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}