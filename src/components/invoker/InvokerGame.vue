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
        {{gameStatus}}
        <div>
          <div v-if="gameStatus === StartedStatus">
            <h4 class="text-center">{{ $t('Invoke these spells') }}</h4>
            <div class="flex justify-around items-center" v-if="randomSpells">
              <InvokerSpell
                v-for="(spell, i) in randomSpells"
                :key="spell.name"
                class="random-spell"
                :spell="spell"
                size="6x"
                :disabled="i !== randomSpellsIndex"
              />
            </div>
            <q-linear-progress class="q-my-lg" stripe size="1.5em" :value="0.5">
              <div class="absolute-full flex flex-center">
                <q-badge color="primary" :label="'xdd'" />
              </div>
            </q-linear-progress>
          </div>
          <GameSelector v-else-if="gameStatus === UnstartedStatus" @mode-selected="startGame" />
          <continue-game v-else-if="gameStatus ===  FinishedStatus"></continue-game>
        </div>

        <InvokerSkillBar
          :InvokerPrimarySpells="InvokerPrimarySpells"
          :usedSpellStack="usedSpellStack"
          :gameStatus="gameStatus"
          @skill-press="handleKeypress"
        >
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
        </InvokerSkillBar>
      </div>
    </div>
    <div class="col-12 col-md">
      <div>Played: {{playedTotal}}</div>
      <div>Points: {{playedSuccessful}}</div>
      <div>Failed: {{playedFailed}}</div>
      <div>
        Last spell time:
        <!-- {{lastSpellTime}} -->
        <AnimatedNumber
          :value="lastSpellTime"
          :formatValue="formatTime"
          :duration="300"
          :round="3"
        />
      </div>
      <div>{{ $t('Vibration') }}</div>
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
import GameSelector from 'src/components/invoker/GameSelector.vue';
import AnimatedNumber from 'animated-number-vue';
import ContinueGame from 'src/components/invoker/ContinueGame.vue';
import Stack from 'src/classes/Stack';
import Timer from 'easytimer';

import { mapState, mapActions } from 'vuex';
import { shuffle } from 'src/services/AuxFunctions.ts';
import {
  CompleteGameMode,
  TenGameMode,
  TrainingGameMode,
  UnstartedStatus,
  StartedStatus,
  FinishedStatus,
} from 'src/components/invoker/GameModes.ts';

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

import {
  InvokerPrimarySpellType,
  InvokerPrimarySpells,
  InvokerCombinedSpells,
  InvokerCombinedSpellsCombos,
  CombinedSpellType,
  InvokerCombinedSpellType,
  InvokerSpellsTime,
} from 'components/invoker/Spells';

export default Vue.extend({
  name: 'InvokerGame',
  components: {
    InvokerSpell,
    InvokerGuide,
    InvokerSkillBar,
    GameSelector,
    AnimatedNumber,
    ContinueGame,
  },

  data() {
    const keybindings = this.$q.localStorage.getItem(
      'keybindings'
    ) as KeybindsType;

    for (const i in InvokerPrimarySpells) {
      const e = InvokerPrimarySpells[i as keyof InvokerPrimarySpellType];
      e.keybind = keybindings[i as keyof KeybindsType];
    }

    const vibration = this.$q.localStorage.getItem('vibration') || true;

    // const AllSpells = Object.values(InvokerCombinedSpells).map((e) => [e]);
    // AllSpells.push(...InvokerCombinedSpellsCombos);
    const AllSpells = [
      InvokerCombinedSpellsCombos[InvokerCombinedSpellsCombos.length - 2],
    ];
    return {
      // Invoker Spells
      InvokerPrimarySpells,
      InvokerCombinedSpells,
      AllSpells,
      // Selected Spell
      spellIndex: 0,
      randomSpells: null as null | Array<CombinedSpellType>,
      randomSpellsIndex: 0,
      usedSpellStack: [] as CombinedSpellType[],
      spellStack: new Stack(),
      // Player stats
      timer: new Timer(),
      allSpellTimes: [] as Array<number>,
      lastSpellDate: null as null | Date,
      playedTotal: 0,
      playedSuccessful: 0,
      playedFailed: 0,
      // Player options
      audioVolume: parseInt(localStorage.audioVolume) || 100,
      vibration,
      // Game status
      UnstartedStatus,
      StartedStatus,
      FinishedStatus,
    };
  },

  computed: {
    ...mapState('InvokerGame', ['gameStatus', 'gameMode']),
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
    lastSpellTime() {
      let returnVal = 0;
      if (this.allSpellTimes.length > 0) {
        returnVal = this.allSpellTimes[this.allSpellTimes.length - 1];
      }

      return returnVal;
    },
  },
  methods: {
    ...mapActions('InvokerGame', ['resetGame', 'setGameStatus']),
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
      if (this.spellStack.data.length === 3 && this.randomSpells !== null) {
        // Use ability / check if is the one show
        if (
          this.spellStack.equals(
            this.randomSpells[this.randomSpellsIndex].combination
          )
        ) {
          this.playAudio('success');
          this.randomSpellsIndex++;
          this.playedSuccessful++;
          if (this.lastSpellDate) {
            const now = new Date();
            // @ts-ignore
            const time = (now - this.lastSpellDate) / 1000;
            this.allSpellTimes.push(time);
            this.lastSpellDate = now;
          }
          if (this.randomSpellsIndex === this.randomSpells.length) {
            this.selectRandomSpells();
          }
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
    vibrate() {
      if (this.vibration) {
        try {
          navigator.vibrate(15);
        } catch (error) {}
      }
    },
    handleKeypress(e: { key: string }) {
      if (!this.gameStatus) {
        return;
      }

      const spellId: string = this.defaultKeybindings[e.key];

      if (spellId) {
        this.vibrate();
        const selectedSpell = this.InvokerPrimarySpells[
          spellId as keyof InvokerPrimarySpellType
        ];

        if (selectedSpell.value !== 'r') {
          this.spellStack.unshift(selectedSpell.value);
        } else {
          // Use ability / check if is the one selected
          this.invoke();
        }
      }
    },
    spellTimer() {
      this.timer.stop();
      // this.timer = new Timer();
      const TotalTime = InvokerSpellsTime[this.randomSpells?.length || 0];
      this.timer.start({
        precision: 'secondTenths',
        startValues: { seconds: TotalTime },
        target: { seconds: 0 },
        countdown: true,
      });

      this.timer.addEventListener('secondTenthsUpdated', () => {
        console.log(
          this.timer.getTimeValues(),
          this.timer.getTimeValues().toString()
        );
      });

      this.timer.addEventListener('targetAchieved', () => {
        // this.game;
      });
    },
    selectRandomSpells() {
      this.playedTotal++;
      this.randomSpellsIndex = 0;

      switch (this.gameMode) {
        case CompleteGameMode:
          if (this.spellIndex === 0) {
            shuffle(this.AllSpells);
          } else if (this.spellIndex === this.AllSpells.length) {
            shuffle(this.AllSpells);
            this.spellIndex = 0;
          }
          this.randomSpells = this.AllSpells[this.spellIndex];
          // Set Timer
          this.spellTimer();
          break;

        default:
          break;
      }
      this.lastSpellDate = new Date();
      this.spellIndex++;
    },
    startGame() {
      this.selectRandomSpells();
    },
    formatTime(t: number): string {
      const formatedT = t.toFixed(3);
      return formatedT;
    },
  },
  watch: {
    gameStatus(newV) {
      if (newV === StartedStatus) {
        this.startGame();
        this.setGameStatus('finished');
      }
    },
    audioVolume(newV) {
      localStorage.audioVolume = newV;
    },
  },
  created() {
    window.addEventListener('keydown', this.handleKeypress);
  },
  destroyed() {
    window.removeEventListener('keydown', this.handleKeypress);
    this.timer.stop();
    this.resetGame();
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
  max-width: 30%;
}

.primary-spells {
  max-width: 80px;
}

.invoker-game {
  padding-bottom: 25px;
}

// .center-column {
//   min-height: calc(100vh - 6em);
//   max-height: 1000px;
// }
</style>