'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

import { useTranslation } from '@/i18n/client';
import { localePath, type LocaleTypes } from '@/i18n/settings';
import Login from '@/layout/login/login';
import menuData from '@/layout/header/menuData';
import LanguageSwitcher from '@/components/language-switcher';
import ThemeSwitcher from '@/components/theme-switcher';

export default function Header() {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, 'common');
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const isMenuActive = (path: string) => {
    return pathname === localePath(locale, path);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleStickyNavbar = () => setSticky(window.scrollY >= 40);

    window.addEventListener('scroll', handleStickyNavbar);

    return () => window.removeEventListener('scroll', handleStickyNavbar);
  }, []);

  return (
    <header
      className={`header sticky top-0 left-0 z-40 flex w-full items-center ${
        sticky || showMobileMenu
          ? 'shadow-sticky dark:bg-gray-dark/80 dark:shadow-sticky-dark bg-white/80 backdrop-blur-sm transition duration-300'
          : 'bg-transparent'
      }`}
    >
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <Link href={localePath(locale, '')} className="mr-2 inline-flex shrink-0 items-center p-2 sm:mr-4">
            <span className="text-xl font-bold tracking-wide text-black uppercase dark:text-white">WONRIAL</span>
          </Link>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-1 pr-2 sm:gap-2 sm:pr-4 lg:gap-0">
            {/* Below lg the menu is a dropdown panel under the header row, so it never squeezes the controls. */}
            <nav
              id="main-menu"
              className={`${
                showMobileMenu ? 'block' : 'hidden'
              } dark:bg-gray-dark shadow-sticky absolute top-full right-0 left-0 bg-white px-4 py-2 lg:static lg:ml-auto lg:block lg:bg-transparent lg:p-0 lg:shadow-none dark:lg:bg-transparent`}
            >
              <ul className="block lg:flex lg:space-x-12">
                {menuData.map((menuItem) => (
                  <li key={menuItem.id} className="group relative">
                    <Link
                      href={localePath(locale, menuItem.path)}
                      onClick={() => setShowMobileMenu(false)}
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

            <Login />

            <ThemeSwitcher />

            <LanguageSwitcher />

            <button
              type="button"
              aria-label="menu"
              aria-controls="main-menu"
              aria-expanded={showMobileMenu}
              className="hover:text-primary inline-flex shrink-0 rounded p-2 text-black outline-none lg:hidden dark:text-white"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <GiHamburgerMenu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
