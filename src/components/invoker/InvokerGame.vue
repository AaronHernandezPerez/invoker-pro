<template>
  <div class="row invoker-game">
    <div class="col-12 col-md-3 q-px-md q-mt-md q-mt-md-none">
      <q-card class="q-py-md">
        <q-card-section>
          <InvokerGuide />
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12 col-md-6 q-px-md q-mt-md q-mt-md-none last-sm">
      <q-card class="q-py-md">
        <q-card-section>
          <div v-if="gameStatus !== UnstartedStatus">
            <h4 class="text-center q-mt-none">{{ $t('Invoke these spells') }}</h4>
            <div class="flex justify-around items-center" v-if="randomSpells">
              <InvokerSpell
                v-for="(spell, i) in randomSpells"
                :key="spell.name"
                class="random-spell"
                :spell="spell"
                :disabled="i !== randomSpellsIndex"
              />
            </div>

            <q-linear-progress
              class="q-my-lg"
              stripe
              size="1.5em"
              :value="spellTimePercentage"
              v-if="gameMode === CompleteGameMode"
            >
              <div class="absolute-full flex flex-center">
                <q-badge color="primary" :label="spellTime" />
              </div>
            </q-linear-progress>

            <h5
              class="text-center flex justify-center items-center q-my-lg"
              v-else-if="gameMode === TenGameMode"
            >
              {{ $t('Your time') }}
              <q-badge class="q-ml-md time-badge" color="primary">{{spellTime}}</q-badge>
            </h5>
            <continue-game></continue-game>
          </div>

          <GameSelector v-else-if="gameStatus === UnstartedStatus" @mode-selected="startGame" />

          <InvokerSkillBar
            :InvokerPrimarySpells="InvokerPrimarySpells"
            :usedSpellStack="usedSpellStack"
            :gameStatus="gameStatus"
            @skill-press="handleKeypress"
          >
            <div class="q-my-xl flex no-wrap justify-around items-center q-gutter-md">
              <div>
                <InvokerSpell :spell="InvokerPrimarySpells[spellStack.data[0]]" border="round" />
              </div>
              <div>
                <InvokerSpell :spell="InvokerPrimarySpells[spellStack.data[1]]" border="round" />
              </div>
              <div>
                <InvokerSpell :spell="InvokerPrimarySpells[spellStack.data[2]]" border="round" />
              </div>
            </div>
          </InvokerSkillBar>
          <div ref="scrollTarget"></div>
          <!-- <div id="sound-preload">
            <audio v-for="sound in sounds" preload="auto" :key="sound">
              <source :src="sound" :type="'audio/' + sound.split('.').pop()" />
            </audio>
          </div>-->
        </q-card-section>
      </q-card>
    </div>

    <div class="col-12 col-md-3 q-px-md q-mt-md q-mt-md-none">
      <q-card class="q-py-md">
        <q-card-section>
          <h5 class="text-center q-mt-none q-mb-md">{{ $t('Statistics') }}</h5>
          <div>{{ $t('Played') }}: {{playedTotal}}</div>
          <div>{{ $t('Points') }}: {{points}}</div>
          <div>{{ $t('Failed') }}: {{playedFailed}}</div>
        </q-card-section>
      </q-card>

      <q-card class="q-mt-lg">
        <q-card-section>
          <h5 class="text-center q-mt-none q-mb-md">{{ $t('Spells time') }}</h5>
          <div>
            {{ $t('Last') }}:
            <AnimatedNumber :value="lastSpellTime" :formatValue="formatTime" :duration="300" />
            <span style="margin-left: 4px">s</span>
          </div>
          <div>
            {{ $t('Average') }}:
            <AnimatedNumber :value="averageSpellTime" :formatValue="formatTime" :duration="300" />
            <span style="margin-left: 4px">s</span>
          </div>
          <div>
            {{ $t('Fastest') }}:
            <AnimatedNumber :value="fastestSpellTime" :formatValue="formatTime" :duration="300" />
            <span style="margin-left: 4px">s</span>
          </div>
          <div>
            {{ $t('Slowest') }}:
            <AnimatedNumber :value="slowestSpellTime" :formatValue="formatTime" :duration="300" />
            <span style="margin-left: 4px">s</span>
          </div>
        </q-card-section>
      </q-card>

      <q-card class="q-mt-lg">
        <q-card-section>
          <h5 class="text-center q-mt-none q-mb-md">{{ $t('Options') }}</h5>
          <div>
            <q-checkbox left-label v-model="vibration" :label="$t('Vibration')" />
          </div>
          <div class="flex items-center">
            {{ $t('Sound volume') }}
            <div class="flex-grow q-px-sm">
              <q-slider
                class="q-ml-sm"
                v-model="audioVolume"
                :max="100"
                :min="0"
                :step="5"
                label
                :label-value="audioVolume + '%'"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/unbound-method */
import Vue, { VueConstructor } from 'vue';
import InvokerSpell from 'components/invoker/InvokerSpell.vue';
import InvokerGuide from 'components/invoker/InvokerGuide.vue';
import InvokerSkillBar from 'components/invoker/InvokerSkillBar.vue';
import GameSelector from 'src/components/invoker/GameSelector.vue';
import AnimatedNumber from 'animated-number-vue';
import ContinueGame from 'src/components/invoker/ContinueGame.vue';
import Stack from 'src/classes/Stack';
import Timer from 'easytimer';

import { mapState, mapActions } from 'vuex';
import { shuffle, vibrate } from 'src/services/AuxFunctions.ts';
import {
  CompleteGameMode,
  TenGameMode,
  TrainingGameMode,
  UnstartedStatus,
  StartedStatus,
  FinishedStatus,
} from 'src/components/invoker/GameModes.ts';

import {
  InvokerPrimarySpellType,
  InvokerPrimarySpells,
  InvokerCombinedSpells,
  InvokerCombinedSpellsCombos,
  CombinedSpellType,
  InvokerCombinedSpellType,
  InvokerSpellsTime,
} from 'components/invoker/Spells';
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

export default (Vue as VueConstructor<
  Vue & {
    $refs: {
      scrollTarget: HTMLScriptElement;
    };
  }
>).extend({
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

    let vibration = this.$q.localStorage.getItem('vibration');
    if (vibration === null) {
      vibration = true;
    }

    const AllSpells = Object.values(InvokerCombinedSpells).map((e) => [e]);
    AllSpells.push(...InvokerCombinedSpellsCombos);
    const CombinedSpells = Object.values(InvokerCombinedSpells).map((e) => [e]);

    return {
      // Invoker Spells
      InvokerPrimarySpells,
      InvokerCombinedSpells,
      // Parsed spells for the player
      AllSpells,
      CombinedSpells,
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
      points: 0,
      playedFailed: 0,
      spellTime: null as null | string,
      spellTimePercentage: 1 as number,
      // Player options
      audioVolume: parseInt(localStorage.audioVolume) || 100,
      vibration,
      // Game status
      UnstartedStatus,
      StartedStatus,
      FinishedStatus,
      // Game modes
      CompleteGameMode,
      TenGameMode,
      // Sounds
      sounds: {
        invoke: require('src/assets/audio/invoke.wav'),
        oof: require('src/assets/audio/oof.mp3'),
        // fail:  require('src/assets/audio/fail.mp3')
      },
    };
  },
  computed: {
    ...mapState('InvokerGame', ['gameStatus', 'gameMode']),
    defaultKeybindings(): { [index: string]: string } {
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
    lastSpellTime(): number {
      let returnVal = 0;
      if (this.allSpellTimes.length > 0) {
        returnVal = this.allSpellTimes[this.allSpellTimes.length - 1];
      }

      return returnVal;
    },
    averageSpellTime(): number {
      let returnVal = 0;
      if (this.allSpellTimes.length > 0) {
        returnVal =
          this.allSpellTimes.reduce((a, b) => a + b, 0) /
          this.allSpellTimes.length;
      }

      return returnVal;
    },
    fastestSpellTime() {
      let returnVal = 0;
      if (this.allSpellTimes.length > 0) {
        returnVal = Math.min.apply(null, this.allSpellTimes);
      }

      return returnVal;
    },
    slowestSpellTime() {
      let returnVal = 0;
      if (this.allSpellTimes.length > 0) {
        returnVal = Math.max.apply(null, this.allSpellTimes);
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
          path = this.sounds.invoke;
          break;
        case 'fail':
          path = this.sounds.oof;
          break;
          2;
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
          this.points++;
          if (this.lastSpellDate) {
            const now = new Date();
            const time = (now.getTime() - this.lastSpellDate.getTime()) / 1000;
            this.allSpellTimes.push(time);
            this.lastSpellDate = now;
          }
          if (this.randomSpellsIndex === this.randomSpells.length) {
            this.selectRandomSpells();
          }
        } else {
          this.playedFailed++;
          if (this.points > 0) {
            this.points--;
          }
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
        vibrate();
      }
    },
    handleKeypress(e: { key: string }) {
      if (this.gameStatus !== StartedStatus) {
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
    completeSpellTimer() {
      this.timer.stop();
      this.timer = new Timer();
      let spellsTimeIndex = 0;
      if (this.randomSpells && this.randomSpells.length > 0) {
        spellsTimeIndex = this.randomSpells.length - 1;
      }
      let totalTime = InvokerSpellsTime[spellsTimeIndex];
      if (this.$q.platform.is.mobile) {
        totalTime *= 2;
      }
      this.timer.start({
        precision: 'secondTenths',
        startValues: { seconds: totalTime },
        target: { seconds: 0 },
        countdown: true,
      });

      this.timer.addEventListener('secondTenthsUpdated', () => {
        const TimeValues = this.timer.getTimeValues();
        const TimeLeft = parseFloat(
          `${TimeValues.seconds}.${TimeValues.secondTenths}`
        );

        this.spellTime = TimeLeft.toFixed(1);
        this.spellTimePercentage = TimeLeft / totalTime;
      });

      this.timer.addEventListener('targetAchieved', () => {
        this.endGame();
      });
    },
    tenSpellTimer() {
      this.timer.stop();
      this.timer = new Timer();
      this.timer.start({
        precision: 'secondTenths',
        target: { seconds: 60 },
      });

      this.timer.addEventListener('secondTenthsUpdated', () => {
        const TimeValues = this.timer.getTimeValues();
        const TimePassed = parseFloat(
          `${TimeValues.seconds}.${TimeValues.secondTenths}`
        );
        this.spellTime = TimePassed.toFixed(1);
      });

      this.timer.addEventListener('targetAchieved', () => {
        this.endGame();
      });
    },
    selectRandomSpells() {
      this.playedTotal++;
      this.randomSpellsIndex = 0;

      const setAllSpells = () => {
        if (this.spellIndex === 0) {
          shuffle(this.AllSpells);
        } else if (this.spellIndex === this.AllSpells.length) {
          shuffle(this.AllSpells);
          this.spellIndex = 0;
        }
        this.randomSpells = this.AllSpells[this.spellIndex];
      };

      switch (this.gameMode) {
        case CompleteGameMode:
          setAllSpells();
          // Set Timer
          this.completeSpellTimer();
          break;
        case TenGameMode:
          if (this.spellIndex === 0) {
            shuffle(this.CombinedSpells);
            this.tenSpellTimer();
          } else if (this.spellIndex === this.CombinedSpells.length) {
            return this.endGame();
          }
          this.randomSpells = this.CombinedSpells[this.spellIndex];
          break;
        case TrainingGameMode:
          setAllSpells();
          break;

        default:
          break;
      }
      this.spellIndex++;
      this.lastSpellDate = new Date();
    },
    startGame() {
      this.selectRandomSpells();
    },
    endGame() {
      this.setGameStatus(FinishedStatus);
    },
    resetGameData() {
      this.playedTotal = 0;
      this.points = 0;
      this.playedFailed = 0;
      this.spellIndex = 0;
      this.randomSpells = null;
      this.allSpellTimes = [];
      this.lastSpellDate = null;
      this.usedSpellStack = [];
      this.spellStack.clear();
    },
    formatTime(t: number): string {
      const formatedT = t.toFixed(3);
      return formatedT;
    },
  },
  watch: {
    gameStatus(newV) {
      switch (newV) {
        case StartedStatus:
          this.resetGameData();
          this.startGame();
          break;
        case FinishedStatus:
          this.timer.stop();
          this.randomSpellsIndex = -1;
          break;
        default:
          break;
      }

      this.$refs.scrollTarget.scrollIntoView({ behavior: 'smooth' });
    },
    audioVolume(newV) {
      localStorage.audioVolume = newV;
    },
    vibration(newV) {
      this.$q.localStorage.set('vibration', newV);
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

.time-badge {
  height: 1.2em;
  font-size: 1em;
}

#sound-preload {
  visibility: none;
  height: 0px;
}
</style>