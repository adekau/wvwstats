import Vue from 'vue'
import * as Const from './const'

export function fetchMatches () {
  return new Promise((resolve, reject) => {
    Vue.http.get(Const.matchesUrl).then((response) => {
      const matches = response.data
      resolve(matches)
    }, () => {
      reject()
    })
  })
}

export function fetchWorlds () {
  return new Promise((resolve, reject) => {
    Vue.http.get(Const.worldsUrl).then((response) => {
      const worlds = response.data
      resolve(worlds)
    }, () => {
      reject()
    })
  })
}

export function fetchGlicko () {
  return new Promise((resolve, reject) => {
    Vue.http.get(Const.glickoUrl).then((response) => {
      const glicko = {}
      for (var i = 0; i < response.data.length; i++) {
        let curGlicko = response.data[i]
        glicko[response.data[i].id] = response.data[i].glicko
      }
      resolve(glicko)
    }, () => {
      reject()
    })
  })
}

export function fetchPredictedGlicko () {
  return new Promise((resolve, reject) => {
    Vue.http.get(Const.predictedGlickoUrl).then((response) => {
      const pglicko = response.data
      resolve(pglicko)
    }, () => {
      reject()
    })
  })
}
