import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_API || 'http://localhost:3000'),
  title: 'e commerce',
  description: 'applikasi e commerce',
  authors: [{
    name: 'lail',
    url: process.env.NEXT_PUBLIC_API
  }],
  icons: {
    icon: '/OIP.jpg'
  },
  openGraph: {
  title: 'e commerce',
  }
}

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      hellow world
    </div>
  );
}
