import type { InitOptions } from 'i18next';

export const defaultLocale = 'en';
export const locales = [defaultLocale, 'ru', 'ua'];
export type LocaleTypes = (typeof locales)[number];
export const defaultNS = 'common';

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
