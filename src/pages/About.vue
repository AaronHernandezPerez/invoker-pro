<template>
  <q-page padding>
    <div class="container">
      <q-card>
        <q-card-section>
          <h3 class="text-center q-my-xs">{{ $t('invoker.name') }}</h3>
          <div class="flex justify-center q-my-lg">
            <img src="~assets/icons/invoker/invoker_vert.jpg" />
          </div>
          <p class="text-center subtitle">{{ $t('invoker.roles') }}</p>
        </q-card-section>
        <q-card-section>
          <h5 class="text-center text-secondary q-mb-lg q-mt-md">{{ $t('bio') }}</h5>
          <p class="q-pa-md">{{ $t('invoker.lore') }}</p>
        </q-card-section>
      </q-card>
      <q-card class="q-mt-lg">
        <q-card-section>
          <h5 class="text-center text-secondary q-mb-lg q-mt-md">{{ $t('Abilities') }}</h5>
          <AbilityShowcase v-for="spell in InvokerPrimarySpells" :key="spell.name" :spell="spell"
            :keySpell="spell.name.toLocaleLowerCase()" />
          <AbilityShowcase v-for="(spell, k) in InvokerCombinedSpells" :key="spell.name" :spell="spell"
            :keySpell="(k as string)" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  InvokerPrimarySpells,
  InvokerCombinedSpells,
} from 'src/components/invoker/Spells';
import AbilityShowcase from 'src/components/about/AbilityShowcase.vue';

export default defineComponent({
  name: 'PageAbout',
  components: {
    AbilityShowcase,
  },
  data() {
    return {
      InvokerPrimarySpells,
      InvokerCombinedSpells,
    };
  },
});
</script>

<style lang="scss">
</style>
