<template>
  <img
    class="inv-icon"
    :class="[border, clickeable === true ? 'clickeable' : '' ]"
    :src="icon"
    @click="clickHandler"
  />
</template>

<script>
import Vue from 'vue';
import { StartedStatus } from 'src/components/invoker/GameModes.ts';
import NoIcon from 'src/statics/icons/invoker/No_icon.png';
import { mapState } from 'vuex';

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
    ...mapState('InvokerGame', ['gameStatus']),
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
    clickeable() {
      if (this.clickEvent && this.gameStatus === StartedStatus) {
        return true;
      }
      return false;
    },
  },
  data() {
    return {
      active: false,
      timeout: false,
      clickEvent: false,
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
      if (this.clickeable) {
        this._events.click[0]();
      }
    },
  },
  created() {
    if (this._events.click) {
      this.clickEvent = true;
    }
  },
});
</script>

<style lang="scss" scoped>
// Topleft white
$light: rgba(255, 255, 255, 0.3);
$dark: rgba(255, 255, 255, 0.1);
img.inv-icon {
  width: 100%;
  transition: opacity 0.25s ease;

  &.clickeable:active {
    &.square {
      border-top: inset $dark;
      border-left: inset $dark;
      border-right: outset $light;
      border-bottom: outset $light;
    }

    &.round {
      border-radius: 100%;
      border: 6px groove $dark;
    }
  }
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
</style>
