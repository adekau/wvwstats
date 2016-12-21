import Vue from 'vue'
import Router from 'vue-router'

// components
import Homepage from '../components/Homepage.vue'
import EUMatches from '../components/EUMatches.vue'
import MapPage from '../components/MapPage.vue'
import Leaderboard from '../components/Leaderboard.vue'
import Match from '../components/Match.vue'
import Grapher from '../components/Grapher.vue'
import Timezones from '../components/Timezones.vue'
import WorldTimezoneStats from '../components/WorldTimezoneStats.vue'
import About from '../components/About.vue'
import Embed from '../components/Embed.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
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
      component: MapPage,
      meta: {
        pageTitle: 'Live Map'
      }
    }, {
      path: '/map/:server',
      component: MapPage,
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
  ]
})
