<template>
  <div ref="expander" class="expander">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const Delay = 300;

type ExpanderRef = HTMLDivElement
export default defineComponent({
  name: 'Expander',
  props: {
    modelValue: Boolean, //true is expanded
  },
  data() {
    return {
      expanded: this.modelValue,
      previousHeight: '0px',
      timeout: null as ReturnType<typeof setTimeout> | null,
    };
  },
  watch: {
    modelValue(newV) {
      if (newV === false) {
        this.collapse(newV);
      } else if (newV === true) {
        this.expand(newV);
      }
    },
  },
  methods: {
    expand(val: boolean) {
      this.clearTimeout();
      this.expanded = val;
      (this.$refs.expander as ExpanderRef).style.height = this.previousHeight;
      this.timeout = setTimeout(() => {
        (this.$refs.expander as ExpanderRef).style.height = '';
      }, Delay);
    },
    collapse(val: boolean) {
      this.clearTimeout();
      this.previousHeight = (this.$refs.expander as ExpanderRef).scrollHeight + 'px';
      (this.$refs.expander as ExpanderRef).style.height = this.previousHeight;

      setTimeout(() => {
        (this.$refs.expander as ExpanderRef).style.height = '0px';
        this.expanded = val;
      }, 0);
    },
    clearTimeout() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.expander {
  transition: height 300ms cubic-bezier(0.25, 0.8, 0.5, 1) 0s;
  display: block;
  overflow-y: hidden;
}
</style>
