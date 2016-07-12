import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
// import { domain, fromNow } from './filters'
import App from './components/App.vue'
import Homepage from './components/Homepage.vue'
import EUMatches from './components/EUMatches.vue'
import Map from './components/Map.vue'
import Leaderboard from './components/Leaderboard.vue'
import Match from './components/Match.vue'

// install router
Vue.use(Router)
// install resource, for http requests
Vue.use(Resource)

// register filters globally
// Vue.filter('fromNow', fromNow)
// Vue.filter('domain', domain)

Vue.directive('progress', {
  bind: function () {},
  update: function (value, old) {
    // The directive may be called before the element have been upgraded
    window.componentHandler.upgradeElement(this.el)
    this.el.MaterialProgress.setProgress(value)
  }
})

Vue.directive('mdl', {
  bind: function () {
    window.componentHandler.upgradeElement(this.el)
  }
})

// routing
var router = new Router({hashbang: false})

router.map({
  '/na': {
    component: Homepage,
    pageTitle: 'North American Matches',
    region: '1-'
  },
  '/eu': {
    component: EUMatches,
    pageTitle: 'European Matches',
    region: '2-'
  },
  '/map': {
    component: Map,
    pageTitle: 'Live Map'
  },
  '/map/:server': {
    component: Map,
    pageTitle: 'Live Map'
  },
  '/leaderboard': {
    component: Leaderboard,
    pageTitle: 'Leaderboard'
  },
  '/match/:matchid': {
    component: Match,
    pageTitle: 'Match Details'
  }
})

/**
 * uncomment if want page to go back to top..
 * TODO: Maybe animate this?
 */

/*router.afterEach(function () {
  console.log('hi')
  var _router_el = document.getElementById('router_view')
  _router_el.scrollTop = 0
})*/

router.redirect({
  '*': '/na'
})

router.start(App, '#app')
