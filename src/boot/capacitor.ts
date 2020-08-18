import { defineCustomElements } from '@ionic/pwa-elements/loader'
import { boot } from 'quasar/wrappers';

export default boot(() => {
  defineCustomElements(window)
});
