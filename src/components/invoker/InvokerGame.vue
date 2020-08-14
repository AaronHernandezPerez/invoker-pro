<template>
  <div class="row q-col-gutter-lg invoker-game container">
    <div class="col-12 col-md">
      <InvokerGuide
        :InvokerCombinedSpells="InvokerCombinedSpells"
        :InvokerPrimarySpells="InvokerPrimarySpells"
      />
    </div>
    <div class="col-12 col-md last-sm">
      <div class="column justify-between center-column">
        <div class="flex justify-center">
          <InvokerSpell class="random-spell" :spell="randomSpell" size="6x" />
        </div>
        <div class="q-my-xl row no-wrap reverse justify-around q-gutter-md">
          <div class="flex">
            <InvokerSpell :spell="InvokerPrimarySpells[spellStack.data[0]]" border="round" />
          </div>
          <div class="flex">
            <InvokerSpell :spell="InvokerPrimarySpells[spellStack.data[1]]" border="round" />
          </div>
          <div class="flex">
            <InvokerSpell :spell="InvokerPrimarySpells[spellStack.data[2]]" border="round" />
          </div>
        </div>
        <InvokerSkillBar
          :InvokerPrimarySpells="InvokerPrimarySpells"
          :usedSpellStack="usedSpellStack"
          @skill-press="handleKeypress"
        />
      </div>
    </div>
    <div class="col-12 col-md">
      <div class="row">
        <div class="col">Played: {{playedTotal}}</div>
      </div>
      <div class="row">
        <div class="col">Points: {{playedSuccessful}}</div>
      </div>
      <div class="row">
        <div class="col">Failed: {{playedFailed}}</div>
      </div>
      <div>
        Sound volume
        <div class="q-px-md">
          <q-slider v-model="audioVolume" :max="100" :step="5" />
        </div>
      </div>
    </div>
  </div>
</template><script lang="ts">
/* eslint-disable @typescript-eslint/unbound-method */
import Vue from 'vue';
import InvokerSpell from 'components/invoker/InvokerSpell.vue';
import InvokerGuide from 'components/invoker/InvokerGuide.vue';
import InvokerSkillBar from 'components/invoker/InvokerSkillBar.vue';

import Stack from 'src/classes/Stack';

// Settings neccesary localstorage data
import { LocalStorage } from 'quasar';

type KeybindsType = {
  q: string;
  w: string;
  e: string;
  r: string;
};

if (!LocalStorage.getItem('keybindings')) {
  LocalStorage.set('keybindings', {
    q: 'q',
    w: 'w',
    e: 'e',
    r: 'r',
  });
}

type SpellObject = {
  name: string;
} | null;

import {
  InvokerPrimarySpellType,
  InvokerPrimarySpells,
  InvokerCombinedSpells,
  CombinedSpellType,
  InvokerCombinedSpellType,
} from 'components/invoker/Spells';

export default Vue.extend({
  name: 'InvokerGame',
  components: {
    InvokerSpell,
    InvokerGuide,
    InvokerSkillBar,
  },

  data() {
    const keybindings = this.$q.localStorage.getItem(
      'keybindings'
    ) as KeybindsType;

    for (const i in InvokerPrimarySpells) {
      const e = InvokerPrimarySpells[i as keyof InvokerPrimarySpellType];
      e.keybind = keybindings[i as keyof KeybindsType];
    }

    return {
      InvokerPrimarySpells,
      InvokerCombinedSpells,
      randomSpell: null as null | CombinedSpellType,
      spellStack: new Stack(),
      playedTotal: 0,
      playedSuccessful: 0,
      playedFailed: 0,
      audioVolume: parseInt(localStorage.audioVolume) || 100,
      usedSpellStack: [] as CombinedSpellType[],
    };
  },

  computed: {
    defaultKeybindings() {
      const bindings: {
        [index: string]: string;
      } = {};

      for (const key in this.InvokerPrimarySpells) {
        const element = this.InvokerPrimarySpells[
          key as keyof InvokerPrimarySpellType
        ];
        bindings[element.keybind as keyof KeybindsType] = key;
      }

      return bindings;
    },
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

    findMatch(): CombinedSpellType | null {
      let usedSpell = null;

      for (const key in this.InvokerCombinedSpells) {
        const element = this.InvokerCombinedSpells[
          key as keyof InvokerCombinedSpellType
        ];

        if (this.spellStack.equals(element.combination)) {
          usedSpell = element;
          break;
        }
      }

      return usedSpell;
    },

    pushToUsedSpellStack(spell: CombinedSpellType) {
      if (!this.usedSpellStack.includes(spell)) {
        this.usedSpellStack.unshift(spell);

        if (this.usedSpellStack.length > 2) {
          this.usedSpellStack.pop();
        }
      }
    },

    invoke() {
      if (this.spellStack.data.length === 3 && this.randomSpell !== null) {
        // Use ability / check if is the one show
        if (this.spellStack.equals(this.randomSpell.combination)) {
          this.randomSpell = this.selectRandomSpell(this.randomSpell);
          this.playAudio('success');
          this.playedSuccessful++;
        } else {
          this.playedFailed++;
          this.playAudio('fail');
        }

        // Finding current combination spell
        const usedSpell = this.findMatch();

        if (usedSpell) {
          this.pushToUsedSpellStack(usedSpell);
        }
      } else {
        // Cant use ability
        this.playAudio('fail');
      }
    },

    handleKeypress(e: { key: string }) {
      console.log('event', e);
      const spellId: string = this.defaultKeybindings[e.key];

      if (spellId) {
        const selectedSpell = this.InvokerPrimarySpells[
          spellId as keyof InvokerPrimarySpellType
        ];

        if (selectedSpell.value !== 'r') {
          this.spellStack.unshift(selectedSpell.value);
        } else {
          // Use ability / check if is the one show
          this.invoke();
        }
      }
    },

    selectRandomSpell(
      currentSpell: CombinedSpellType | null
    ): CombinedSpellType {
      this.playedTotal++;
      const keys: string[] = Object.keys(this.InvokerCombinedSpells);
      let randomKey: string;

      do {
        randomKey = keys[Math.floor(Math.random() * keys.length)];
      } while (
        currentSpell &&
        currentSpell.name === this.InvokerCombinedSpells[randomKey].name
      );

      return this.InvokerCombinedSpells[randomKey];
    },
  },

  watch: {
    audioVolume(newV) {
      localStorage.audioVolume = newV;
    },
  },

  created() {
    window.addEventListener('keydown', this.handleKeypress);
    this.randomSpell = this.selectRandomSpell(this.randomSpell);
  },

  destroyed() {
    window.removeEventListener('keydown', this.handleKeypress);
  },
});
</script><style lang="scss">
@import 'src/css/quasar.variables.scss';

@media (max-width: $breakpoint-xs-max) {
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

.invoker-game {
  min-height: $landing-height;
  padding-bottom: 25px;
}

.center-column {
  min-height: calc(100vh - 6em);
}
</style>