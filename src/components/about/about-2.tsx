import Image from 'next/image';

import { createTranslation } from '@/i18n/server';
import { LocaleTypes } from '@/i18n/settings';

const steps = ['discovery', 'development', 'launch'];

export default async function About2({ locale }: { locale: LocaleTypes }) {
  const { t } = await createTranslation(locale, 'common');

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src="/images/about/about-image-2.svg"
                alt=""
                fill
                className="drop-shadow-three dark:hidden dark:drop-shadow-none"
              />
              <Image
                src="/images/about/about-image-2-dark.svg"
                alt=""
                fill
                className="drop-shadow-three hidden dark:block dark:drop-shadow-none"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
              {steps.map((step, index) => (
                <div key={step} className={index === steps.length - 1 ? 'mb-1' : 'mb-9'}>
                  <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl dark:text-white">
                    {t(`home.howWeWork.${step}.title`)}
                  </h3>
                  <p className="text-body-color text-base leading-relaxed font-medium sm:text-lg sm:leading-relaxed">
                    {t(`home.howWeWork.${step}.paragraph`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
