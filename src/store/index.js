import Vue from 'vue'
import Vuex from 'vuex'
import * as api from './api'

Vue.use(Vuex)

const store = new Vuex.Store({

  // State
  state: {
    matches: [],
    worlds: [],
    glicko: {},
    predictedglicko: {}
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
    }
  }
  // getters can go here...
})

export default store
