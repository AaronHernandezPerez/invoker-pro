<template>
  <q-input
    ref="input"
    input-class="text-center"
    maxlength="1"
    v-model="displayValue"
    @focus="initFocusValues()"
    @blur="restoreValue()"
    @input="nextInput()"
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
      required: true,
    },
  },
  data() {
    return {
      displayValue: this.value,
    };
  },
  watch: {
    value(newV) {
      this.displayValue = newV;
    },
  },
  methods: {
    restoreValue() {
      this.displayValue = this.value;
    },
    initFocusValues() {
      this.displayValue = '';
    },
    focus() {
      // @ts-ignore
      this.$refs.input.focus();
    },
    blur() {
      // @ts-ignore
      this.$refs.input.blur();
    },
    nextInput() {
      this.$emit('input', this.displayValue);
    },
  },
});
</script>

<style lang="scss" scoped>
</style>