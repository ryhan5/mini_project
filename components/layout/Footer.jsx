import Link from 'next/link';
import { Laptop, Phone, Mail } from 'lucide-react';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Agrosarthi</h3>
            <p className="text-green-100 text-sm">
              Empowering farmers with data-driven insights and tools for sustainable agriculture.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/weather" className="text-green-200 hover:text-white transition-colors">Weather Forecast</Link></li>
              <li><Link href="/market-prices" className="text-green-200 hover:text-white transition-colors">Market Prices</Link></li>
              <li><Link href="/calculators" className="text-green-200 hover:text-white transition-colors">Farming Calculators</Link></li>
              <li><Link href="/knowledge-hub" className="text-green-200 hover:text-white transition-colors">Knowledge Hub</Link></li>
              <li><Link href="/crop-calendar" className="text-green-200 hover:text-white transition-colors">Crop Calendar</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-green-200 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="text-green-200 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="text-green-200 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/terms" className="text-green-200 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-green-200 hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-green-300" />
                <span>+91 1800-AGROSARTHI-HELP</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-green-300" />
                <span>support@agrosarthi.com</span>
              </li>
              <li className="flex items-start">
                <Laptop className="h-5 w-5 mr-2 text-green-300" />
                <span>Download our mobile app</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-green-800 mt-12 pt-6 text-sm text-center text-green-300">
          <p>&copy; {new Date().getFullYear()} Agrosarthi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}