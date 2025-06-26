'use client'

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [response, setResponse] = useState<string>('')
  const [dbResponse, setDbResponse] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [dbLoading, setDbLoading] = useState<boolean>(false)

  const testAPI = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/hello')
      const data = await res.json() as { message: string; timestamp: string; environment: string }
      setResponse(`API Response: ${data.message}\nEnvironment: ${data.environment}\nTime: ${data.timestamp}`)
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const queryTables = async () => {
    setDbLoading(true)
    try {
      const res = await fetch('/api/tables')
      const data = await res.json() as { 
        success: boolean; 
        tables?: string[]; 
        count?: number; 
        error?: string; 
        timestamp: string 
      }
      
      if (data.success && data.tables) {
        setDbResponse(`数据库表查询成功!\n表数量: ${data.count}\n表名列表:\n${data.tables.map((table, index) => `${index + 1}. ${table}`).join('\n')}\n\n查询时间: ${data.timestamp}`)
      } else {
        setDbResponse(`数据库查询失败: ${data.error}\n时间: ${data.timestamp}`)
      }
    } catch (error) {
      setDbResponse(`连接错误: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setDbLoading(false)
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex flex-col gap-4 items-center w-full max-w-md">
          <button
            onClick={testAPI}
            disabled={loading}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 disabled:bg-blue-400 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full"
          >
            {loading ? 'Testing...' : 'Test Hello API'}
          </button>
          
          <button
            onClick={queryTables}
            disabled={dbLoading}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-green-600 text-white gap-2 hover:bg-green-700 disabled:bg-green-400 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full"
          >
            {dbLoading ? '查询中...' : '查询数据库表名'}
          </button>
          
          {response && (
            <div className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">API 测试结果:</h3>
              <pre className="text-sm font-mono break-all whitespace-pre-wrap">{response}</pre>
            </div>
          )}

          {dbResponse && (
            <div className="w-full p-4 bg-green-50 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-700">
              <h3 className="text-sm font-medium mb-2 text-green-700 dark:text-green-300">数据库查询结果:</h3>
              <pre className="text-sm font-mono break-all whitespace-pre-wrap text-green-800 dark:text-green-200">{dbResponse}</pre>
            </div>
          )}
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
