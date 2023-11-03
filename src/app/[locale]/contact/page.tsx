import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { createTranslation } from '@/i18n/server';
import Layout from '@/layout/layout/layout';

import utilStyles from '@/styles/utils.module.css';

export const metadata: Metadata = {
  title: 'Contact Us :: Wonrial',
};

export default async function Contact({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await createTranslation(locale, 'common');

  return (
    <Layout>
        <section className="relative z-10 overflow-hidden pt-28 lg:pt-[80px]">
            <div className="container">
                <div className="-mx-4 flex flex-wrap items-center">
                    <div className="w-full px-4 md:w-8/12 lg:w-7/12">
                        <div className="mb-8 max-w-[570px] md:mb-0 lg:mb-12">
                            <h1 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                                {t('contact.title')}
                            </h1>
                            <p className="text-base font-medium leading-relaxed text-body-color">
                                Our Contacts,
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      <div className={utilStyles.container}>
        <p>
          Let us tailor a service package that meets your needs. Tell us a little about your business, and we will get
          back to you with some ideas as soon as possible.
        </p>
        <h3>WONRIAL</h3>
        <p>Vasili Michailidi, 9, 3026, Limassol, Cyprus</p>
        <h3>Hours</h3>
        <p>
          Mon 09:00 – 17:00 <br />
          Tue 09:00 – 17:00 <br /> Wed 09:00 – 17:00 <br />
          Thu 09:00 – 17:00 <br />
          Fri 09:00 – 17:00 <br />
          Sat Closed <br />
          Sun Closed
        </p>
        <p>
          Monday - Friday: 9am - 5pm <br />
          Saturday - Sunday: Closed
        </p>
      </div>

      <Link href="https://www.google.com/maps?daddr=Vasili+Michailidi,+9,+3026,+Limassol,+Cyprus">
        <Image
          src="/images/map.png"
          alt="Map"
          width={100}
          height={100}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </Link>
    </Layout>
  );
}
