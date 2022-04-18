<template>
  <div>
    <div>
      <slot></slot>
    </div>

    <div class="row">
      <div class="col flex justify-center items-center">
        <div class="primary-spells">
          <InvokerSpell class="full-width cursor-pointer" :spell="primarySpells['q']" :active="true"
            @click="skillPress(primarySpells['q'].keybind)" />
          <ReplaceInput v-model="primarySpells['q'].keybind"
            @new-key="(key: string) => saveKeybind(key, primarySpells['q'].value, $refs.w)" />
        </div>
      </div>
      <div class="col flex justify-center items-center">
        <div class="primary-spells">
          <InvokerSpell class="full-width cursor-pointer" :spell="primarySpells['w']"
            @click="skillPress(primarySpells['w'].keybind)" />
          <ReplaceInput ref="w" v-model="primarySpells['w'].keybind"
            @new-key="(key: string) => saveKeybind(key, primarySpells['w'].value, $refs.e)" />
        </div>
      </div>
      <div class="col flex justify-center items-center">
        <div class="primary-spells">
          <InvokerSpell class="full-width cursor-pointer" :spell="primarySpells['e']"
            @click="skillPress(primarySpells['e'].keybind)" />
          <ReplaceInput ref="e" v-model="primarySpells['e'].keybind"
            @new-key="(key: string) => saveKeybind(key, primarySpells['e'].value, $refs.r)" />
        </div>
      </div>
      <div class="col flex justify-center items-start">
        <div class="primary-spells">
          <InvokerSpell class="full-width" :spell="usedSpellStack[0]" />
        </div>
      </div>
      <div class="col flex justify-center items-start">
        <div class="primary-spells">
          <InvokerSpell class="full-width" :spell="usedSpellStack[1]" />
        </div>
      </div>
      <div class="col flex justify-center items-center">
        <div class="primary-spells">
          <InvokerSpell class="full-width cursor-pointer" :spell="primarySpells['r']"
            @click="skillPress(primarySpells['r'].keybind)" />
          <ReplaceInput ref="r" v-model="primarySpells['r'].keybind"
            @new-key="(key: string) => saveKeybind(key, primarySpells['r'].value)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InvokerSpell from 'components/invoker/InvokerSpell.vue';
import ReplaceInput from 'components/ReplaceInput.vue';
import {
  InvokerPrimarySpellType,
  CombinedSpellType,
} from 'src/components/invoker/Spells';

export default defineComponent({
  name: 'InvokerSkillBar',
  props: {
    invokerPrimarySpells: {
      type: Object as () => InvokerPrimarySpellType,
      required: true,
    },
    usedSpellStack: Array as () => CombinedSpellType[],
  },
  computed: {
    primarySpells: {
      get() {
        return this.invokerPrimarySpells
      },
      set(value: InvokerPrimarySpellType) {
        this.$emit('update:invokerPrimarySpells', value)
      }
    }
  },
  components: {
    InvokerSpell,
    ReplaceInput,
  },
  data() {
    return {};
  },
  methods: {
    saveKeybind(
      newKeybind: string,
      spellValue: keyof InvokerPrimarySpellType,
      next: { focus: () => void } | undefined
    ) {
      const keybindings = this.$q.localStorage.getItem('keybindings') as {
        [index: string]: string;
      };

      keybindings[spellValue] = newKeybind;
      this.$q.localStorage.set('keybindings', keybindings);
      this.primarySpells[spellValue].keybind = newKeybind
      if (next) {
        next.focus();
      } else {
        (this.$refs.r as { blur: () => void }).blur();
      }
    },
    skillPress(k: string) {
      this.$emit('skill-press', { key: k });
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
