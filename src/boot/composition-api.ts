import VueCompositionApi from '@vue/composition-api';
import { boot } from 'quasar/wrappers';

export default boot(({ Vue }) => {
  Vue.use(VueCompositionApi);
});

import Vue from 'vue'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(Vue2TouchEvents)