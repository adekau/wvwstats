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

export function fetchObjectives () {
  var requestIds = ''
  for (var id in Const.objectiveIds) {
    requestIds += Const.objectiveIds[id] + ','
  }

  return new Promise((resolve, reject) => {
    Vue.http.get(Const.objectivesUrl + requestIds).then((response) => {
      const objectives = response.data
      resolve(objectives)
    }, () => {
      reject()
    })
  })
}

export function fetchGuild (id) {
  return new Promise((resolve, reject) => {
    Vue.http.get(Const.guildUrl + id).then((response) => {
      const guild = response.data
      resolve(guild)
    }, () => {
      reject()
    })
  })
}

export function fetchLeaderboard () {
  return new Promise((resolve, reject) => {
    Vue.http.get(Const.weekleaderboardUrl).then((response) => {
      const leaderboard = response.data
      resolve(leaderboard)
    }, () => {
      reject()
    })
  })
}

export function fetchArchiveData (matchid, data, start_time, end_time) {
  var diff = 15 // difference in start_time. static variable to account for match start variability
  var tmp = new Date(start_time)
  var tmp2 = new Date(end_time)
  var timeOffset = 4
  start_time = new Date(tmp.getFullYear(), tmp.getMonth(), tmp.getDate(),
    tmp.getHours() - timeOffset, tmp.getMinutes() + diff, tmp.getSeconds()).toISOString()
    .replace('.000Z','Z')
  end_time = new Date(tmp2.getFullYear(), tmp2.getMonth(), tmp2.getDate(),
    tmp2.getHours() - timeOffset, tmp2.getMinutes(), tmp2.getSeconds()).toISOString()
    .replace('.000Z','Z')

  var url = `${Const.matcharchiveUrl}?data=${data}&match=${matchid}&start_time=${start_time}&end_time=${end_time}`
  return Vue.http.get(url)
}
