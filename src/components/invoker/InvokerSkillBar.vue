<template>
  <div class="row">
    <div class="col flex justify-center items-center">
      <div class="primary-spells">
        <InvokerSpell class="full-width" :spell="InvokerPrimarySpells['q']" />

        <ReplaceInput
          v-model="InvokerPrimarySpells['q'].keybind"
          @input="saveKeybind(InvokerPrimarySpells['q'].keybind,'q',$refs.w)"
        />
      </div>
    </div>
    <div class="col flex justify-center items-center">
      <div class="primary-spells">
        <InvokerSpell class="full-width" :spell="InvokerPrimarySpells['w']" />
        <ReplaceInput
          ref="w"
          v-model="InvokerPrimarySpells['w'].keybind"
          @input="saveKeybind(InvokerPrimarySpells['w'].keybind,'w',$refs.e)"
        />
      </div>
    </div>
    <div class="col flex justify-center items-center">
      <div class="primary-spells">
        <InvokerSpell class="full-width" :spell="InvokerPrimarySpells['e']" />
        <ReplaceInput
          ref="e"
          v-model="InvokerPrimarySpells['e'].keybind"
          @input="saveKeybind(InvokerPrimarySpells['e'].keybind,'e',$refs.r)"
        />
      </div>
    </div>
    <div class="col flex justify-center items-center">
      <div class="primary-spells">
        <InvokerSpell class="full-width" :spell="InvokerPrimarySpells['r']" />
        <ReplaceInput
          ref="r"
          v-model="InvokerPrimarySpells['r'].keybind"
          @input="saveKeybind(InvokerPrimarySpells['r'].keybind,'r')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InvokerSpell from 'components/invoker/InvokerSpell.vue';
import ReplaceInput from 'components/ReplaceInput.vue';

import { find } from 'lodash-es';

export default Vue.extend({
  name: '',
  props: {
    InvokerPrimarySpells: { type: Object, required: true }
  },
  components: {
    InvokerSpell,
    ReplaceInput
  },
  data() {
    return {};
  },
  methods: {
    saveKeybind(
      value: string,
      keybind: string,
      next: { focus: Function } | undefined
    ) {
      const keybindings = this.$q.localStorage.getItem('keybindings');
      // @ts-ignore
      for (const key in keybindings) {
        if (keybindings.hasOwnProperty(key)) {
          // @ts-ignore
          const element = keybindings[key];
          if (element === value && keybind !== key) {
            // debugger;
            // @ts-ignore
            keybindings[key] = '';
            this.InvokerPrimarySpells[key].keybind = '';
          }
        }
      }

      // @ts-ignore
      keybindings[keybind] = value;
      this.$q.localStorage.set('keybindings', keybindings);
      if (next) {
        next.focus();
      } else {
        // @ts-ignore
        this.$refs.r.blur();
      }
    }
  }
});
</script>

<style lang="scss" scoped>
</style>