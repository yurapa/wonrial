'use client';

import { ChangeEvent } from 'react';
import { useRouter, useParams, useSelectedLayoutSegments } from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();
  const params = useParams();
  const urlSegments = useSelectedLayoutSegments();

  const handleLocaleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;

    // This is used by the Header component which is used in `app/[locale]/layout.tsx` file,
    // urlSegments will contain the segments after the locale.
    // We replace the URL with the new locale and the rest of the segments.
    router.push(`/${newLocale}/${urlSegments.join('/')}`);
  };

  return (
    <div>
      <select onChange={handleLocaleChange} value={params.locale}>
        <option value="en">&#127468;&#127463; English</option>
        <option value="ru">&#127987;&#65039; Русский</option>
        <option value="ua">&#127482;&#127462; Українська</option>
      </select>
    </div>
  );
}
