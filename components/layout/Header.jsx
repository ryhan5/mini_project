'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/translations';
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
  Leaf
} from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';

const navigation = [
  { name: 'home', href: '/', icon: Home },
  { name: 'weather', href: '/weather', icon: CloudSun },
  { name: 'cropCalendar', href: '/crop-calendar', icon: Calendar },
  { name: 'cropAssistant', href: '/crop-assistant', icon: Bot },
  { name: 'calculators', href: '/calculators', icon: Calculator },
  { name: 'equipmentExchange', href: '/equipment-exchange', icon: Tractor },
  { name: 'knowledgeHub', href: '/knowledge-hub', icon: Book },
  { name: 'dashboard', href: '/dashboard', icon: LayoutDashboard, protected: true }
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  
  // Get the current path without the language prefix
  const getLocalizedPath = (path) => {
    // Remove any existing language prefix
    const pathWithoutLang = path.replace(/^\/(en|hi|bn|te|ta|mr)/, '');
    // Add current language prefix
    return `/${currentLanguage}${pathWithoutLang}`;
  };
  
  // Check if a navigation item is active
  const isActive = (href) => {
    const path = pathname.replace(/^\/(en|hi|bn|te|ta|mr)/, '');
    const hrefPath = href === '/' ? '/home' : href;
    return path === hrefPath || path.startsWith(`${hrefPath}/`);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform">
                  <Leaf className="h-5 w-5" />
                </div>
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">Agrosarthi</span>
              </Link>
            </div>
            <nav className="hidden lg:ml-8 lg:flex lg:space-x-1 overflow-x-auto">
              <div className="flex space-x-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={getLocalizedPath(item.href)}
                    className={cn(
                      'inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-green-700 hover:bg-green-50 transition-colors whitespace-nowrap',
                      isActive(item.href) && 'bg-green-50 text-green-700 font-semibold',
                      item.protected && 'text-purple-600 hover:text-purple-700'
                    )}
                  >
                    {React.createElement(item.icon, { 
                      className: cn("mr-1.5 h-4 w-4 flex-shrink-0", 
                        isActive(item.href) ? 'opacity-100' : 'opacity-70'
                      ) 
                    })}
                    {t(item.name, currentLanguage)}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
          <div className="hidden lg:flex items-center space-x-2">
            <LanguageSelector />
          </div>
          <div className="flex items-center space-x-2 lg:hidden">
            <LanguageSelector />
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:bg-green-50 hover:text-green-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn('lg:hidden bg-white shadow-lg', mobileMenuOpen ? 'block' : 'hidden')}>
        <div className="pt-2 pb-3 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={getLocalizedPath(item.href)}
              className={cn(
                'block px-4 py-3 text-base font-medium hover:bg-gray-50 transition-colors',
                isActive(item.href) 
                  ? 'bg-green-50 text-green-700 border-l-4 border-green-600'
                  : 'text-gray-700',
                item.protected && 'text-purple-600 hover:bg-purple-50'
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                {React.createElement(item.icon, { 
                  className: cn("mr-3 h-5 w-5 flex-shrink-0",
                    isActive(item.href) ? 'opacity-100' : 'opacity-70'
                  ) 
                })}
                <span>{t(item.name, currentLanguage)}</span>
                {item.protected && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Pro
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}