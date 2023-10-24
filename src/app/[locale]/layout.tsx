import { ReactNode } from 'react';
import { Metadata } from 'next';
import { dir } from 'i18next';

import Header from '@/layout/header/header';
import Footer from '@/layout/footer/footer';
import { TopBanner } from '@/components/top-banner';

import '@/styles/normalize.css';
import '@/styles/global.css';

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
      <body>
        <TopBanner />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
