import { route } from 'quasar/wrappers';
import VueRouter from 'vue-router';
import { StoreInterface } from '../store';
import routes from './routes';
import { validLanguage, changeLanguage, defaultLanguage } from 'boot/i18n';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<StoreInterface>(function({ Vue }) {
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

  Router.beforeResolve((to, from, next) => {
    const { lang } = to.params;

    if (!lang || lang === from.params.lang) {
      next();
      return;
    } else if (validLanguage(lang)) {
      changeLanguage(lang);
      next();
      return;
    } else {
      next({
        path: to.path.replace(lang, defaultLanguage)
      });
      return;
    }
  });

  return Router;
});
