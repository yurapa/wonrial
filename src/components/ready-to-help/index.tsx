import Image from 'next/image';

import { createTranslation } from '@/i18n/server';
import { LocaleTypes } from '@/i18n/settings';
import SectionTitle from '../section-title/section-title';

export default async function ReadyToHelp({ locale }: { locale: LocaleTypes }) {
  const { t } = await createTranslation(locale, 'common');

  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title={t('home.readyToHelp.title')}
          paragraph={t('home.readyToHelp.paragraph')}
          center
          mb="80px"
        />

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="wow fadeInUp mx-auto max-w-[770px] overflow-hidden rounded-md" data-wow-delay=".15s">
              <div className="relative aspect-[77/40] items-center justify-center">
                <Image
                  src="/images/ready-to-help.jpg"
                  alt={t('home.readyToHelp.imageAlt')}
                  fill
                  sizes="(max-width: 768px) 100vw, 770px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 left-0 z-[-1] h-full w-full bg-[url(/images/shape.svg)] bg-cover bg-center bg-no-repeat"></div>
    </section>
  );
}
