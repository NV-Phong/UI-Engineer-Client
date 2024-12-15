'use client'

import dynamic from 'next/dynamic'

const OnlineCodeEditor = dynamic(() => import('./OnlineCodeEditor'), { ssr: false })

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <OnlineCodeEditor />
    </main>
  );
}

