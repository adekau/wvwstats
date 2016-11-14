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
import Grapher from './components/Grapher.vue'
import Timezones from './components/Timezones.vue'
import WorldTimezoneStats from './components/WorldTimezoneStats.vue'
import About from './components/About.vue'
import Embed from './components/Embed.vue'

// Google charts
window.google.charts.load('current', {
  'packages': ['corechart', 'line']
});

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
var router = new Router({
  routes: [{
      path: '/na',
      component: Homepage,
      meta: {
        pageTitle: 'North American Matches',
        region: '1-'
      }
    }, {
      path: '/eu',
      component: EUMatches,
      meta: {
        pageTitle: 'European Matches',
        region: '2-'
      }
    }, {
      path: '/map',
      component: Map,
      meta: {
        pageTitle: 'Live Map'
      }
    }, {
      path: '/map/:server',
      component: Map,
      meta: {
        pageTitle: 'Live Map'
      }
    }, {
      path: '/leaderboard',
      component: Leaderboard,
      meta: {
        pageTitle: 'Leaderboard'
      }
    }, {
      path: '/match/:matchid',
      component: Match,
      meta: {
        pageTitle: 'Match Details'
      }
    }, {
      path: '/grapher',
      component: Grapher,
      meta: {
        pageTitle: 'Grapher'
      }
    }, {
      path: '/timezones',
      component: Timezones,
      meta: {
        pageTitle: 'Timezone Ranks'
      }
    }, {
      path: '/timezones/:server',
      component: WorldTimezoneStats,
      meta: {
        pageTitle: 'Server Timezone Stats'
      }
    }, {
      path: '/about',
      component: About,
      meta: {
        pageTitle: 'About WvWStats'
      }
    }, {
      path: '/embed',
      component: Embed,
      meta: {
        pageTitle: 'Embed WvWStats'
      }
    }, {
      path: '*',
      redirect: '/na'
    }
  ]})

  var app = new Vue({
    el: '#app',
    router: router,
    render: h => h('router-view')
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
