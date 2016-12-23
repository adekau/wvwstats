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

const HomepageComponent = resolve => require(['../components/Homepage.vue'], resolve)
const EUMatchesComponent = resolve => require(['../components/EUMatches.vue'], resolve)
const MapPageComponent = resolve => require(['../components/MapPage.vue'], resolve)
const LeaderboardComponent = resolve => require(['../components/Leaderboard.vue'], resolve)
const TimezonesComponent = resolve => require(['../components/Timezones.vue'], resolve)
const WorldTimezoneStatsComponent = resolve => require(['../components/WorldTimezoneStats.vue'], resolve)
const MatchComponent = resolve => require(['../components/Match.vue'], resolve)
const GrapherComponent = resolve => require(['../components/Grapher.vue'], resolve)
const AboutComponent = resolve => require(['../components/About.vue'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/na',
      component: HomepageComponent,
      meta: {
        pageTitle: 'North American Matches',
        region: '1-'
      }
    }, {
      path: '/eu',
      component: EUMatchesComponent,
      meta: {
        pageTitle: 'European Matches',
        region: '2-'
      }
    }, {
      path: '/map',
      component: MapPageComponent,
      meta: {
        pageTitle: 'Live Map'
      }
    }, {
      path: '/map/:server',
      component: MapPageComponent,
      meta: {
        pageTitle: 'Live Map'
      }
    }, {
      path: '/leaderboard',
      component: LeaderboardComponent,
      meta: {
        pageTitle: 'Leaderboard'
      }
    }, {
      path: '/match/:matchid',
      component: MatchComponent,
      meta: {
        pageTitle: 'Match Details'
      }
    }, {
      path: '/grapher',
      component: GrapherComponent,
      meta: {
        pageTitle: 'Grapher'
      }
    }, {
      path: '/timezones',
      component: TimezonesComponent,
      meta: {
        pageTitle: 'Timezone Ranks'
      }
    }, {
      path: '/timezones/:server',
      component: WorldTimezoneStatsComponent,
      meta: {
        pageTitle: 'Server Timezone Stats'
      }
    }, {
      path: '/about',
      component: AboutComponent,
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
  ],

  scrollBehavior: () => {
    return {x:0,y:0}
  }
  // scrollBehavior (to, from, savedPosition) {
  //   console.log('is this even doing stuff')
  //   console.log(savedPosition)
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // }
})
