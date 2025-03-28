import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';

import Avatar from '@/assets/icons/avatar.svg';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { AuthProvider } from '@/context/AuthContext';
import TanstackQueryProvider from '@/providers/QueryProvider';
import { ROUTES } from '@/routes';

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
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <AuthProvider>
        <TanstackQueryProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} relative antialiased`}
          >
            <div className="fixed top-9 left-1/2 z-30 w-full max-w-[800px] -translate-x-1/2 transform">
              {/* TEST VERSION */}
              <Link
                className="absolute top-[50%] right-[-15%] translate-[-50%]"
                href={ROUTES.LOGIN}
              >
                <Avatar />
              </Link>
              <Header />
            </div>

            <div className="pt-[142px]">{children}</div>

            <Footer />
          </body>
        </TanstackQueryProvider>
      </AuthProvider>
    </html>
  );
}
