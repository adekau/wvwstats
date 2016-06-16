import { EventEmitter } from 'events'
import { Promise } from 'es6-promise'
import Firebase from 'firebase'
import Vue from 'vue'

const store = new EventEmitter()
/**
 * URLs for API Requests
 */
const matchesUrl = 'https://api.guildwars2.com/v2/wvw/matches?ids=all'
const worldsUrl = 'https://api.guildwars2.com/v2/worlds?ids=all'
let api = new Firebase('http://project-4821868053848732451.firebaseio.com')
/**
 * Local Cache variables
 */
let matchesCache = []
let worldsCache = []
let glickoCache = {}

// ------- BEGIN STORE.
export default store

/**
 * Initial Updaters
 */
var initialUpdate = setTimeout(function () {
  store.updateMatches()
  store.updateWorlds()
  store.updateGlicko()
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

 store.updateGlicko = () => {
   var ref = api.child('official_glicko')
   ref.once('value', (snapshot) => {
     glickoCache = snapshot.val()
     store.emit('glicko-updated')
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

store.fetchGlicko = () => {
  return glickoCache
}
