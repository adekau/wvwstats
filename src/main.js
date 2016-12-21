import Vue from 'vue'
import Resource from 'vue-resource'
import { sync } from 'vuex-router-sync'
import store from './store'
import router from './router'
import App from './components/App.vue'

// Google charts
window.google.charts.load('current', {
  'packages': ['corechart', 'line']
})

// install resource, for http requests
Vue.use(Resource)

const app = new Vue({
  router: router,
  store: store,
  el: "#app",
  template: "<App/>",
  components: { App }
})

window.google.charts.setOnLoadCallback(() => {
  app.$store.commit('SET_CHARTSLOADED')
})

function update_10s () {
  app.$store.dispatch('FETCH_WORLDS')
  app.$store.dispatch('FETCH_MATCHES')
}

function update_1m () {
  app.$store.dispatch('FETCH_GLICKO') // does this really need to be here? could be done once maybe.
  app.$store.dispatch('FETCH_PREDICTEDGLICKO')
  app.$store.dispatch('FETCH_LEADERBOARD')
}

update_10s()
update_1m()
app.$store.dispatch('FETCH_OBJECTIVES')
setInterval(update_10s, 10000)
setInterval(update_1m, 60000)

export { app, router, store }
