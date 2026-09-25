import { Metadata } from 'next';
import Image from 'next/image';
import cx from 'classnames';

import { createTranslation } from '@/i18n/server';
import Layout from '@/layout/layout/layout';
import { pageMetadata } from '@/utils/seo';

import utilStyles from '@/styles/utils.module.css';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return pageMetadata(locale, 'services');
}

export default async function Services({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { t } = await createTranslation(locale, 'common');

  return (
    <Layout>
      <div className={utilStyles.pageSub}>
        <section className="relative z-10 overflow-hidden pt-28 lg:pt-[80px]">
          <div className="container">
            <div className="-mx-4 flex flex-wrap items-center">
              <div className="w-full px-4 md:w-8/12 lg:w-7/12">
                <div className="mb-8 max-w-[570px] md:mb-0 lg:mb-12">
                  <h1 className="mb-5 text-2xl font-bold text-black sm:text-3xl dark:text-white">
                    {t('services.title')}
                  </h1>
                  <p className="text-body-color text-base leading-relaxed font-medium">{t('services.subTitle')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className={cx(utilStyles.container, utilStyles.container_col)}>
          <div className={cx(utilStyles.col_center, utilStyles.col6)}>
            <Image src="/images/img2.jpg" className={utilStyles.img_rectangle} width={200} height={100} alt="" />
          </div>

          <div className={cx(utilStyles.col_center, utilStyles.col6)}>
            <h3>{t('services.development.title')}</h3>
            <p>{t('services.development.p1')}</p>
            <p>{t('services.development.p2')}</p>
          </div>
        </div>

        <div className={cx(utilStyles.container, utilStyles.container_col)}>
          <div className={cx(utilStyles.col_center, utilStyles.col6)}>
            <h3>{t('services.design.title')}</h3>
            <p>{t('services.design.p1')}</p>
            <p>{t('services.design.p2')}</p>
          </div>

          <div className={cx(utilStyles.container, utilStyles.container_col)}>
            <Image src="/images/img1.jpg" className={utilStyles.img_rectangle} width={200} height={100} alt="" />
          </div>
        </div>

        <div className={cx(utilStyles.container, utilStyles.container_col)}>
          <div className={cx(utilStyles.col_center, utilStyles.col6)}>
            <Image src="/images/img3.jpg" className={utilStyles.img_rectangle} width={200} height={100} alt="" />
          </div>

          <div className={cx(utilStyles.col_center, utilStyles.col6)}>
            <h3>{t('services.payments.title')}</h3>
            <p>{t('services.payments.p1')}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
