import { boot } from 'quasar/wrappers';
import messages from 'src/i18n';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { Quasar } from 'quasar';
import i18nCountries from 'i18n-iso-countries';
import i18nCountriesEn from 'i18n-iso-countries/langs/en.json';
import i18nCountriesEs from 'i18n-iso-countries/langs/es.json';

i18nCountries.registerLocale(i18nCountriesEn);
i18nCountries.registerLocale(i18nCountriesEs);

import CountryFlag from 'vue-country-flag';
Vue.component('country-flag', CountryFlag);

declare module 'vue/types/vue' {
  interface Vue {
    i18n: VueI18n;
  }
}

Vue.use(VueI18n);

// const quasarTotalLanguages = QUASAR_SUPPORTED_LANGUAGES; // Data given from webpack
const supportedLanguages: { [index: string]: { [index: string]: string } } = {
  en: { quasarLang: 'en-us', name: 'English' },
  es: { quasarLang: 'es', name: 'Spanish' }
};
const appLanguages = Object.keys(supportedLanguages);
Vue.prototype.$supportedLanguages = appLanguages;
export const defaultLanguage = 'en';

export function getBrowserLanguage() {
  const lang = Quasar.lang
    .getLocale()
    .split('-')
    .shift();
  if (appLanguages.includes(lang)) {
    return lang;
  }

  return defaultLanguage;
}

export function validLanguage(lang: string) {
  return appLanguages.includes(lang);
}

export const i18n = new VueI18n({
  locale: defaultLanguage,
  fallbackLocale: defaultLanguage,
  messages
});

export function changeLanguage(language: string) {
  if (language === i18n.locale) {
    return true;
  }
  if (!supportedLanguages[language]) {
    return false;
  }
  // Setting quasar languages
  i18n.locale = language;
  const qLang = supportedLanguages[language].quasarLang;
  import(
    /* webpackInclude: /(es|en-us)\.js$/ */
    'quasar/lang/' + qLang
  )
    .then(lang => {
      Quasar.lang.set(lang.default);
    })
    .catch(error => {
      console.error('Cant find qLang for', qLang, error);
      // @ts-ignore
      Quasar.lang.set(import('quasar/lang/en-us').default);
    });

  return true
}

export default boot(({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n;
});


// Change to original language
changeLanguage(getBrowserLanguage());