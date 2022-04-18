<template>
  <img class="inv-icon" :class="[border, clickeable === true ? 'clickeable' : '', inactive ? 'inactive' : '']"
    :src="icon" />
</template>

<script>
import { defineComponent } from 'vue';
import { StartedStatus } from 'src/components/invoker/GameModes';
import NoIcon from 'src/assets/icons/invoker/No_icon.png';
import { mapState } from 'vuex';

export default defineComponent({
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
    inactive: {
      type: Boolean,
      default: false
    }
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
      if (this.gameStatus === StartedStatus) {
        return true;
      }
      return false;
    },
  },
  data() {
    return {};
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
  user-select: none;

  &.clickeable.active:active {
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

.inactive {
  opacity: 0.5;
  filter: blur(1px);
}
</style>
