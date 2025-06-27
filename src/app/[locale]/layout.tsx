import { ReactNode } from 'react';
import { Metadata } from 'next';
import { dir } from 'i18next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

import { Providers } from '@/app/providers';
import Header from '@/layout/header';
import Footer from '@/layout/footer';
import ScrollToTop from '@/components/scroll-to-top';
import { TopBanner } from '@/components/top-banner';

import '@/styles/normalize.css';
import '@/styles/global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WONRIAL',
  description: 'WONRIAL ENTERPRISES LTD official web-sait',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <TopBanner />
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
          <div id="modal-root" />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
