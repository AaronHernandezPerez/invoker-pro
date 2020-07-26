<template>
  <div>
    <div class="flex justify-center q-mb-lg">
      <q-btn
        round
        color="primary"
        :icon="guideVisible ? 'fas fa-eye-slash': 'fas fa-eye'"
        @click="guideVisible = !guideVisible"
      />
    </div>
    <div class="guide-container" :class="{ 'guide-hidden': !guideVisible }">
      <div class="flex items-strech q-mb-md justify-around q-gutter-x-sm">
        <InvokerSpellGuide
          class="spell-guide"
          :spell="InvokerCombinedSpells['coldSnap']"
          :primarySpells="InvokerPrimarySpells"
        />
      </div>
      <div class="flex items-strech q-mb-md justify-around q-gutter-x-sm">
        <InvokerSpellGuide
          class="spell-guide"
          :spell="InvokerCombinedSpells['ghostWalk']"
          :primarySpells="InvokerPrimarySpells"
        />
        <InvokerSpellGuide
          class="spell-guide"
          :spell="InvokerCombinedSpells['iceWall']"
          :primarySpells="InvokerPrimarySpells"
        />
      </div>
      <div class="flex items-strech q-mb-md justify-around q-gutter-x-sm">
        <InvokerSpellGuide
          class="spell-guide"
          :spell="InvokerCombinedSpells['tornado']"
          :primarySpells="InvokerPrimarySpells"
        />
        <InvokerSpellGuide
          class="spell-guide"
          :spell="InvokerCombinedSpells['deafeningBlast']"
          :primarySpells="InvokerPrimarySpells"
        />
        <InvokerSpellGuide
          class="spell-guide"
          :spell="InvokerCombinedSpells['forgeSpirit']"
          :primarySpells="InvokerPrimarySpells"
        />
      </div>
      <div class="flex items-strech q-mb-md justify-around q-gutter-x-sm">
        <InvokerSpellGuide
          class="spell-guide"
          :spell="InvokerCombinedSpells['emp']"
          :primarySpells="InvokerPrimarySpells"
        />
        <InvokerSpellGuide
          class="spell-guide"
          :spell="InvokerCombinedSpells['alacrity']"
          :primarySpells="InvokerPrimarySpells"
        />
        <InvokerSpellGuide
          class="spell-guide"
          :spell="InvokerCombinedSpells['chaosMeteor']"
          :primarySpells="InvokerPrimarySpells"
        />
        <InvokerSpellGuide
          class="spell-guide"
          :spell="InvokerCombinedSpells['sunStrike']"
          :primarySpells="InvokerPrimarySpells"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InvokerSpellGuide from 'components/invoker/InvokerSpellGuide.vue';
import {
  InvokerCombinedSpellType,
  InvokerPrimarySpellType,
} from 'src/components/invoker/Spells.ts';
export default Vue.extend({
  name: 'InvokerGuide',
  components: {
    InvokerSpellGuide,
  },
  props: {
    InvokerCombinedSpells: {
      type: Object as () => InvokerCombinedSpellType,
      required: true,
    },
    InvokerPrimarySpells: {
      type: Object as () => InvokerPrimarySpellType,
      required: true,
    },
  },
  data() {
    return {
      guideVisible: true,
    };
  },
});
</script>

<style lang="scss" scoped>
.spell-guide {
  width: 20%;
  max-width: 4.5vw;
  min-width: 50px;
}

.guide-container {
  transition: opacity 0.25s ease;
}

.guide-hidden {
  opacity: 0;
}
</style>