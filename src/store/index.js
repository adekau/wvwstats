import Vue from 'vue'
import Vuex from 'vuex'
import * as api from './api'
import * as Const from './const'

Vue.use(Vuex)

const store = new Vuex.Store({

  // State
  state: {
    matches: [],
    worlds: [],
    glicko: {},
    predictedglicko: {},
    objectives: [],
    guilds: {},
    leaderboard: {},
    chartsLoaded: false,
    selectedWorld: ''
  },

  // Actions
  actions: {
    UPDATE_SELECTEDWORLD: ({ commit }, { selectedWorld }) => {
      commit('SET_SELECTEDWORLD', { selectedWorld })
    },

    FETCH_MATCHES: ({ commit }) => {
      return api.fetchMatches()
        .then(matches => commit('SET_MATCHES', { matches }))
    },

    FETCH_WORLDS: ({ commit }) => {
      return api.fetchWorlds()
        .then(worlds => commit('SET_WORLDS', { worlds }))
    },

    FETCH_GLICKO: ({ commit }) => {
      return api.fetchGlicko()
        .then(glicko => commit('SET_GLICKO', { glicko }))
    },

    FETCH_PREDICTEDGLICKO: ({ commit }) => {
      return api.fetchPredictedGlicko()
        .then(predictedglicko => commit('SET_PREDICTEDGLICKO', { predictedglicko }))
    },

    FETCH_OBJECTIVES: ({ commit }) => {
      return api.fetchObjectives()
        .then(objectives => commit('SET_OBJECTIVES', { objectives }))
    },

    FETCH_GUILD: ({ commit, state }, { id }) => {
      return state.guilds[id]
        ? Promise.resolve(state.guilds[id])
        : api.fetchGuild(id).then(guild => commit('SET_GUILD', { guild }))
    },

    FETCH_LEADERBOARD: ({ commit }) => {
      return api.fetchLeaderboard()
        .then(leaderboard => commit('SET_LEADERBOARD', { leaderboard }))
    },

    FETCH_ARCHIVEDATA: ({ }, { matchid, data, start_time, end_time}) => {
      return api.fetchArchiveData(matchid, data, start_time, end_time)
    }
  },

  // Mutations
  mutations: {
    SET_MATCHES: (state, { matches }) => {
      state.matches = matches
    },

    SET_WORLDS: (state, { worlds }) => {
      state.worlds = worlds
    },

    SET_GLICKO: (state, { glicko }) => {
      state.glicko = glicko
    },

    SET_PREDICTEDGLICKO: (state, { predictedglicko }) => {
      state.predictedglicko = predictedglicko
    },

    SET_OBJECTIVES: (state, { objectives }) => {
      state.objectives = objectives
    },

    SET_GUILD: (state, { guild }) => {
      Vue.set(state.guilds, guild.id, guild)
    },

    SET_SELECTEDWORLD: (state, { selectedWorld }) => {
      state.selectedWorld = selectedWorld
    },

    SET_LEADERBOARD: (state, { leaderboard }) => {
      state.leaderboard = leaderboard
    },

    SET_CHARTSLOADED: (state) => {
      state.chartsLoaded = true
    }
  },

  getters: {
    objectiveIds () {
      return Const.objectiveIds
    }
  }
})

export default store
