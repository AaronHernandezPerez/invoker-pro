<template>
  <div class="row">
    <div class="col-12 col-sm">
      <q-btn :label="$t('Continue')" color="primary" class="full-width" size="lg" />
    </div>
    <div class="col-12 col-sm">
      <q-btn :label="$t('Restart')" color="danger" class="full-width" size="lg" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ContinueGame',
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
</style>