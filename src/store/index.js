import { EventEmitter } from 'events'
import { Promise } from 'es6-promise'
import Vue from 'vue'

const store = new EventEmitter()
/**
 * URLs for API Requests
 */
const matchesUrl = 'https://api.guildwars2.com/v2/wvw/matches?ids=all'
const worldsUrl = 'https://api.guildwars2.com/v2/worlds?ids=all'

/**
 * Local Cache variables
 */
let matchesCache = []
let worldsCache = []

// ------- BEGIN STORE.
export default store

/**
 * Initial Updaters
 */
var initialUpdate = setTimeout(function () {
  store.updateMatches()
  store.updateWorlds()
}, 1)

/**
 * Update timers
 */
var matchUpdateTimer = setInterval(function () {
  store.updateMatches()
}, 10000)

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
/**
 * Getters used from pages
 */
store.fetchMatches = () => {
  return matchesCache
}

store.fetchWorlds = () => {
  return worldsCache
}
