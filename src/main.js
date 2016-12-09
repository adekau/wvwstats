import Vue from 'vue'
import Resource from 'vue-resource'
import { sync } from 'vuex-router-sync'
import store from './store'
import router from './router'
import App from './components/App.vue'

// Google charts
window.google.charts.load('current', {
  'packages': ['corechart', 'line']
});

// install resource, for http requests
Vue.use(Resource)

const app = new Vue({
  router: router,
  store: store,
  el: "#app",
  template: "<App/>",
  components: { App }
})

app.$store.dispatch('FETCH_WORLDS');
app.$store.dispatch('FETCH_MATCHES');
app.$store.dispatch('FETCH_GLICKO');
app.$store.dispatch('FETCH_PREDICTEDGLICKO');

export { app, router, store }
