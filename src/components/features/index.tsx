import { createTranslation } from '@/i18n/server';
import { LocaleTypes } from '@/i18n/settings';
import SectionTitle from '../section-title/section-title';
import SingleFeature from './single-feature';
import data from './data';

export default async function Features({ locale }: { locale: LocaleTypes }) {
  const { t } = await createTranslation(locale, 'common');

  return (
    <section id="features" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle title={t('home.features.title')} paragraph={t('home.features.paragraph')} center />

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {data.map(({ id, icon, key }) => (
            <SingleFeature
              key={id}
              icon={icon}
              title={t(`home.features.items.${key}.title`)}
              paragraph={t(`home.features.items.${key}.paragraph`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
