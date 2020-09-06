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
    <expander v-model="guideVisible">
      <InvokerGuideRow
        class="q-mt-md"
        :spells="[
          InvokerCombinedSpells['coldSnap'],
      ]"
      />
      <InvokerGuideRow
        class="q-mt-md"
        :spells="[
            InvokerCombinedSpells['ghostWalk'],
            InvokerCombinedSpells['iceWall'],
          ]"
      />
      <InvokerGuideRow
        class="q-mt-md"
        :spells="[
            InvokerCombinedSpells['tornado'],
            InvokerCombinedSpells['deafeningBlast'],
            InvokerCombinedSpells['forgeSpirit'],
          ]"
      />
      <InvokerGuideRow
        class="q-mt-md"
        :spells="[
            InvokerCombinedSpells['emp'],
            InvokerCombinedSpells['alacrity'],
            InvokerCombinedSpells['chaosMeteor'],
            InvokerCombinedSpells['sunStrike']
          ]"
      />
    </expander>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InvokerGuideRow from 'src/components/invoker/InvokerGuideRow.vue';
import Expander from 'src/components/Expander.vue';
import {
  InvokerCombinedSpells,
  InvokerPrimarySpells,
} from 'src/components/invoker/Spells.ts';

export default Vue.extend({
  name: 'InvokerGuide',
  components: {
    InvokerGuideRow,
    Expander,
  },
  data() {
    return {
      guideVisible: true,
      InvokerCombinedSpells,
      InvokerPrimarySpells,
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