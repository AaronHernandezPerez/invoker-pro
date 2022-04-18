import { Quasar, LocalStorage } from 'quasar';
import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

import messages from 'src/i18n';

const supportedLanguages: { [index: string]: { [index: string]: string } } = {
  en: { quasarLang: 'en-US', name: 'English' },
  es: { quasarLang: 'es', name: 'Spanish' },
};
export const appLanguages = Object.keys(supportedLanguages);
export const defaultLanguage = 'en';

export function getBrowserLanguage() {
  const lang = Quasar.lang.getLocale()?.split('-').shift();
  if (lang && appLanguages.includes(lang)) {
    return lang;
  }

  return defaultLanguage;
}

export function validLanguage(lang: string) {
  return appLanguages.includes(lang);
}

const i18n = createI18n({
  locale: defaultLanguage,
  fallbackLocale: defaultLanguage,
  messages,
});

export function changeLanguage(language: string) {
  if (language === i18n.global.locale) {
    return true;
  }
  if (!supportedLanguages[language]) {
    return false;
  }
  // Setting quasar languages
  i18n.global.locale = language;
  const qLang = supportedLanguages[language].quasarLang;
  import(
    /* webpackInclude: /(es|en-US)\.js$/ */
    'quasar/lang/' + qLang
  )
    .then((lang) => {
      Quasar.lang.set(lang.default);
    })
    .catch((error) => {
      console.error('Cant find qLang for', qLang, error);
      // @ts-ignore
      Quasar.lang.set(import('quasar/lang/en-US').default);
    });

  LocalStorage.set('language', language);
  return true;
}

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n);
});
