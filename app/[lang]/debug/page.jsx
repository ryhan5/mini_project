export default function DebugPage({ params }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Information</h1>
      <div className="bg-gray-100 p-4 rounded">
        <pre>{JSON.stringify(params, null, 2)}</pre>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Test Links:</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><a href="/" className="text-blue-600 hover:underline">/ (root)</a></li>
          <li><a href="/en" className="text-blue-600 hover:underline">/en</a></li>
          <li><a href="/en/home" className="text-blue-600 hover:underline">/en/home</a></li>
          <li><a href="/is" className="text-blue-600 hover:underline">/is (invalid locale)</a></li>
          <li><a href="/en/debug" className="text-blue-600 hover:underline">/en/debug</a></li>
        </ul>
      </div>
    </div>
  );
}
