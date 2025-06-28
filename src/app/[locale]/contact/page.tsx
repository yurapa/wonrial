import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { createTranslation } from '@/i18n/server';
import Layout from '@/layout/layout/layout';
import ContactInfo from '@/components/contact/contact-info';

export const metadata: Metadata = {
  title: 'Contact Us :: Wonrial',
};

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { t } = await createTranslation(locale, 'common');

  return (
    <Layout>
      <section className="relative z-10 overflow-hidden pt-28 lg:pt-[80px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 md:w-8/12 lg:w-7/12">
              <div className="mb-8 max-w-[570px] md:mb-0 lg:mb-12">
                <h1 className="mb-5 text-2xl font-bold text-black sm:text-3xl dark:text-white">{t('contact.title')}</h1>
                <p className="text-body-color text-base leading-relaxed font-medium">Our Contacts,</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
              <div
                className="wow fadeInUp shadow-three dark:bg-gray-dark mb-12 rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                data-wow-delay=".15s
              "
              >
                <h2 className="mb-3 text-2xl font-bold text-black sm:text-3xl lg:text-2xl xl:text-3xl dark:text-white">
                  Need Help? Open a Ticket
                </h2>
                <p className="text-body-color mb-12 text-base font-medium">
                  Our support team will get back to you ASAP via email.
                </p>
                <form>
                  <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label htmlFor="name" className="text-dark mb-3 block text-sm font-medium dark:text-white">
                          Your Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your name"
                          className="border-stroke text-body-color focus:border-primary dark:text-body-color-dark dark:shadow-two dark:focus:border-primary w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base outline-none dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label htmlFor="email" className="text-dark mb-3 block text-sm font-medium dark:text-white">
                          Your Email
                        </label>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="border-stroke text-body-color focus:border-primary dark:text-body-color-dark dark:shadow-two dark:focus:border-primary w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base outline-none dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="mb-8">
                        <label htmlFor="message" className="text-dark mb-3 block text-sm font-medium dark:text-white">
                          Your Message
                        </label>
                        <textarea
                          name="message"
                          rows={5}
                          placeholder="Enter your Message"
                          className="border-stroke text-body-color focus:border-primary dark:text-body-color-dark dark:shadow-two dark:focus:border-primary w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base outline-none dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                        ></textarea>
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <button className="bg-primary shadow-submit hover:bg-primary/90 dark:shadow-submit-dark rounded-sm px-9 py-4 text-base font-medium text-white duration-300">
                        Submit Ticket
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      <Link href="https://www.google.com/maps?daddr=Vasili+Michailidi,+9,+3026,+Limassol,+Cyprus">
        <Image
          src="/images/map.png"
          alt="Map"
          width={100}
          height={100}
          sizes="100vw"
          priority
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </Link>
    </Layout>
  );
}
