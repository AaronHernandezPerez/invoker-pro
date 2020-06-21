<template>
  <div class="column justify-between">
    <div class="text-center">{{spell.name}}</div>
    <InvokerSpell :spell="spell" />
    <div class="full-width">
      <template v-for="(value,key) in spell.combination">
        <InvokerSpell
          style="width: 33%;"
          v-for="(j) in value"
          :key="j+key"
          :spell="primarySpells[key]"
        />
      </template>
    </div>
    <div class="flex no-wrap items-center justify-around guide full-width">
      <template v-for="(value,key) in spell.combination">
        <span
          v-for="(j) in value"
          :key="j+key"
          :class="primarySpells[key].name"
        >{{primarySpells[key].keybind}}</span>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import InvokerSpell from 'components/invoker/InvokerSpell.vue';
export default Vue.extend({
  name: 'InvokerSpellGuide',
  components: {
    InvokerSpell
  },
  props: {
    spell: {
      type: Object,
      required: true
    },
    primarySpells: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
.guide {
  font-size: 1.5em;
  line-height: 1;
  .Quas {
    color: $quas-color;
  }
  .Wex {
    color: $wex-color;
  }
  .Exort {
    color: $exort-color;
  }
}
</style>