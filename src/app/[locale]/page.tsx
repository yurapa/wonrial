import { Metadata } from 'next';
import Layout from '@/layout/layout/layout';
import Hero from '@/components/hero';
import Features from '@/components/features';
import ReadyToHelp from '@/components/ready-to-help';
import Technologies from '@/components/technologies';
import ScrollUp from '@/components/scroll-to-top/scroll-up';
import About1 from '@/components/about/about-1';
import About2 from '@/components/about/about-2';
import Pricing from '@/components/pricing';
import Testimonials from '@/components/testimonials';

export const metadata: Metadata = {
  title: 'Home page :: Wonrial',
};

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  return (
    <Layout isHomePage>
      <ScrollUp />
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
