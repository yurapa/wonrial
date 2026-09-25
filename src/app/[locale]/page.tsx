import { Metadata } from 'next';

import Layout from '@/layout/layout/layout';
import Hero from '@/components/hero';
import Pricing from '@/components/pricing';
import Features from '@/components/features';
import About1 from '@/components/about/about-1';
import About2 from '@/components/about/about-2';
import ReadyToHelp from '@/components/ready-to-help';
import Technologies from '@/components/technologies';
import Testimonials from '@/components/testimonials';
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
      <Features />
      <ReadyToHelp />
      <Technologies />
      <About1 />
      <About2 />
      <Testimonials />
      <Pricing />
    </Layout>
  );
}
