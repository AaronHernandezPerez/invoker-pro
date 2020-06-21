<template>
  <q-input
    ref="input"
    input-class="text-center"
    maxlength="1"
    v-model="displayValue"
    @focus="displayValue=''"
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
      displayValue: this.value
    };
  },
  watch: {
    displayValue(newV, oldV) {
      if (newV) {
        this.$emit('input', newV);
      }
    }
  },
  methods: {
    restoreValue() {
      if (!this.displayValue) {
        this.displayValue = this.value;
      }
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