'use client';

import { ChangeEvent } from 'react';
import { useRouter, useParams, useSelectedLayoutSegments } from 'next/navigation';

import { localePath } from '@/i18n/settings';

const languages = [
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'ru', flag: '🏳️', name: 'Русский' },
  { code: 'uk', flag: '🇺🇦', name: 'Українська' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const params = useParams();
  const urlSegments = useSelectedLayoutSegments();
  const current = languages.find(({ code }) => code === params.locale) ?? languages[0];

  const handleLocaleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;

    // This is used by the Header component which is used in `app/[locale]/layout.tsx` file,
    // urlSegments will contain the segments after the locale.
    // We replace the URL with the new locale and the rest of the segments.
    const path = urlSegments.length ? `/${urlSegments.join('/')}` : '';
    router.push(localePath(newLocale, path));
  };

  // A native select can't shorten its closed label on small screens, so it sits invisibly on top of
  // a label that shows only the language code below `sm`. The opened list keeps the full names.
  return (
    <div className="focus-within:ring-primary relative flex shrink-0 items-center gap-1 rounded px-1 py-2 text-black focus-within:ring-2 dark:text-white">
      <span aria-hidden="true">
        {current.flag} <span className="uppercase sm:hidden">{current.code}</span>
        <span className="hidden sm:inline">{current.name}</span>
      </span>
      <svg aria-hidden="true" width="10" height="6" viewBox="0 0 10 6" className="fill-current">
        <path d="M0 0h10L5 6z" />
      </svg>
      <select
        aria-label="Language"
        onChange={handleLocaleChange}
        value={current.code}
        className="absolute inset-0 cursor-pointer opacity-0"
      >
        {languages.map(({ code, flag, name }) => (
          <option key={code} value={code}>
            {flag} {name}
          </option>
        ))}
      </select>
    </div>
  );
}
