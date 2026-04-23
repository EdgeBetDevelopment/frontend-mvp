import './index.css';

import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import edgebetLogo from '@/assets/edgebet-logo.png';

import { AuthProvider } from '@/context/AuthContext';
import TanstackQueryProvider from '@/shared/providers/QueryProvider';
import { Toaster } from '@/shared/components/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Edgebet',
  description: 'Transforming sports betting from a game of chance to a data-driven investment strategy',
  openGraph: {
    title: 'Edgebet',
    description: 'Transforming sports betting from a game of chance to a data-driven investment strategy',
    url: 'https://www.edgebet.ai/',
    siteName: 'Edgebet',
    images: [
      {
        url: edgebetLogo.src,
        width: 516,
        height: 160,
      },
    ],
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <head>
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="beforeInteractive"
        />
        <Script
          async
          src="https://cdn.promotekit.com/pk.js"
          data-promotekit="dcfed7d1-a734-43ff-b166-ff98c9c580f6"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative overflow-x-hidden antialiased`}
        suppressHydrationWarning
      >
        <Suspense fallback={<div>Loading...</div>}>
          <TanstackQueryProvider>
            <AuthProvider>
              <div>{children}</div>
              <Toaster />
            </AuthProvider>
          </TanstackQueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
