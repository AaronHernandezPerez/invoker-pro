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
<style lang="scss" scoped>
html {
  animation-duration: 3s;
  animation-name: example;
  animation-iteration-count: infinite;
}

@keyframes example {
  from {
    // filter: none;
    font-size: 0.1em;
  }
  to {
    // filter: invert(1);
    font-size: 100em;
  }
}

.flex .justify-center {
  text-align: center;

  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Internet Explorer */
@-ms-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Opera < 12.1 */
@-o-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
