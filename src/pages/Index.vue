<template>
  <q-page padding>
    <div class="container">
      <InvokerGame />
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import InvokerGame from 'components/invoker/InvokerGame.vue';
export default Vue.extend({
  name: 'PageIndex',
  components: { InvokerGame },
  data() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
</style>
