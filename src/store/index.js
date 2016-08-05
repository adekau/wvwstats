import { EventEmitter } from 'events'
import { Promise } from 'es6-promise'
// import Firebase from 'firebase'
import Vue from 'vue'

const store = new EventEmitter()

/**
 * Constants
 */
 const objectiveIds = [
   '94-35', '95-35', '96-35', '94-32', '95-32', '96-32', '94-33', '95-33', '96-33',
   '94-34', '95-34', '96-34', '94-36', '95-36', '96-36', '94-37', '95-37', '96-37',
   '94-38', '95-38', '96-38', '94-39', '95-39', '96-39', '94-40', '95-40', '96-40',
   '94-50', '95-50', '96-50', '94-51', '95-51', '96-51', '94-52', '95-52', '96-52',
   '94-53', '95-53', '96-53', '38-1', '38-2', '38-3', '38-4', '38-5', '38-6',
   '38-7', '38-8', '38-9', '38-10', '38-11', '38-12', '38-13', '38-14', '38-15',
   '38-16', '38-17', '38-18', '38-19', '38-20', '38-21', '38-22'
 ]

/**
 * URLs for API Requests
 */
const matchesUrl = 'https://api.guildwars2.com/v2/wvw/matches?ids=all'
const worldsUrl = 'https://api.guildwars2.com/v2/worlds?ids=all'
const objectivesUrl = 'https://api.guildwars2.com/v2/wvw/objectives?ids='
const guildUrl = 'https://api.guildwars2.com/v1/guild_details.json?guild_id='
const glickoUrl = 'http://www.wvwstats.com/api/v1/officialglicko'
const predictedGlickoUrl = 'http://www.wvwstats.com/api/v1/predictedglicko'
const weekleaderboardUrl = 'http://www.wvwstats.com/api/v1/weekleaderboard'
const matcharchiveUrl = 'http://www.wvwstats.com/api/v1/matcharchive'
const timezonesUrl = 'http://www.wvwstats.com/api/v1/timezones'

/**
 * Local Cache variables
 */
var selectedWorld = 0
var matchesCache = []
var worldsCache = []
var glickoCache = {}
var predictedGlickoCache = {}
var objectiveCache = []
var guildCache = {}
var weekleaderboardCache = {}
var timezoneCache = []
var googleChartsLoaded = false
var grapherQuery = {
  server: null,
  data: null
}

// ------- BEGIN STORE.
export default store

/**
 * Initial Updaters
 */
var initialUpdate = setTimeout(function () {
  store.updateMatches()
  store.updateWorlds()
  store.updateGlicko()
  store.updateObjectives()
  store.updateWeekleaderboard()
  store.updatePredictedGlicko()
}, 1)
/**
 * Google Charts loader
 */
window.google.charts.setOnLoadCallback(() => {
  googleChartsLoaded = true
  store.emit('charts-loaded')
});
/**
 * Update timers
 */
var matchUpdateTimer = setInterval(function () {
  store.updateMatches()
}, 10000)

var weekleaderboardUpdateTimer =  setInterval(function () {
  store.updateWeekleaderboard()
  store.updatePredictedGlicko()
}, 60000)

/**
 * Updater Functions
 */
 store.updateMatches = () => {
   Vue.http.get(matchesUrl).then((response) => {
     matchesCache = response.data
     store.emit('matches-updated')
   }, (response) => {
     store.updateMatches()
   })
 }

 store.updateWorlds = () => {
   Vue.http.get(worldsUrl).then((response) => {
     worldsCache = response.data
     store.emit('worlds-updated')
   }, (response) => {
     store.updateWorlds()
   })
 }

 store.updateGlicko = () => {
  Vue.http.get(glickoUrl).then((response) => {
    for (var i = 0; i < response.data.length; i++) {
      let curGlicko = response.data[i]
      glickoCache[response.data[i].id] = response.data[i].glicko
    }
    store.emit('glicko-updated')
  }, (response) => {
    store.updateGlicko()
  })
 }

 store.updateWeekleaderboard = () => {
   Vue.http.get(weekleaderboardUrl).then( (response) => {
     weekleaderboardCache = response.data
     store.emit('weekleaderboard-updated')
   }, (response) => {
     store.updateWeekleaderboard()
   })
 }

 store.updatePredictedGlicko = () => {
   Vue.http.get(predictedGlickoUrl).then( (response) => {
     predictedGlickoCache = response.data
     store.emit('predictedGlicko-updated')
   }, (response) => {
     store.updatePredictedGlicko()
   })
 }

 store.updateObjectives = () => {
   var requestIds = ''
   for (var id in objectiveIds) {
     requestIds += objectiveIds[id] + ','
   }

   Vue.http.get(objectivesUrl + requestIds).then((response) => {
     objectiveCache = response.data
     store.emit('objectives-updated')
   }, (response) => {
     store.updateObjectives()
   })
 }

 store.updateSelectedWorld = id => {
   selectedWorld = id
   store.emit('selectedWorld-updated')
 }

 store.updateGrapherQuery = gq => {
   grapherQuery = gq
   store.emit('grapherQuery-updated')
 }

/**
 * Getters used from pages
 */
store.fetchMatches = () => {
  return matchesCache
}

store.fetchWorlds = () => {
  return worldsCache
}

store.fetchGlicko = () => {
  return glickoCache
}

store.fetchObjectives = () => {
  return objectiveCache
}

store.fetchTimezones = (timezone, start_time, callback) => {
  if (timezoneCache.length > 0) {
    callback(timezoneCache)
  } else {
    var url = timezonesUrl + '?start_time=' + start_time + '&timezone=' + timezone
    Vue.http.get(url)
    .then( (response) => {
      timezoneCache = response.data
      callback(timezoneCache)
    })
  }
}

store.fetchObjectiveIds = () => {
  return objectiveIds
}

store.fetchSelectedWorld = () => {
  return selectedWorld
}

store.fetchGrapherQuery = () => {
  return grapherQuery
}

store.fetchPredictedGlicko = () => {
  return predictedGlickoCache
}

store.fetchWeekleaderboard = () => {
  return weekleaderboardCache
}

// TODO: Cache the results..
store.fetchArchiveData = (matchid, data, start_time, end_time) => {
  var diff = 15 // difference in start_time. static variable to account for match start variability
  var tmp = new Date(start_time)
  var tmp2 = new Date(end_time)
  var timeOffset = tmp.getTimezoneOffset() / 60
  start_time = new Date(tmp.getFullYear(), tmp.getMonth(), tmp.getDate(),
    tmp.getHours() - timeOffset, tmp.getMinutes() + diff, tmp.getSeconds()).toISOString()
    .replace('.000Z','Z')
  end_time = new Date(tmp2.getFullYear(), tmp2.getMonth(), tmp2.getDate(),
    tmp2.getHours() - timeOffset, tmp2.getMinutes(), tmp2.getSeconds()).toISOString()
    .replace('.000Z','Z')

  var url = `${matcharchiveUrl}?data=${data}&match=${matchid}&start_time=${start_time}&end_time=${end_time}`
  return Vue.http.get(url)
}

store.fetchGuildById = (id) => {
  return new Promise( (resolve, reject) => {
    if (guildCache[id]) {
      resolve(guildCache[id])
    } else {
      Vue.http.get(guildUrl + id).then((response) => {
        const guild = guildCache[id] = response.data
        resolve(guild)
      }, (response) => {
        reject('Failed to get guild info.')
      })
    }
  })
}

store.fetchGoogleChartsLoaded = () => {
  return googleChartsLoaded
}
