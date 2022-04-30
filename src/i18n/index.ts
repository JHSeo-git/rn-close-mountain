import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import type { LanguageDetectorAsyncModule } from 'i18next';

import en from './en/translation.json';
import ko from './ko/translation.json';

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: cb => cb('en'),
  init: () => {},
  cacheUserLanguage: () => {},
};

export const resources = {
  en: { translation: en },
  ko: { translation: ko },
} as const;

i18n
  //
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    debug: false,
    resources,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
