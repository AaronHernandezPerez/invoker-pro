<template>
  <div class="q-pa-md">
    <div class="flex no-wrap items-center">
      <InvokerSpell :spell="spell" class="spell-icon" />
      <p class="q-pl-md q-mb-none">{{ $t(translateKey) }}</p>
    </div>
    <div class="q-mt-md">
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InvokerSpell from 'src/components/invoker/InvokerSpell.vue';
import {
  PrimarySpellType,
  CombinedSpellType,
} from 'src/components/invoker/Spells.ts';

export default Vue.extend({
  name: 'AbilityShowcase',
  components: {
    InvokerSpell,
  },
  props: {
    spell: Object as () => PrimarySpellType | CombinedSpellType,
    keySpell: String as () => string,
  },
  data() {
    return {};
  },
  computed: {
    translateKey() {
      return `invoker.ability_explanations.${this.keySpell}`;
    },
  },
});
</script>

<style lang="scss" scoped>
.spell-icon {
  max-width: 100px;
}
</style>