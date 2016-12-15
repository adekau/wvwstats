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
    objectives: []
  },

  // Actions
  actions: {
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
    }
  },

  getters: {
    objectiveIds () {
      return Const.objectiveIds
    }
  }
})

export default store
