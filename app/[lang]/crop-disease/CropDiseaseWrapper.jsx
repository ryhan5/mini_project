'use client';

import { useEffect } from 'react';
import CropDiseaseClient from './CropDiseaseClient';

export default function CropDiseaseWrapper() {
  useEffect(() => {
    // Hide footer and chatbot widget for this page
    const style = document.createElement('style');
    style.textContent = `
      /* Hide footer only */
      footer {
        display: none !important;
      }
      /* Hide chatbot widget on AI page */
      [class*="chatbot"], [id*="chatbot"], .chatbot-widget,
      .fixed.bottom-6.right-6.z-50 {
        display: none !important;
      }
      /* Ensure main content takes full height */
      main {
        min-height: 100vh !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      body {
        margin: 0 !important;
        padding: 0 !important;
      }
    `;
    document.head.appendChild(style);

    // Cleanup function to restore layout when component unmounts
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Content Area - No custom header, using main site header */}
      <div className="min-h-screen">
        <CropDiseaseClient />
      </div>
    </div>
  );
}
