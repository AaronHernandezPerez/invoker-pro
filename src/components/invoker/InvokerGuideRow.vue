<template>
  <div class="full-width">
    <div class="row justify-center q-col-gutter-xs">
      <div class="col-3 text-center" v-for="spell in spells" :key="spell.name" :title="spell.name">
        <div class="ellipsis" v-for="(e, i) in spell.name.split(' ')" :key="i">{{e}}</div>
      </div>
    </div>
    <div class="row justify-center q-col-gutter-xs">
      <div class="col-3 flex justify-center" v-for="spell in spells" :key="spell.name">
        <InvokerGuideSpell
          class="spell-guide"
          :spell="spell"
          :primarySpells="InvokerPrimarySpells"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  CombinedSpellType,
  InvokerPrimarySpells,
} from 'src/components/invoker/Spells.ts';
import InvokerGuideSpell from 'components/invoker/InvokerGuideSpell.vue';

export default Vue.extend({
  name: '',
  components: {
    InvokerGuideSpell,
  },
  props: {
    spells: Array as () => CombinedSpellType[],
  },
  data() {
    return {
      InvokerPrimarySpells,
    };
  },
});
</script>

<style lang="scss" scoped>
// .spell-guide {
//   width: 30%;
//   max-width: 4.5vw;
//   min-width: 50px;
// }
</style>