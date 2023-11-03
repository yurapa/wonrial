'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

import { useTranslation } from '@/i18n/client';
import type { LocaleTypes } from '@/i18n/settings';
import Login from '@/layout/login/login';
import menuData from '@/layout/header/menuData';
import LanguageSwitcher from '@/components/language-switcher';
import ThemeSwitcher from '@/components/theme-switcher';

export default function Header() {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, 'common');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleClick = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const isMenuActive = (path: string) => {
    return usePathName === `${path}` || usePathName === `/${path}` || usePathName === `/${locale}${path}`;
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 40) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleStickyNavbar);
  });

  const usePathName = usePathname();

  return (
    <header
      className={`header sticky left-0 top-0 z-40 flex w-full items-center ${
        sticky
          ? 'dark:bg-gray-dark dark:shadow-sticky-dark  bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition duration-300'
          : 'bg-transparent'
      }`}
    >
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          {/*<nav className="sticky top-0 w-full flex items-center flex-wrap bg-gray-800/90 p-3">*/}
          <Link href={`/${locale}`} className="inline-flex items-center p-2 mr-4">
            <span className="text-xl text-black dark:text-white font-bold uppercase tracking-wide">WONRIAL</span>
          </Link>

          <div className="flex w-full items-center justify-between px-4">
            <button
              className="inline-flex p-3 hover:bg-grey-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none"
              onClick={handleClick}
            >
              <GiHamburgerMenu size={24} />
            </button>

            <div className={`${showMobileMenu ? '' : 'hidden'} w-full lg:inline-flex lg:flex-grow lg:w-auto`}>
              <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
                <nav>
                  <ul className="block lg:flex lg:space-x-12">
                    {menuData.map((menuItem, index) => (
                      <li key={index} className="group relative">
                        <Link
                          href={`/${locale}${menuItem.path}`}
                          className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                            isMenuActive(menuItem.path)
                              ? 'text-primary dark:text-white'
                              : 'text-dark hover:text-primary dark:text-white/70 dark:hover:text-white'
                          }`}
                        >
                          {t(menuItem.title)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            <Login />

            <ThemeSwitcher />

            <LanguageSwitcher />
            {/*</nav>*/}
          </div>
        </div>
      </div>
    </header>
  );
}
