import { ReactNode } from 'react';
import { Metadata } from 'next';
import { dir } from 'i18next';
import { Inter } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';

import Header from '@/layout/header';
import Footer from '@/layout/footer';
import { Providers } from '@/app/providers';
import { TopBanner } from '@/components/top-banner';
import { ScrollToTopButton } from '@/components/scroll-to-top';

import '@/styles/normalize.css';
import '@/styles/global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WONRIAL',
  description: 'WONRIAL ENTERPRISES LTD official web-sait',
  metadataBase: new URL('https://www.wonrial.com'),
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isGTM = !!process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang={locale} dir={dir(locale)}>
      {isGTM && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />}
      <body className={inter.className}>
        <Providers>
          <TopBanner />
          <Header />
          {children}
          <Footer />
          <ScrollToTopButton />
          <div id="modal-root" />
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
