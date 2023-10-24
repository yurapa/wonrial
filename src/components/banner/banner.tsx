import { createTranslation } from '@/i18n/server';
import { LocaleTypes } from '@/i18n/settings';

import styles from './banner.module.scss';

export async function Banner({ locale }: {locale: LocaleTypes}) {
  const { t } = await createTranslation(locale, 'common');

  return (
    <div className={styles.banner}>
      <div className={styles.banner__text}>
        <h1>{t('homePageBanner.title')}</h1>
        <p>{t('homePageBanner.subTitle')}</p>
      </div>
    </div>
  );
}
