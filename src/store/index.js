import { EventEmitter } from 'events'
import { Promise } from 'es6-promise'
import Firebase from 'firebase'
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
  store.updateObjectives()
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

 store.updateObjectives = () => {
   var requestIds = ''
   for (var id in objectiveIds) {
     requestIds += objectiveIds[id] + ','
   }
   console.log(requestIds)
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
