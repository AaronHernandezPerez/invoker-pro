<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm">div</div>
      <div class="col-12 col-sm last-sm">
        <div class="flex justify-center">
          <InvokerSpell :spell="randomSpell" />
        </div>

        <div class="row">
          <div class="col">
            <InvokerSpell class="full-width" :spell="InvokerPrimarySpells['quas']" />
            <q-input
              input-class="text-center"
              maxlength="1"
              v-model="InvokerPrimarySpells['quas'].keybind"
              dense
            />
          </div>
          <div class="col">
            <InvokerSpell class="full-width" :spell="InvokerPrimarySpells['wex']" />
            <q-input
              input-class="text-center"
              maxlength="1"
              v-model="InvokerPrimarySpells['wex'].keybind"
              dense
            />
          </div>
          <div class="col">
            <InvokerSpell class="full-width" :spell="InvokerPrimarySpells['exort']" />
            <q-input
              input-class="text-center"
              maxlength="1"
              v-model="InvokerPrimarySpells['exort'].keybind"
              dense
            />
          </div>
          <div class="col">
            <InvokerSpell class="full-width" :spell="InvokerPrimarySpells['invoke']" />
            <q-input
              input-class="text-center"
              maxlength="1"
              v-model="InvokerPrimarySpells['invoke'].keybind"
              dense
            />
          </div>
        </div>
      </div>
      <div class="col-12 col-sm">
        <div class="row">
          <div class="col">Played: {{playedTotal}}</div>
        </div>
        <div class="row">
          <div class="col">Points: {{playedSuccessful}}</div>
        </div>
        <div class="row">
          <div class="col">Failed: {{playedFailed}}</div>
        </div>
      </div>
    </div>
    <br />
    {{spellStack}}
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/unbound-method */

import Vue from 'vue';
import InvokerSpell from 'components/invoker/InvokerSpell.vue';
import Stack from 'src/classes/Stack';

export default Vue.extend({
  name: 'InvokerGame',
  components: {
    InvokerSpell
  },
  data() {
    const InvokerPrimarySpells: {
      [index: string]: {
        value: string;
        keybind: string;
        icon: object;
        icon2x: object;
        icon4x: object;
        icon6x: object;
      };
    } = {
      quas: {
        value: 'q',
        keybind: 'q',
        icon: require('src/statics/icons/invoker/Quas_icon.png'),
        icon2x: require('src/statics/icons/invoker/Quas_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Quas_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Quas_icon_6x.png')
      },
      wex: {
        value: 'w',
        keybind: 'w',
        icon: require('src/statics/icons/invoker/Wex_icon.png'),
        icon2x: require('src/statics/icons/invoker/Wex_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Wex_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Wex_icon_6x.png')
      },
      exort: {
        value: 'e',
        keybind: 'e',
        icon: require('src/statics/icons/invoker/Exort_icon.png'),
        icon2x: require('src/statics/icons/invoker/Exort_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Exort_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Exort_icon_6x.png')
      },
      invoke: {
        value: 'r',
        keybind: 'r',
        icon: require('src/statics/icons/invoker/Invoke_icon.png'),
        icon2x: require('src/statics/icons/invoker/Invoke_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Invoke_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Invoke_icon_6x.png')
      }
    };

    const InvokerSpells: { [index: string]: object } = {
      coldSnap: {
        combination: { q: 3 },
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
        combination: { w: 2, e: 1 },
        icon: require('src/statics/icons/invoker/Alacrity_icon.png'),
        icon2x: require('src/statics/icons/invoker/Alacrity_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Alacrity_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Alacrity_icon_6x.png')
      },
      chaosMeteor: {
        combination: { w: 1, e: 2 },
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

    const randomSpell: object | null = null;

    const spellStack = new Stack();

    const playedTotal = 0;

    const playedSuccessful = 0;

    const playedFailed = 0;

    return {
      InvokerPrimarySpells,
      InvokerSpells,
      randomSpell,
      spellStack,
      playedTotal,
      playedSuccessful,
      playedFailed
    };
  },
  computed: {
    defaultKeybindings() {
      const bindings: { [index: string]: string } = {};
      for (const key in this.InvokerPrimarySpells) {
        if (this.InvokerPrimarySpells.hasOwnProperty(key)) {
          const element = this.InvokerPrimarySpells[key];
          bindings[element.keybind] = key;
        }
      }
      return bindings;
    }
  },
  methods: {
    playAudio(audio: string) {
      let path: string;
      switch (audio) {
        case 'success':
          path = 'statics/audio/success.mp3';
          break;
        case 'fail':
          path = 'statics/audio/fail.mp3';
          break;

        default:
          return;
          break;
      }

      const audioObj = new Audio(path);
      audioObj.play().then(() => {
        audioObj.remove();
      });
    },
    invoke(selectedSpell: object) {
      if (this.spellStack.data.length === 3 && this.randomSpell !== null) {
        // Use ability / check if is the one show
        // @ts-ignore
        if (this.spellStack.equals(this.randomSpell.combination)) {
          this.randomSpell = this.selectRandomSpell();
          this.playAudio('success');
          this.playedSuccessful++;
        } else {
          this.playedFailed++;
          this.playAudio('fail');
        }
      } else {
        // Cant use ability
        this.playAudio('fail');
      }
    },
    handleKeypress(e: { key: string }) {
      const spellId: string = this.defaultKeybindings[e.key];
      if (spellId) {
        const selectedSpell = this.InvokerPrimarySpells[spellId];
        if (selectedSpell.value !== 'r') {
          this.spellStack.unshift(selectedSpell.value);
        } else {
          // Use ability / check if is the one show
          this.invoke(selectedSpell);
        }
      }
    },
    selectRandomSpell(): object {
      this.playedTotal++;
      const keys: string[] = Object.keys(this.InvokerSpells);
      const randomKey: string = keys[Math.floor(Math.random() * keys.length)];
      return this.InvokerSpells[randomKey];
    }
  },
  created() {
    window.addEventListener('keydown', this.handleKeypress);
    this.randomSpell = this.selectRandomSpell();
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
