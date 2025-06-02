'use client';

import { languages } from '@/config/languages';

export default function TestPageClient({ lang }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Test Page</h1>
        <div className="space-y-4">
          <div className="p-4 border rounded">
            <h2 className="font-semibold mb-2">Current Language:</h2>
            <p className="text-lg">{lang} - {languages.find(l => l.code === lang)?.name}</p>
          </div>
          <div className="p-4 border rounded">
            <h2 className="font-semibold mb-2">Test Links:</h2>
            <div className="space-y-2">
              {languages.map((language) => (
                <p key={language.code}>
                  <a 
                    href={`/${language.code}/test`} 
                    className={`text-blue-600 hover:underline ${language.code === lang ? 'font-bold' : ''}`}
                  >
                    {language.flag} {language.name} Test Page
                  </a>
                </p>
              ))}
              <p>
                <a href="/invalid-lang/test" className="text-red-600 hover:underline">
                  Test Invalid Language (should redirect)
                </a>
              </p>
            </div>
          </div>
          <div className="p-4 border rounded">
            <h2 className="font-semibold mb-2">Navigation:</h2>
            <div className="space-y-2">
              <p>
                <a 
                  href={`/${lang}/home`} 
                  className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Back to Home
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
