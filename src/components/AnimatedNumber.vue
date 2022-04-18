<template>
  <span v-html="formatValue(Number(animatedValue))"></span>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import anime from 'animejs';

export default defineComponent({
  props: {
    value: {
      type: Number,
      default: 0,
      required: true,
    },
    formatValue: {
      type: Function,
      default: (value: number) => value.toFixed(2),
    },
    easing: {
      type: String,
      default: 'linear',
    },
    duration: {
      type: Number,
      default: 1000,
    },
    update: Function,
    begin: Function,
    complete: Function,
    run: Function,
    delay: {
      type: Number,
      default: 0,
    },
    round: {
      default: null,
    },
  },
  data() {
    return {
      animatedValue: 0,
    };
  },
  mounted() {
    this.animateValue(this.value);
  },
  watch: {
    value(value) {
      this.animateValue(value);
    },
  },
  methods: {
    animateValue(value: number) {
      const {
        begin,
        easing,
        duration,
        complete,
        update,
        run,
        delay,
        round,
      } = this;
      anime({
        targets: this,
        animatedValue: value,
        duration,
        easing,
        update,
        begin,
        complete,
        run,
        delay,
        round,
      });
    },
  },
});
</script>
