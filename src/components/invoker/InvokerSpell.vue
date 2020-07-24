<template>
  <img class="inv-icon" :class="border" :src="icon" />
</template>

<script>
import Vue from 'vue';
import NoIcon from 'src/statics/icons/invoker/No_icon.png';
export default Vue.extend({
  name: 'InvokerSpell',
  props: {
    spell: {
      type: Object,
      required: false
    },
    size: {
      type: String
    },
    border: {
      type: String,
      default: 'square'
    }
  },
  computed: {
    icon() {
      if (!this.spell) {
        return NoIcon;
      }
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
$light: rgba(255, 255, 255, 0.3);
$dark: rgba(255, 255, 255, 0.1);
img.inv-icon {
  width: 100%;
}

.square {
  border-style: outset;
  border-width: 3px;
  border-top: outset $light;
  border-left: outset $light;
  border-right: inset $dark;
  border-bottom: inset $dark;
}

.round {
  border-radius: 100%;
  border: 6px ridge $dark;
}
</style>
