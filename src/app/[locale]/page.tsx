import { Metadata } from 'next';
import Image from 'next/image';
import cx from 'classnames';

import { createTranslation } from '@/i18n/server';
import Layout from '@/layout/layout/layout';
import { Button } from '@/components/button';
import Hero from '@/components/hero';
import ScrollUp from '@/components/scroll-to-top/scroll-up';

import utilStyles from '@/styles/utils.module.css';

export const metadata: Metadata = {
  title: 'Home page :: Wonrial',
};

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await createTranslation(locale, 'common');

  return (
    <Layout isHomePage>
      <ScrollUp />
      <Hero locale={locale} />

      <h2>{t('about.title')}</h2>

      <div className={cx(utilStyles.container, utilStyles.container_col)}>
        <div className={cx(utilStyles.col_center, utilStyles.col4)}>
          <Image
            src="/images/img2.jpg"
            alt="Technical Experience"
            width={200}
            height={200}
            className={utilStyles.img_circle}
          />
          <h3>Technical Experience</h3>
          <p>
            We are well-versed in a variety of operating systems, networks, and databases. We work with just about any
            technology that a small business would encounter. We use this expertise to help customers with small to
            mid-sized projects.
          </p>
          <Button.$ link="/contact" label="Book online" />
        </div>

        <div className={cx(utilStyles.col_center, utilStyles.col4)}>
          <Image src="/images/img1.jpg" alt="High ROI" width={200} height={200} className={utilStyles.img_circle} />
          <h3>High ROI</h3>
          <p>
            Do you spend most of your IT budget on maintaining your current system? Many companies find that constant
            maintenance eats into their budget for new technology. By outsourcing your IT management to us, you can
            focus on what you do best--running your business.
          </p>
          <Button.$ link="/services" label="See Services" />
        </div>

        <div className={cx(utilStyles.col_center, utilStyles.col4)}>
          <Image
            src="/images/img3.jpg"
            alt="Satisfaction Guaranteed"
            width={200}
            height={200}
            className={utilStyles.img_circle}
          />
          <h3>Satisfaction Guaranteed</h3>
          <p>
            The world of technology can be fast-paced and scary. That&apos;s why our goal is to provide an experience
            that is tailored to your company&apos;s needs. No matter the budget, we pride ourselves on providing
            professional customer service. We guarantee you will be satisfied with our work.
          </p>
          <Button.$ link="/contact" label="Contact Us" />
        </div>
      </div>
    </Layout>
  );
}
