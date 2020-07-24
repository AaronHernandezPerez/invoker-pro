<template>
  <q-input
    ref="input"
    input-class="text-center"
    maxlength="1"
    v-model="displayValue"
    @focus="initFocusValues()"
    @blur="restoreValue()"
    dense
  />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ReplaceInput',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      displayValue: this.value,
      focused: false
    };
  },
  watch: {
    displayValue(newV) {
      if (newV) {
        this.$emit('input', newV);
      }
    },
    value(newV) {
      this.displayValue = newV;
    }
  },
  methods: {
    restoreValue() {
      if (!this.displayValue && this.focused) {
        this.displayValue = this.value;
        this.focused = false;
      }
    },
    initFocusValues() {
      this.displayValue = '';
      this.focused = true;
    },
    focus() {
      // @ts-ignore
      this.$refs.input.focus();
    },
    blur() {
      // @ts-ignore
      this.$refs.input.blur();
    }
  }
});
</script>

<style lang="scss" scoped>
</style>