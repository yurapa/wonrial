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
      return <FaSun className="mx-3 text-yellow-500 " role="button" onClick={() => setTheme('light')} />;
    } else {
      return <FaMoon className="mx-3 text-gray-100 " role="button" onClick={() => setTheme('dark')} />;
    }
  };

  return <>{renderThemeChanger()}</>;
}
