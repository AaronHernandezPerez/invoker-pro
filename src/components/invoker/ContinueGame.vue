<template>
  <div class="q-my-lg">
    <div class="row" v-if="gameStatus===FinishedStatus">
      <div class="col-12 col-sm q-ma-sm">
        <q-btn
          :label="$t('Restart')"
          color="negative"
          class="full-width"
          size="lg"
          @click="restart"
        />
      </div>
      <div class="col-12 col-sm q-ma-sm">
        <q-btn
          :label="$t('Back')"
          color="primary"
          class="full-width"
          size="lg"
          @click="resetGame();"
        />
      </div>
    </div>
    <div v-else-if="gameStatus===StartedStatus" class="flex justify-center items-center">
      <q-btn :label="$t('Stop')" color="primary" @click="stopGame();" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import {
  StartedStatus,
  FinishedStatus,
} from 'src/components/invoker/GameModes.ts';

export default Vue.extend({
  name: 'ContinueGame',
  data() {
    return {
      StartedStatus,
      FinishedStatus,
    };
  },
  computed: {
    ...mapState('InvokerGame', ['gameStatus']),
  },
  methods: {
    ...mapActions('InvokerGame', ['resetGame', 'setGameStatus']),
    restart() {
      return this.setGameStatus(this.StartedStatus);
    },
    stopGame() {
      return this.setGameStatus(this.FinishedStatus);
    },
  },
});
</script>

<style lang="scss" scoped>
</style>