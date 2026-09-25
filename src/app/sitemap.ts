import { MetadataRoute } from 'next';

import { locales } from '@/i18n/settings';
import { absoluteUrl, localeAlternates, pages } from '@/utils/seo';

// Every locale version gets its own <url> entry: Google only treats ru/uk pages as first-class
// when they are listed, not just referenced as alternates of the English page.
// `lastModified` is left out on purpose - a value that changes on every request teaches Google
// to ignore it.
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path }) =>
    locales.map((locale) => {
      const { canonical, languages } = localeAlternates(locale, path);

      return {
        url: absoluteUrl(canonical),
        alternates: {
          languages: Object.fromEntries(Object.entries(languages).map(([lng, href]) => [lng, absoluteUrl(href)])),
        },
      };
    }),
  );
}
