import type { Metadata } from 'next';

import { createTranslation } from '@/i18n/server';
import { defaultLocale, localePath, locales } from '@/i18n/settings';

export const siteUrl = 'https://wonrial.com';

// Pages that exist in every locale. `path` is the locale-free route, '' for the home page.
export const pages = [
  { key: 'home', path: '' },
  { key: 'services', path: '/services' },
  { key: 'ai', path: '/ai' },
  { key: 'contact', path: '/contact' },
] as const;

export type PageKey = (typeof pages)[number]['key'];

const openGraphLocales: Record<string, string> = { en: 'en_GB', ru: 'ru_RU', uk: 'uk_UA' };

// Matches how Next renders a metadata URL against `metadataBase`: the home page has no trailing slash.
export function absoluteUrl(path: string) {
  return path === '/' ? siteUrl : `${siteUrl}${path}`;
}

// Every locale version is its own canonical and lists all versions, itself included, plus
// x-default. Pointing ru/uk canonicals at the English page tells Google they are duplicates.
export function localeAlternates(locale: string, path: string) {
  return {
    canonical: localePath(locale, path),
    languages: {
      ...Object.fromEntries(locales.map((lng) => [lng, localePath(lng, path)])),
      'x-default': localePath(defaultLocale, path),
    },
  };
}

export async function pageMetadata(locale: string, page: PageKey): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'common');
  const { path } = pages.find(({ key }) => key === page)!;
  const alternates = localeAlternates(locale, path);

  return {
    title: t(`meta.${page}.title`),
    description: t(`meta.${page}.description`),
    alternates,
    openGraph: {
      title: t(`meta.${page}.title`),
      description: t(`meta.${page}.description`),
      url: alternates.canonical,
      siteName: 'WONRIAL',
      locale: openGraphLocales[locale],
      type: 'website',
    },
  };
}
