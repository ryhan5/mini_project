'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Dynamically import the ChatInterface component with SSR disabled
const ChatInterface = dynamic(
  () => import('./components/ChatInterface'),
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

export default function AIAssistantClient() {
  return (
    <div className="h-full w-full">
      <Suspense fallback={
        <div className="flex items-center justify-center h-full bg-gradient-to-br from-green-50 to-blue-50">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-green-600" />
            <p className="text-gray-600 text-lg">Loading AI Assistant...</p>
          </div>
        </div>
      }>
        <ChatInterface />
      </Suspense>
    </div>
  );
}
