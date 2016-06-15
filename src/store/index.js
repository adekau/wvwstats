import { EventEmitter } from 'events'
import { Promise } from 'es6-promise'
import Vue from 'vue'

const store = new EventEmitter()
const matchesUrl = 'https://api.guildwars2.com/v2/wvw/matches?ids=all'
let matchesCache = Object.create(null)

export default store

console.log(Vue.http)

Vue.http.get(matchesUrl).then(function (response) {
  matchesCache = response.data
  store.emit('matches-updated')
})

var matchTimer = setInterval(() => {
  Vue.http.get(matchesUrl).then((response) => {
    matchesCache = response.data
    store.emit('matches-updated')
  })
}, 10000)

store.fetchMatches = () => {
  return matchesCache
}

/**
 * Fetch an item data with given id.
 *
 * @param {Number} id
 * @return {Promise}
 */

store.fetchItem = id => {
  return new Promise((resolve, reject) => {
    if (itemsCache[id]) {
      resolve(itemsCache[id])
    } else {
      api.child('item/' + id).once('value', snapshot => {
        const story = itemsCache[id] = snapshot.val()
        resolve(story)
      }, reject)
    }
  })
}

/**
 * Fetch the given list of items.
 *
 * @param {Array<Number>} ids
 * @return {Promise}
 */

store.fetchItems = ids => {
  if (!ids || !ids.length) {
    return Promise.resolve([])
  } else {
    return Promise.all(ids.map(id => store.fetchItem(id)))
  }
}

/**
 * Fetch items for the given page.
 *
 * @param {Number} page
 * @return {Promise}
 */

store.fetchItemsByPage = page => {
  const start = (page - 1) * storiesPerPage
  const end = page * storiesPerPage
  const ids = topStoryIds.slice(start, end)
  return store.fetchItems(ids)
}

/**
 * Fetch a user data with given id.
 *
 * @param {Number} id
 * @return {Promise}
 */

store.fetchUser = id => {
  return new Promise((resolve, reject) => {
    api.child('user/' + id).once('value', snapshot => {
      resolve(snapshot.val())
    }, reject)
  })
}
