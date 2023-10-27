'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/i18n/client';
import type { LocaleTypes } from '@/i18n/settings';
import LanguageSwitcher from '@/components/language-switcher/language-switcher';
import Login from '@/layout/login/login';

import styles from './header.module.scss';

export default function Header() {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, 'common');

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Link href={`/${locale}`}>WONRIAL</Link>
      </div>

      <nav className={styles.header__nav} role="navigation">
        <ul>
          <li>
            <Link href={`/${locale}`}>{t('nav.home')}</Link>
          </li>
          <li>
            <Link href={`/${locale}/services`}>{t('nav.services')}</Link>
          </li>
          <li>
            <Link href={`/${locale}/contact`}>{t('nav.contact')}</Link>
          </li>
        </ul>
      </nav>

      <Login />

      <LanguageSwitcher />
    </header>
  );
}
