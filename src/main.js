import Vue from 'vue'
import Resource from 'vue-resource'
import store from './store'
import router from './router'
import App from './components/App.vue'
import { sync } from 'vuex-router-sync'

sync(store, router)

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

router.beforeEach((to, from, next) => {
  var tooltips = document.getElementsByClassName("is-active");
  for (var i = 0; i < tooltips.length; i++) {
    tooltips[i].className = "mdl-tooltip"
  }
  next()
})

window.google.charts.setOnLoadCallback(() => {
  app.$store.commit('SET_CHARTSLOADED')
})

function update_10s () {
  app.$store.dispatch('FETCH_MATCHES')
}

function update_1m () {
  app.$store.dispatch('FETCH_GLICKO') // does this really need to be here? could be done once maybe.
  app.$store.dispatch('FETCH_PREDICTEDGLICKO')
  app.$store.dispatch('FETCH_LEADERBOARD')
}

// Get worlds only once. Shouldn't need to update every 10s.
app.$store.dispatch('FETCH_WORLDS')
update_10s()
update_1m()
app.$store.dispatch('FETCH_OBJECTIVES')
setInterval(update_10s, 10000)
setInterval(update_1m, 60000)

export { app, router, store }
