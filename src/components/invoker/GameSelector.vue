<template>
  <div>
    <h4 class="text-center">{{ $t('Select the game mode') }}</h4>
    <div class="row mode complete-m" @click="selectMode(CompleteGameMode)">
      <div class="col-3 flex justify-center items-center">
        <div class="icon-row">
          <q-icon class="g-mode-icon" name="fas fa-trophy" color="red" />
        </div>
      </div>
      <div class="col">
        <div class="title">{{ $t('Survival') }}</div>
        <div class="text">{{ $t('Use the ability or combo shown before the time runs out!') }}</div>
      </div>
    </div>
    <div class="row mode ten-m" @click="selectMode(TenGameMode)">
      <div class="col-3 flex justify-center items-center">
        <div class="icon-row">
          <q-icon class="g-mode-icon" name="fas fa-hourglass-half" color="blue" />
        </div>
      </div>
      <div class="col">
        <div class="title">{{ $t('Ability spree') }}</div>
        <div class="text">{{ $t('Use all ten abilities as fast a possible') }}</div>
      </div>
    </div>
    <div class="row mode train-m" @click="selectMode(TrainingGameMode)">
      <div class="col-3 flex justify-center items-center">
        <div class="icon-row">
          <q-icon class="g-mode-icon" name="fas fa-dumbbell" color="green" />
        </div>
      </div>
      <div class="col">
        <div class="title">{{ $t('Training') }}</div>
        <div class="text">{{ $t('Train with spells without limit time') }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  CompleteGameMode,
  TenGameMode,
  TrainingGameMode,
  StartedStatus,
} from 'src/components/invoker/GameModes.ts';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'StartPlaceHolder',
  data() {
    return {
      CompleteGameMode,
      TenGameMode,
      TrainingGameMode,
    };
  },
  methods: {
    ...mapActions('InvokerGame', ['setGameStatus', 'setGameMode']),
    selectMode(mode: string) {
      // this.$emit('mode-selected', mode);
      this.setGameStatus(StartedStatus);
      this.setGameMode(mode);
    },
  },
});
</script>

<style lang="scss" scoped>
@import 'src/css/app.scss';

.mode {
  border: 2px solid white;
  padding: 0.5em;
  margin-bottom: 2em;
  cursor: pointer;
  user-select: none;

  &.complete-m {
    border-color: $complete-mode;
    &:hover {
      border-color: $complete-mode-dark;
    }

    &:active {
      border-color: $complete-mode-light;
    }
  }

  &.ten-m {
    border-color: $ten-mode;
    &:hover {
      border-color: $ten-mode-dark;
    }

    &:active {
      border-color: $ten-mode-light;
    }
  }

  &.train-m {
    border-color: $train-mode;
    &:hover {
      border-color: $train-mode-dark;
    }

    &:active {
      border-color: $train-mode-light;
    }
  }

  .icon-row {
    padding-right: 0.5em;

    .g-mode-icon {
      font-size: 2em;
    }
  }

  .title {
    text-align: center;
    font-weight: bold;
    font-size: 1.2em;
    margin-bottom: 0.2em;
  }
}
</style>