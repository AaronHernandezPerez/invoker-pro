<template>
  <q-page class="row items-center justify-evenly">
    <h1>about</h1>
    <h2>{{ $route.params.lang }}</h2>
    <h3>{{ $i18n.locale }}</h3>
    <p>lorem*100</p>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'PageAbout',
  data() {
    return {};
  },
});
</script>
