<template>
  <q-select class="lang-selector" v-model="selectedCountry" :options="countries" color="primary" dense
    options-selected-class="text-deep-orange">
    <template v-slot:selected>
      <q-item dense square>
        <q-item-section>
          <q-item-label v-html="selectedCountry.label" />
        </q-item-section>
      </q-item>
    </template>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label v-html="scope.opt.label" />
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouteLocationRaw } from 'vue-router';

import { changeLanguage, defaultLanguage } from 'boot/i18n';

export default defineComponent({
  name: 'LanguageSelector',
  components: {
  },
  data() {
    interface CountryType {
      value: string;
      label: string;
    }
    const countries: Array<CountryType> = [
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Español' }
    ];
    const selectedCountry = countries.find(
      (e: CountryType) => e.value === this.$i18n.locale
    );
    return {
      countries,
      selectedCountry
    };
  },
  watch: {
    selectedCountry(newV) {
      changeLanguage(newV.value);
      const route = this.$route;

      let lang = newV.value;
      if (route.name === 'index' && newV.value === defaultLanguage) {
        lang = '';
      }

      if (route.name) {
        const newRoute: RouteLocationRaw = {
          name: route.name,
          params: { lang: lang }
        };
        this.$router.replace(newRoute).catch();
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.lang-selector {
  max-width: 200px;
}
</style>
