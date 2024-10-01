import { Metadata } from 'next';

import { createTranslation } from '@/i18n/server';
import Layout from '@/layout/layout/layout';
import { AIChat } from '@/components/ai/ai-chat';

import utilStyles from '@/styles/utils.module.css';

export const metadata: Metadata = {
  title: 'AI :: Wonrial',
};

export default async function AI({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await createTranslation(locale, 'common');

  return (
    <Layout>
      <section className="relative z-10 overflow-hidden pt-28 lg:pt-[80px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 md:w-8/12 lg:w-7/12">
              <div className="mb-8 max-w-[570px] md:mb-0 lg:mb-12">
                <h1 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-3xl">{t('ai.title')}</h1>
                <p className="text-base font-medium leading-relaxed text-body-color">
                  AI technologies, that we are using.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={utilStyles.container}>
        <AIChat />
      </div>
    </Layout>
  );
}
