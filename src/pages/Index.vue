<template>
  <q-page padding>
    <InvokerGame />
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
  }
});
</script>
