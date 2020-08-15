<template>
  <div class="full-height">
    <div class="flex justify-center q-mb-md">
      <h5 class="q-ma-none q-mr-lg">{{ $t('Guide') }}</h5>
      <q-btn
        color="primary"
        :icon="guideVisible ? 'fas fa-eye-slash': 'fas fa-eye'"
        @click="guideVisible = !guideVisible"
        :label="$t('Toggle')"
        size="sm"
      />
    </div>
    <div class="guide-container" :class="{ 'guide-hidden': !guideVisible }">
      <div class="flex items-strech q-mb-md justify-around q-gutter-x-sm">
        <InvokerGuideRow :spells="[
            InvokerCombinedSpells['coldSnap'],
          ]" />
      </div>
      <div class="flex items-strech q-mb-md justify-around q-gutter-x-sm">
        <InvokerGuideRow
          :spells="[
            InvokerCombinedSpells['ghostWalk'],
            InvokerCombinedSpells['iceWall'],
          ]"
        />
      </div>
      <div class="flex items-strech q-mb-md justify-around q-gutter-x-sm">
        <InvokerGuideRow
          :spells="[
            InvokerCombinedSpells['tornado'],
            InvokerCombinedSpells['deafeningBlast'],
            InvokerCombinedSpells['forgeSpirit'],
          ]"
        />
      </div>
      <div class="flex items-strech q-mb-md justify-around q-gutter-x-sm">
        <InvokerGuideRow
          :spells="[
            InvokerCombinedSpells['emp'],
            InvokerCombinedSpells['alacrity'],
            InvokerCombinedSpells['chaosMeteor'],
            InvokerCombinedSpells['sunStrike']
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InvokerGuideRow from 'src/components/invoker/InvokerGuideRow.vue';

import {
  InvokerCombinedSpellType,
  InvokerPrimarySpellType,
} from 'src/components/invoker/Spells.ts';
export default Vue.extend({
  name: 'InvokerGuide',
  components: {
    InvokerGuideRow,
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
.guide-container {
  transition: opacity 0.25s ease;
  height: calc(100% - 25px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.guide-hidden {
  opacity: 0;
}
</style>