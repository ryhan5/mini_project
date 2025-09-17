'use client';

import { useEffect } from 'react';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import the AIAssistantClient component with SSR disabled
const AIAssistantClient = dynamic(
  () => import('./AIAssistantClient'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-green-50 to-blue-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-green-600" />
          <p className="text-gray-600 text-lg">Loading AI Assistant...</p>
        </div>
      </div>
    )
  }
);

export default function AIAssistantWrapper({ lang }) {
  useEffect(() => {
    // Hide the main layout including header and footer
    const style = document.createElement('style');
    style.textContent = `
      body {
        overflow: hidden !important;
      }
      /* Hide the main layout including header and footer */
      .main-layout,
      header,
      footer,
      main {
        display: none !important;
      }
      /* Ensure no scrolling anywhere */
      html, body {
        height: 100vh !important;
        overflow: hidden !important;
      }
    `;
    document.head.appendChild(style);

    // Cleanup function to restore layout when component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-white z-50"
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: 9999
      }}
    >
      {/* Custom Header for AI Assistant */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center px-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-900">AI Farming Assistant</h1>
        </div>
      </div>
      
      {/* Chat Content */}
      <div className="h-[calc(100vh-4rem)] overflow-hidden">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-green-50 to-blue-50">
            <div className="flex flex-col items-center space-y-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
              <p className="text-gray-600 text-lg">Loading AI Assistant...</p>
            </div>
          </div>
        }>
          <AIAssistantClient lang={lang} />
        </Suspense>
      </div>
    </div>
  );
}
