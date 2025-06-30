'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark') {
      return (
        <button
          aria-label="theme toggler"
          onClick={() => setTheme('light')}
          className="bg-gray-2 dark:bg-dark-bg flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-black md:h-12 md:w-12 dark:text-white"
        >
          <FaSun className="mx-3" role="button" />
        </button>
      );
    } else {
      return (
        <button
          aria-label="theme toggler"
          onClick={() => setTheme('dark')}
          className="bg-gray-2 dark:bg-dark-bg flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-black md:h-12 md:w-12 dark:text-white"
        >
          <FaMoon className="mx-3" role="button" />
        </button>
      );
    }
  };

  return <>{renderThemeChanger()}</>;
}
