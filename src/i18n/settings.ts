import type { InitOptions } from 'i18next';

export const defaultLocale = 'en';
export const locales = [defaultLocale, 'ru', 'uk'];
export type LocaleTypes = (typeof locales)[number];
export const defaultNS = 'common';

// The default locale is served without a prefix - `proxy.ts` redirects `/en/*` to the bare path,
// so linking to `/en/...` would send every visitor and crawler through a redirect.
export function localePath(locale: string, path: string) {
  if (locale === defaultLocale) {
    return path || '/';
  }

  return `/${locale}${path}`;
}

export function getOptions(lng = defaultLocale, ns = defaultNS): InitOptions {
  return {
    // debug: true,
    supportedLngs: locales,
    fallbackLng: defaultLocale,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
