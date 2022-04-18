<template>
  <q-input ref="input" input-class="text-center" maxlength="1" v-model="displayValue" @focus="initFocusValues()"
    @blur="restoreValue()" @update:model-value="nextInput()" dense />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Ref {
  focus: () => void; blur: () => void,
}
export default defineComponent({
  name: 'ReplaceInput',
  emits: ['new-key'],
  props: {
    modelValue: {
      type: String as () => string | null,
      required: false,
    },
  },
  data() {
    return {
      displayValue: this.modelValue,
    };
  },
  watch: {
    modelValue(newV) {
      this.displayValue = newV;
    },
  },
  methods: {
    restoreValue() {
      this.displayValue = this.modelValue;
    },
    initFocusValues() {
      this.displayValue = '';
    },
    focus() {
      (this.$refs.input as Ref).focus();
    },
    blur() {
      (this.$refs.input as Ref).blur();
    },
    nextInput() {
      this.$emit('new-key', this.displayValue);
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
