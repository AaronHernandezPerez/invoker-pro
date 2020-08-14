<template>
  <img
    class="inv-icon"
    v-bind:class="[border,  active ? 'active':'', ]"
    :src="icon"
    @click="clickHandler"
  />
</template>

<script>
import Vue from 'vue';
import NoIcon from 'src/statics/icons/invoker/No_icon.png';
export default Vue.extend({
  name: 'InvokerSpell',
  props: {
    spell: {
      type: Object,
      required: false,
    },
    size: {
      type: String,
    },
    border: {
      type: String,
      default: 'square',
    },
  },
  computed: {
    icon() {
      if (!this.spell || !this.spell.icon) {
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
    },
  },
  data() {
    return {
      active: false,
      timeout: false,
    };
  },
  methods: {
    activate() {
      clearTimeout(this.timeout);

      this.active = true;
      this.timeout = setTimeout(() => {
        this.active = false;
      }, 100);
    },
    clickHandler() {
      if (this._events.click) {
        this._events.click[0]();
        this.activate();
      }
    },
  },
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

.active {
  &.square {
    border-width: 3px;
    border-top: inset $light;
    border-left: inset $light;
    border-right: outset $dark;
    border-bottom: outset $dark;
  }

  &.round {
    border-radius: 100%;
    border: 6px groove $dark;
  }
}
</style>
