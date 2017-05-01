import Vue from 'vue'
import Vuex from 'vuex'
import * as api from './api'
import * as Const from './const'

Vue.use(Vuex)

const store = new Vuex.Store({

  // State
  state: {
    // Predefined state variables
    itemsPerPage: 10,
    chartsLoaded: false,
    selectedWorld: '',
    activeServer: null,
    // To be defined variables
    matches: [],
    worlds: [],
    glicko: {},
    predictedglicko: {},
    objectives: [],
    guilds: {},
    leaderboard: {},
    timezones: {},
    matchHistoryIds: {/*all: [], ...*/},
    matchHistory: {},
    grapherQuery: {}
  },

  // Actions
  actions: {
    UPDATE_SELECTEDWORLD: ({ commit }, { selectedWorld }) => {
      commit('SET_SELECTEDWORLD', { selectedWorld })
    },

    UPDATE_GRAPHERQUERY: ({ commit }, { grapherQuery }) => {
      commit('SET_GRAPHERQUERY', { grapherQuery })
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
    },

    FETCH_TIMEZONE: ({ commit, state }, { timezone_name, start_time }) => {
      return state.timezones[timezone_name]
        ? Promise.resolve(state.timezones[timezone_name])
        : api.fetchTimezone(timezone_name, start_time)
            .then(timezone => commit('SET_TIMEZONE', { timezone, timezone_name }))
    },

    FETCH_MATCHHISTORY_IDS: ({ commit, dispatch, state }, { server }) => {
      commit('SET_ACTIVE_SERVER', { server })
      return state.matchHistoryIds[server]
        ? Promise.resolve(state.matchHistoryIds[server])
          .then(() => dispatch('ENSURE_ACTIVE_MATCHES'))
        : api.fetchMatchHistoryIds(server)
          .then(matchHistoryIds => commit('SET_MATCHHISTORY_IDS', { server, matchHistoryIds }))
          .then(() => dispatch('ENSURE_ACTIVE_MATCHES'))
    },

    ENSURE_ACTIVE_MATCHES: ({ dispatch, getters }) => {
      return dispatch('FETCH_HISTORICAL_MATCHES', {
        ids: getters.activeIds
      })
    },

    FETCH_HISTORICAL_MATCHES: ({ commit, state }, { ids }) => {
      ids = ids.filter(id => {
        const item = state.matchHistory[id]
        return !item
      })

      if (ids.length) {
        return api.fetchMultipleMatches(ids).then((matchHistory) => commit('SET_MATCHHISTORY', { matchHistory }))
      } else {
        return Promise.resolve()
      }
    },

    FETCH_DATA_RANGE: ({ commit, state }, { start, end, match }) => {
      return api.fetchDataRange(start, end, match)
    }
  },

  // Mutations
  mutations: {
    SET_SELECTEDWORLD: (state, { selectedWorld }) => {
      state.selectedWorld = selectedWorld
    },

    SET_GRAPHERQUERY: (state, { grapherQuery }) => {
      state.grapherQuery = grapherQuery
    },

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

    SET_LEADERBOARD: (state, { leaderboard }) => {
      state.leaderboard = leaderboard
    },

    SET_CHARTSLOADED: (state) => {
      state.chartsLoaded = true
    },

    SET_TIMEZONE: (state, { timezone, timezone_name }) => {
      Vue.set(state.timezones, timezone_name, timezone)
    },

    SET_MATCHHISTORY_IDS: (state, { server, matchHistoryIds }) => {
      Vue.set(state.matchHistoryIds, server, matchHistoryIds)
    },

    SET_MATCHHISTORY: (state, { matchHistory }) => {
      matchHistory.forEach(item => {
        if (item) {
          Vue.set(state.matchHistory, item.id, item.match)
        }
      })
    },

    SET_ACTIVE_SERVER: (state, { server }) => {
      state.activeServer = server
    }
  },

  getters: {
    objectiveIds () {
      return Const.objectiveIds
    },

    guildUpgrades () {
      return Const.guildUpgrades
    },

    activePage (state) {
      return Number(state.route.params.page) || 1
    },

    activeIds (state, getters) {
      const { activeServer, itemsPerPage, matchHistoryIds } = state
      const page = getters.activePage
      if (activeServer) {
        const start = (page - 1) * itemsPerPage
        const end = page * itemsPerPage
        return matchHistoryIds[activeServer].slice(start, end)
      } else {
        return []
      }
    },

    activeItems (state, getters) {
      return getters.activeIds.map(id => state.matchHistory[id]).filter(_ => _)
    }
  }
})

export default store
