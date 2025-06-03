export default function RouteDebugPage({ params, searchParams }) {
  const { lang } = params;
  
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Route Debugging</h1>
        
        <div className="space-y-6">
          <div className="p-4 border rounded">
            <h2 className="text-lg font-semibold mb-2">Current Route</h2>
            <pre className="bg-gray-100 p-3 rounded overflow-auto">
              {JSON.stringify({
                path: `/${lang}/route-debug`,
                params: { lang },
                searchParams: Object.fromEntries(
                  Object.entries(searchParams).map(([key, value]) => [key, value])
                ),
                timestamp: new Date().toISOString(),
                environment: typeof window !== 'undefined' ? 'client' : 'server'
              }, null, 2)}
            </pre>
          </div>
          
          <div className="p-4 border rounded">
            <h2 className="text-lg font-semibold mb-3">Test Links</h2>
            <div className="space-y-2">
              <div>
                <a href="/" className="text-blue-600 hover:underline">/ (root)</a>
              </div>
              <div>
                <a href="/en" className="text-blue-600 hover:underline">/en</a>
              </div>
              <div>
                <a href="/en/home" className="text-blue-600 hover:underline">/en/home</a>
              </div>
              <div>
                <a href="/is" className="text-orange-600 hover:underline">/is (invalid locale)</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
