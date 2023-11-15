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
          className="flex items-center justify-center text-black rounded-full cursor-pointer bg-gray-2 dark:bg-dark-bg h-9 w-9 dark:text-white md:h-12 md:w-12"
        >
          <FaSun className="mx-3" role="button" />
        </button>
      );
    } else {
      return (
        <button
          aria-label="theme toggler"
          onClick={() => setTheme('dark')}
          className="flex items-center justify-center text-black rounded-full cursor-pointer bg-gray-2 dark:bg-dark-bg h-9 w-9 dark:text-white md:h-12 md:w-12"
        >
          <FaMoon className="mx-3" role="button" />
        </button>
      );
    }
  };

  return <>{renderThemeChanger()}</>;
}
