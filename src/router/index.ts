import { route } from 'quasar/wrappers';
import VueRouter from 'vue-router';
import { StoreInterface } from '../store';
import routes from './routes';
import { validLanguage, changeLanguage, defaultLanguage, i18n } from 'boot/i18n';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<StoreInterface>(function ({ Vue }) {
  Vue.use(VueRouter);

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  Router.beforeEach((to, from, next) => {
    const { lang } = to.params

    if (!lang) {
      if (to.name === 'index') {
        if (i18n.locale !== defaultLanguage) {
          // Force language paramter for all but the default language
          return next({ name: to.name, params: { lang: i18n.locale } })
        } else {
          console.log('this is the default language ')
        }
      }
    }
    else if (!validLanguage(lang)) {
      // Changes language
      return next({ name: to.name, params: { lang: i18n.locale } });
    } else {
      changeLanguage(lang)
      if (to.name === 'index' && i18n.locale === defaultLanguage) {
        next({ name: to.name })
      }
    }

    next()
  })

  return Router;
});
