<template>
  <img class="inv-icon" :src="icon" />
</template>

<script>
import Vue from 'vue';
export default Vue.extend({
  name: 'InvokerSpell',
  props: {
    spell: {
      type: Object,
      required: true
    },
    size: {
      type: String
    }
  },
  computed: {
    icon() {
      let iconSize;
      switch (this.size) {
        case '2x':
          iconSize = this.spell.icon2x;
          break;
        case '4x':
          iconSize = this.spell.icon4x;
          break;
        case '6x':
          iconSize = this.spell.icon6x;
          break;
        default:
          iconSize = this.spell.icon;
          break;
      }
      return iconSize;
    }
  }
});
</script>

<style lang="scss" scoped>
// Topleft white
img.inv-icon {
  border-style: outset;
  border-top: outset rgba(255, 255, 255, 0.3);
  border-left: outset rgba(255, 255, 255, 0.3);
  border-right: inset rgba(255, 255, 255, 0.1);
  border-bottom: inset rgba(255, 255, 255, 0.1);
}
</style>