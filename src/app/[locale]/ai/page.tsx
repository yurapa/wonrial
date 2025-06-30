import { Metadata } from 'next';

import { createTranslation } from '@/i18n/server';
import Layout from '@/layout/layout/layout';
import { AIChat } from '@/components/ai';

import utilStyles from '@/styles/utils.module.css';

export const metadata: Metadata = {
  title: 'AI ChatBot :: Wonrial',
  description:
    'Here you can chat with our AI to get answers to your questions. If you have any questions, feel free to ask',
  alternates: {
    canonical: '/ai',
    languages: {
      'ru': '/ru/ai',
      'uk': '/uk/ai',
    },
  },
};

export default async function AI({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { t } = await createTranslation(locale, 'common');
  const isAI = !!process.env.GROQ_API_KEY;

  return (
    <Layout>
      <section className="relative z-10 overflow-hidden pt-28 lg:pt-[80px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 md:w-8/12 lg:w-7/12">
              <div className="mb-8 max-w-[570px] md:mb-0 lg:mb-12">
                <h1 className="mb-5 text-2xl font-bold text-black sm:text-3xl dark:text-white">{t('ai.title')}</h1>
                <p className="text-body-color text-base leading-relaxed font-medium">{t('ai.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={utilStyles.container}>{isAI ? <AIChat /> : <h2>For registered users only</h2>}</div>
    </Layout>
  );
}
