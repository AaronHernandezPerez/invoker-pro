<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm">div</div>
      <div class="col-12 col-sm last-sm">
        <InvokerSpell :spell="selectedSpell" />
      </div>
      <div class="col-12 col-sm">c</div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/unbound-method */

import Vue from 'vue';
import InvokerSpell from 'components/invoker/InvokerSpell.vue';

export default Vue.extend({
  name: 'InvokerGame',
  components: {
    InvokerSpell
  },
  data() {
    const InvokerSpells: { [index: string]: object } = {
      coldSnap: {
        combination: { q: 1 },
        icon: require('src/statics/icons/invoker/Cold_Snap_icon.png'),
        icon2x: require('src/statics/icons/invoker/Cold_Snap_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Cold_Snap_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Cold_Snap_icon_6x.png')
      },
      ghostWalk: {
        combination: { q: 2, w: 1 },
        icon: require('src/statics/icons/invoker/Ghost_Walk_icon.png'),
        icon2x: require('src/statics/icons/invoker/Ghost_Walk_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Ghost_Walk_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Ghost_Walk_icon_6x.png')
      },
      iceWall: {
        combination: { q: 2, e: 1 },
        icon: require('src/statics/icons/invoker/Ice_Wall_icon.png'),
        icon2x: require('src/statics/icons/invoker/Ice_Wall_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Ice_Wall_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Ice_Wall_icon_6x.png')
      },
      tornado: {
        combination: { q: 1, w: 2 },
        icon: require('src/statics/icons/invoker/Tornado_icon.png'),
        icon2x: require('src/statics/icons/invoker/Tornado_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Tornado_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Tornado_icon_6x.png')
      },
      deafeningBlast: {
        combination: { q: 1, w: 1, e: 1 },
        icon: require('src/statics/icons/invoker/Deafening_Blast_icon.png'),
        icon2x: require('src/statics/icons/invoker/Deafening_Blast_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Deafening_Blast_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Deafening_Blast_icon_6x.png')
      },
      forgeSpirit: {
        combination: { q: 1, e: 2 },
        icon: require('src/statics/icons/invoker/Forge_Spirit_icon.png'),
        icon2x: require('src/statics/icons/invoker/Forge_Spirit_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Forge_Spirit_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Forge_Spirit_icon_6x.png')
      },
      emp: {
        combination: { w: 3 },
        icon: require('src/statics/icons/invoker/EMP_icon.png'),
        icon2x: require('src/statics/icons/invoker/EMP_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/EMP_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/EMP_icon_6x.png')
      },
      alacrity: {
        combination: { q: 2, e: 1 },
        icon: require('src/statics/icons/invoker/Alacrity_icon.png'),
        icon2x: require('src/statics/icons/invoker/Alacrity_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Alacrity_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Alacrity_icon_6x.png')
      },
      chaosMeteor: {
        combination: { q: 1, e: 2 },
        icon: require('src/statics/icons/invoker/Chaos_Meteor_icon.png'),
        icon2x: require('src/statics/icons/invoker/Chaos_Meteor_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Chaos_Meteor_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Chaos_Meteor_icon_6x.png')
      },
      sunStrike: {
        combination: { e: 3 },
        icon: require('src/statics/icons/invoker/Sun_Strike_icon.png'),
        icon2x: require('src/statics/icons/invoker/Sun_Strike_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Sun_Strike_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Sun_Strike_icon_6x.png')
      }
    };

    const selectedSpell: object | null = null;

    return {
      InvokerSpells,
      selectedSpell
    };
  },
  methods: {
    handleKeypress(e: object) {
      console.log(e);
    },
    selectRandomSpell(): object {
      const keys: string[] = Object.keys(this.InvokerSpells);
      const randomKey: string = keys[Math.floor(Math.random() * keys.length)];
      return this.InvokerSpells[randomKey];
    }
  },
  created() {
    window.addEventListener('keydown', this.handleKeypress);
    // @ts-ignore #no idea why this happens
    this.selectedSpell = this.selectRandomSpell();
  },
  destroyed() {
    window.removeEventListener('keydown', this.handleKeypress);
  }
});
</script>

<style lang="scss">
@media (max-width: $breakpoint-sm-min) {
  .last-sm {
    order: 3;
  }
}
</style>
