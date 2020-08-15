import { GameModeType, UnstartedStatus, GameStatusType } from 'src/components/invoker/GameModes.ts'

const state = {
  gameStatus: UnstartedStatus as GameStatusType,
  gameMode: null as null | GameModeType
};

type stateType = typeof state;

const getters = {}

const mutations = {
  resetGame: (state: stateType) => {
    state.gameStatus = UnstartedStatus;
    state.gameMode = null;
  },
  setgameStatus: (state: stateType, data: GameStatusType) => {
    state.gameStatus = data;
  },
  setGameMode: (state: stateType, data: GameModeType) => {
    state.gameMode = data;
  },
}

const actions = {
  resetGame: ({ commit }: { commit: Function }) => commit('resetGame'),
  setGameStatus: ({ commit }: { commit: Function }, data: GameStatusType) => commit('setgameStatus', data),
  setGameMode: ({ commit }: { commit: Function }, data: GameModeType) => commit('setGameMode', data),
}

const module = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default module;