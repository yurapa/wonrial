import { Metadata } from 'next';

import '@/styles/normalize.css';
import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'Wonrial',
  description: 'WONRIAL ENTERPRISES LTD official web-sait',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
