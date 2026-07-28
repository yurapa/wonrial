'use client';

import { useEffect, useState } from 'react';
import i18next, { i18n } from 'i18next';
import { initReactI18next, useTranslation as useTransAlias } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { type LocaleTypes, getOptions, locales } from '@/i18n/settings';

const runsOnServerSide = typeof window === 'undefined';

// Initialize i18next for the client side
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language: LocaleTypes, namespace: string) => import(`./locales/${language}/${namespace}.json`)),
  )
  .init({
    ...getOptions(),
    lng: undefined, // detect the language on the client
    detection: {
      order: ['path', 'htmlTag'],
    },
    preload: runsOnServerSide ? locales : [],
  });

export function useTranslation(lng: LocaleTypes, ns: string) {
  // Binding the language here keeps `t` scoped to this render. Calling
  // changeLanguage() instead would mutate the module-level i18next instance,
  // which the server reuses for every request: the switch resolves too late for
  // the current response and then leaks into the next one, so a request for /ru
  // could be served in English and the request after it in Russian.
  const translator = useTransAlias(ns, { lng });
  const { i18n } = translator;

  if (!runsOnServerSide) {
    // Use our custom implementation when running on client side
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomTranslationImplem(i18n, lng);
  }

  return translator;
}

function useCustomTranslationImplem(i18n: i18n, lng: LocaleTypes) {
  const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);

  // This effect updates the active language state variable when the resolved language changes,
  useEffect(() => {
    if (activeLng === i18n.resolvedLanguage) return;
    setActiveLng(i18n.resolvedLanguage);
  }, [activeLng, i18n.resolvedLanguage]);

  // This effect changes the language of the application when the lng prop changes.
  useEffect(() => {
    if (!lng || i18n.resolvedLanguage === lng) return;
    i18n.changeLanguage(lng);
  }, [lng, i18n]);
}
