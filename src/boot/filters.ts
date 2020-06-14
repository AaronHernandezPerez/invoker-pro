import Vue from 'vue';
import i18nCountries from 'i18n-iso-countries';

Vue.filter('translateCountry2', function(value: string) {
  if (!value) return '';
  value = value.toString();

  let name;
  try {
    // @ts-ignore
    name = i18nCountries
      // @ts-ignore
      .getName(value, this.$i18n.locale)
      .split(',')
      .shift()
      .split(' (')
      .shift()
      .split(' (')
      .shift();
  } catch (error) {}

  return name;
});

Vue.filter('formatNumberDot', function(value: string) {
  return parseInt(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
});

Vue.filter('capitalize', function(value: string) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('filterFunc', function(value: string, func: Function) {
  return func(value);
});
