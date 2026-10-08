import { Metadata } from 'next';

import Layout from '@/layout/layout/layout';
import Hero from '@/components/hero';
import Features from '@/components/features';
import About1 from '@/components/about/about-1';
import About2 from '@/components/about/about-2';
import ReadyToHelp from '@/components/ready-to-help';
import { ScrollUpDefault } from '@/components/scroll-to-top';
import { pageMetadata } from '@/utils/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return pageMetadata(locale, 'home');
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <Layout isHomePage>
      <ScrollUpDefault />
      <Hero locale={locale} />
      <Features locale={locale} />
      <ReadyToHelp locale={locale} />
      <About1 locale={locale} />
      <About2 locale={locale} />
    </Layout>
  );
}
