<template>
  <div>
    <div v-if="gameMode"></div>
    <p class="press-key">{{$t('Press any key to start')}}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'StartPlaceHolder',
  props: {
    gameMode: {
      type: String as () => string,
    },
  },
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@keyframes fade {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}

.press-key {
  animation: fade 4s ease infinite;
}
</style>