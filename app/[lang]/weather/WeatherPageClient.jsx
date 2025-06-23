'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the WeatherClient component
const WeatherClient = dynamic(() => import('./WeatherClient'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  )
});

export default function WeatherPageClient({ lang }) {
  const [isMounted, setIsMounted] = useState(false);

  // Set isMounted to true after component mounts (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show loading state until client-side rendering starts
  if (!isMounted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return <WeatherClient lang={lang} />;
}
