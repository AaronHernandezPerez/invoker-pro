<template>
  <div class="row q-col-gutter-lg">
    <div class="col-12 col-sm">
      <InvokerGuide :InvokerSpells="InvokerSpells" :InvokerPrimarySpells="InvokerPrimarySpells" />
    </div>
    <div class="col-12 col-sm last-sm">
      <div class="column justify-between full-height">
        <div class="flex justify-center">
          <InvokerSpell class="random-spell" :spell="randomSpell" size="6x" />
        </div>

        <div class="q-my-xl row no-wrap reverse justify-around q-gutter-md">
          <div
            class="row no-wrap reverse q-gutter-md"
            v-for="(value, key) in spellStack.data"
            :key="key"
          >
            <InvokerSpell :spell="InvokerPrimarySpells[value]" />
          </div>
        </div>

        <InvokerSkillBar :InvokerPrimarySpells="InvokerPrimarySpells" />
      </div>
    </div>
    <div class="col-12 col-sm">
      <div class="row">
        <div class="col">Played: {{ playedTotal }}</div>
      </div>
      <div class="row">
        <div class="col">Points: {{ playedSuccessful }}</div>
      </div>
      <div class="row">
        <div class="col">Failed: {{ playedFailed }}</div>
      </div>
      <div>
        Sound volume
        <div class="q-px-md">
          <q-slider v-model="audioVolume" :max="100" :step="5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/unbound-method */
import Vue from 'vue';
import InvokerSpell from 'components/invoker/InvokerSpell.vue';
import InvokerGuide from 'components/invoker/InvokerGuide.vue';
import InvokerSkillBar from 'components/invoker/InvokerSkillBar.vue';

import Stack from 'src/classes/Stack';

// Settings neccesary localstorage data
import { LocalStorage } from 'quasar';

if (!LocalStorage.getItem('keybindings')) {
  LocalStorage.set('keybindings', { q: 'q', w: 'w', e: 'e', r: 'r' });
}

type SpellObject = { name: string } | null;

export default Vue.extend({
  name: 'InvokerGame',
  components: {
    InvokerSpell,
    InvokerGuide,
    InvokerSkillBar
  },
  data() {
    const keybindings = this.$q.localStorage.getItem('keybindings') as {
      q: string;
      w: string;
      e: string;
      r: string;
    };

    const InvokerPrimarySpells: {
      [index: string]: {
        value: string;
        keybind: string;
        name: string;
        icon: object;
        icon2x: object;
        icon4x: object;
        icon6x: object;
      };
    } = {
      q: {
        value: 'q',
        keybind: keybindings.q,
        name: 'Quas',
        icon: require('src/statics/icons/invoker/Quas_icon.png'),
        icon2x: require('src/statics/icons/invoker/Quas_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Quas_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Quas_icon_6x.png')
      },
      w: {
        value: 'w',
        keybind: keybindings.w,
        name: 'Wex',
        icon: require('src/statics/icons/invoker/Wex_icon.png'),
        icon2x: require('src/statics/icons/invoker/Wex_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Wex_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Wex_icon_6x.png')
      },
      e: {
        value: 'e',
        keybind: keybindings.e,
        name: 'Exort',
        icon: require('src/statics/icons/invoker/Exort_icon.png'),
        icon2x: require('src/statics/icons/invoker/Exort_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Exort_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Exort_icon_6x.png')
      },
      r: {
        value: 'r',
        keybind: keybindings.r,
        name: 'Invoke',
        icon: require('src/statics/icons/invoker/Invoke_icon.png'),
        icon2x: require('src/statics/icons/invoker/Invoke_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Invoke_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Invoke_icon_6x.png')
      }
    };

    const InvokerSpells: {
      [index: string]: {
        name: string;
        combination: object;
        icon: object;
        icon2x: object;
        icon4x: object;
        icon6x: object;
      };
    } = {
      coldSnap: {
        name: 'Cold Snap',
        combination: { q: 3 },
        icon: require('src/statics/icons/invoker/Cold_Snap_icon.png'),
        icon2x: require('src/statics/icons/invoker/Cold_Snap_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Cold_Snap_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Cold_Snap_icon_6x.png')
      },
      ghostWalk: {
        name: 'Ghost Walk',
        combination: { q: 2, w: 1 },
        icon: require('src/statics/icons/invoker/Ghost_Walk_icon.png'),
        icon2x: require('src/statics/icons/invoker/Ghost_Walk_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Ghost_Walk_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Ghost_Walk_icon_6x.png')
      },
      iceWall: {
        name: 'Ice Wall',
        combination: { q: 2, e: 1 },
        icon: require('src/statics/icons/invoker/Ice_Wall_icon.png'),
        icon2x: require('src/statics/icons/invoker/Ice_Wall_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Ice_Wall_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Ice_Wall_icon_6x.png')
      },
      tornado: {
        name: 'Tornado',
        combination: { q: 1, w: 2 },
        icon: require('src/statics/icons/invoker/Tornado_icon.png'),
        icon2x: require('src/statics/icons/invoker/Tornado_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Tornado_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Tornado_icon_6x.png')
      },
      deafeningBlast: {
        name: 'Deafening Blast',
        combination: { q: 1, w: 1, e: 1 },
        icon: require('src/statics/icons/invoker/Deafening_Blast_icon.png'),
        icon2x: require('src/statics/icons/invoker/Deafening_Blast_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Deafening_Blast_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Deafening_Blast_icon_6x.png')
      },
      forgeSpirit: {
        name: 'Forge Spirit',
        combination: { q: 1, e: 2 },
        icon: require('src/statics/icons/invoker/Forge_Spirit_icon.png'),
        icon2x: require('src/statics/icons/invoker/Forge_Spirit_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Forge_Spirit_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Forge_Spirit_icon_6x.png')
      },
      emp: {
        name: 'EMP',
        combination: { w: 3 },
        icon: require('src/statics/icons/invoker/EMP_icon.png'),
        icon2x: require('src/statics/icons/invoker/EMP_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/EMP_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/EMP_icon_6x.png')
      },
      alacrity: {
        name: 'Alacrity',
        combination: { w: 2, e: 1 },
        icon: require('src/statics/icons/invoker/Alacrity_icon.png'),
        icon2x: require('src/statics/icons/invoker/Alacrity_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Alacrity_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Alacrity_icon_6x.png')
      },
      chaosMeteor: {
        name: 'Chaos Meteor',
        combination: { w: 1, e: 2 },
        icon: require('src/statics/icons/invoker/Chaos_Meteor_icon.png'),
        icon2x: require('src/statics/icons/invoker/Chaos_Meteor_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Chaos_Meteor_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Chaos_Meteor_icon_6x.png')
      },
      sunStrike: {
        name: 'Sun Strike',
        combination: { e: 3 },
        icon: require('src/statics/icons/invoker/Sun_Strike_icon.png'),
        icon2x: require('src/statics/icons/invoker/Sun_Strike_icon_2x.png'),
        icon4x: require('src/statics/icons/invoker/Sun_Strike_icon_4x.png'),
        icon6x: require('src/statics/icons/invoker/Sun_Strike_icon_6x.png')
      }
    };

    const spellStack = new Stack();

    const playedTotal = 0;

    const playedSuccessful = 0;

    const playedFailed = 0;

    const audioVolume = parseInt(localStorage.audioVolume) || 100;

    return {
      InvokerPrimarySpells,
      InvokerSpells,
      randomSpell: null as SpellObject,
      spellStack,
      playedTotal,
      playedSuccessful,
      playedFailed,
      audioVolume
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
      audioObj.volume = this.audioVolume / 100;
      audioObj.play().then(() => {
        audioObj.remove();
      });
    },
    invoke() {
      if (this.spellStack.data.length === 3 && this.randomSpell !== null) {
        // Use ability / check if is the one show
        // @ts-ignore
        if (this.spellStack.equals(this.randomSpell.combination)) {
          // @ts-ignore
          this.randomSpell = this.selectRandomSpell(this.randomSpell);
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
          this.invoke();
        }
      }
    },
    selectRandomSpell(currentSpell: SpellObject): SpellObject {
      this.playedTotal++;
      const keys: string[] = Object.keys(this.InvokerSpells);
      let randomKey: string;

      do {
        randomKey = keys[Math.floor(Math.random() * keys.length)];
      } while (
        currentSpell &&
        currentSpell.name === this.InvokerSpells[randomKey].name
      );

      return this.InvokerSpells[randomKey];
    }
  },
  watch: {
    audioVolume(newV) {
      localStorage.audioVolume = newV;
    }
  },
  created() {
    window.addEventListener('keydown', this.handleKeypress);
    this.randomSpell = this.selectRandomSpell(this.randomSpell);
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

.spell-guide {
  width: 100px;
}

.random-spell {
  max-width: 350px;
}
.primary-spells {
  max-width: 80px;
}
</style>
