<template>
  <div>
    <div class="flex justify-center"></div>
    <div class="flex items-strech q-mb-md justify-around q-gutter-x-sm">
      <InvokerSpellGuide
        class="spell-guide"
        :spell="InvokerSpells['coldSnap']"
        :primarySpells="InvokerPrimarySpells"
      />
    </div>
    <div class="flex items-strech q-mb-md justify-around q-gutter-x-sm">
      <InvokerSpellGuide
        class="spell-guide"
        :spell="InvokerSpells['ghostWalk']"
        :primarySpells="InvokerPrimarySpells"
      />
      <InvokerSpellGuide
        class="spell-guide"
        :spell="InvokerSpells['iceWall']"
        :primarySpells="InvokerPrimarySpells"
      />
    </div>
    <div class="flex items-strech q-mb-md justify-around q-gutter-x-sm">
      <InvokerSpellGuide
        class="spell-guide"
        :spell="InvokerSpells['tornado']"
        :primarySpells="InvokerPrimarySpells"
      />
      <InvokerSpellGuide
        class="spell-guide"
        :spell="InvokerSpells['deafeningBlast']"
        :primarySpells="InvokerPrimarySpells"
      />
      <InvokerSpellGuide
        class="spell-guide"
        :spell="InvokerSpells['forgeSpirit']"
        :primarySpells="InvokerPrimarySpells"
      />
    </div>
    <div class="flex items-strech q-mb-md justify-around q-gutter-x-sm">
      <InvokerSpellGuide
        class="spell-guide"
        :spell="InvokerSpells['emp']"
        :primarySpells="InvokerPrimarySpells"
      />
      <InvokerSpellGuide
        class="spell-guide"
        :spell="InvokerSpells['alacrity']"
        :primarySpells="InvokerPrimarySpells"
      />
      <InvokerSpellGuide
        class="spell-guide"
        :spell="InvokerSpells['chaosMeteor']"
        :primarySpells="InvokerPrimarySpells"
      />
      <InvokerSpellGuide
        class="spell-guide"
        :spell="InvokerSpells['sunStrike']"
        :primarySpells="InvokerPrimarySpells"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InvokerSpellGuide from 'components/invoker/InvokerSpellGuide.vue';

export default Vue.extend({
  name: 'InvokerGuide',
  components: {
    InvokerSpellGuide
  },
  props: {
    InvokerSpells: { type: Object, required: true },
    InvokerPrimarySpells: { type: Object, required: true }
  }
});
</script>

<style lang="scss" scoped>
.spell-guide {
  width: 20%;
  max-width: 4.5vw;
  min-width: 50px;
}
</style>