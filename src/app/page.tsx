'use client'

import { useState } from "react";

export default function Page() {
  const [tables, setTables] = useState<string[]>([]);
  const [d1Tables, setD1Tables] = useState<string[]>([]);
  const [apiResponse, setApiResponse] = useState<string>("");
  const [pgLoading, setPgLoading] = useState(false);
  const [d1Loading, setD1Loading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [pgError, setPgError] = useState<string | null>(null);
  const [d1Error, setD1Error] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const testAPI = async () => {
    setApiLoading(true);
    setApiError(null);
    setApiResponse("");
    try {
      const res = await fetch("/api/hello");
      const data = await res.json() as { message: string; timestamp: string; environment: string };
      setApiResponse(`API Response: ${data.message}\nEnvironment: ${data.environment}\nTime: ${data.timestamp}`);
    } catch (e) {
      if (e instanceof Error) {
        setApiError(e.message);
      } else {
        setApiError("An unknown error occurred");
      }
    } finally {
      setApiLoading(false);
    }
  };

  const fetchTables = async () => {
    setPgLoading(true);
    setPgError(null);
    setTables([]);
    try {
      const res = await fetch("/api/tables");
      if (!res.ok) {
        const err: { error?: string } = await res.json();
        throw new Error(err.error || "Failed to fetch tables");
      }
      const data: { tables: string[] } = await res.json();
      setTables(data.tables);
    } catch (e) {
      if (e instanceof Error) {
        setPgError(e.message);
      } else {
        setPgError("An unknown error occurred");
      }
    } finally {
      setPgLoading(false);
    }
  };

  const fetchD1Tables = async () => {
    setD1Loading(true);
    setD1Error(null);
    setD1Tables([]);
    try {
      const res = await fetch("/api/d1");
      if (!res.ok) {
        const err: { error?: string } = await res.json();
        throw new Error(err.error || "Failed to fetch D1 tables");
      }
      const data: { tables: string[] } = await res.json();
      setD1Tables(data.tables);
    } catch (e) {
      if (e instanceof Error) {
        setD1Error(e.message);
      } else {
        setD1Error("An unknown error occurred");
      }
    } finally {
      setD1Loading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          OpenNext on Cloudflare
        </h1>
        
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {/* Hello API Test Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Hello API
              </h2>
            </div>
            
            <button
              onClick={testAPI}
              disabled={apiLoading}
              className="w-full px-4 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white font-medium rounded-md transition-colors duration-200 mb-4"
            >
              {apiLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Testing...
                </div>
              ) : (
                "Test Hello API"
              )}
            </button>

            {/* API Results */}
            <div className="min-h-[100px]">
              {apiError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                  <p className="text-red-600 dark:text-red-400 text-sm font-medium">Error:</p>
                  <p className="text-red-700 dark:text-red-300 text-sm">{apiError}</p>
                </div>
              )}
              
              {apiResponse && (
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-md p-3">
                  <p className="text-purple-600 dark:text-purple-400 text-sm font-medium mb-2">
                    ✅ API Response:
                  </p>
                  <pre className="text-purple-700 dark:text-purple-300 text-xs whitespace-pre-wrap font-mono">
                    {apiResponse}
                  </pre>
                </div>
              )}
              
              {!apiLoading && !apiError && !apiResponse && (
                <div className="text-gray-500 dark:text-gray-400 text-sm text-center py-8">
                  Click the button above to test the API
                </div>
              )}
            </div>
          </div>

          {/* Postgres Test Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                PostgreSQL (Hyperdrive)
              </h2>
            </div>
            
            <button
              onClick={fetchTables}
              disabled={pgLoading}
              className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium rounded-md transition-colors duration-200 mb-4"
            >
              {pgLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Testing...
                </div>
              ) : (
                "Test Postgres Connection"
              )}
            </button>

            {/* Postgres Results */}
            <div className="min-h-[100px]">
              {pgError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                  <p className="text-red-600 dark:text-red-400 text-sm font-medium">Error:</p>
                  <p className="text-red-700 dark:text-red-300 text-sm">{pgError}</p>
                </div>
              )}
              
              {tables.length > 0 && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-3">
                  <p className="text-green-600 dark:text-green-400 text-sm font-medium mb-2">
                    ✅ Connected! Found {tables.length} tables:
                  </p>
                  <ul className="space-y-1 max-h-32 overflow-y-auto">
                    {tables.map((table) => (
                      <li key={table} className="text-green-700 dark:text-green-300 text-sm px-2 py-1 bg-green-100 dark:bg-green-800/30 rounded">
                        {table}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {!pgLoading && !pgError && tables.length === 0 && (
                <div className="text-gray-500 dark:text-gray-400 text-sm text-center py-8">
                  Click the button above to test the connection
                </div>
              )}
            </div>
          </div>

          {/* D1 Test Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Cloudflare D1
              </h2>
            </div>
            
            <button
              onClick={fetchD1Tables}
              disabled={d1Loading}
              className="w-full px-4 py-3 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-medium rounded-md transition-colors duration-200 mb-4"
            >
              {d1Loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Testing...
                </div>
              ) : (
                "Test D1 Connection"
              )}
            </button>

            {/* D1 Results */}
            <div className="min-h-[100px]">
              {d1Error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                  <p className="text-red-600 dark:text-red-400 text-sm font-medium">Error:</p>
                  <p className="text-red-700 dark:text-red-300 text-sm">{d1Error}</p>
                </div>
              )}
              
              {d1Tables.length > 0 && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-3">
                  <p className="text-green-600 dark:text-green-400 text-sm font-medium mb-2">
                    ✅ Connected! Found {d1Tables.length} tables:
                  </p>
                  <ul className="space-y-1 max-h-32 overflow-y-auto">
                    {d1Tables.map((table) => (
                      <li key={table} className="text-green-700 dark:text-green-300 text-sm px-2 py-1 bg-green-100 dark:bg-green-800/30 rounded">
                        {table}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {!d1Loading && !d1Error && d1Tables.length === 0 && (
                <div className="text-gray-500 dark:text-gray-400 text-sm text-center py-8">
                  Click the button above to test the connection
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
