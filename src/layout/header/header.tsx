'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

import { useTranslation } from '@/i18n/client';
import type { LocaleTypes } from '@/i18n/settings';
import Login from '@/layout/login/login';
import LanguageSwitcher from '@/components/language-switcher/language-switcher';
import ThemeSwitcher from '@/components/theme-switcher/theme-switcher';

export default function Header() {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, 'common');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleClick = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <nav className="sticky top-0 w-full flex items-center flex-wrap bg-gray-800/90 p-3">
      <Link href={`/${locale}`} className="inline-flex items-center p-2 mr-4">
        <span className="text-xl text-white font-bold uppercase tracking-wide">WONRIAL</span>
      </Link>

      <button
        className="inline-flex p-3 hover:bg-grey-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none"
        onClick={handleClick}
      >
        <GiHamburgerMenu size={24} />
      </button>

      <div className={`${showMobileMenu ? '' : 'hidden'} w-full lg:inline-flex lg:flex-grow lg:w-auto`}>
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
          <Link
            href={`/${locale}`}
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-600 hover:text-white "
          >
            {t('nav.home')}
          </Link>
          <Link
            href={`/${locale}/services`}
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-grey-600 hover:text-white"
          >
            {t('nav.services')}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-grey-600 hover:text-white"
          >
            {t('nav.contact')}
          </Link>
        </div>
      </div>

      <Login />

      <ThemeSwitcher />

      <LanguageSwitcher />
    </nav>
  );
}
