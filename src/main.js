import Vue from 'vue'
import Resource from 'vue-resource'
import { sync } from 'vuex-router-sync'
import store from './store'
import router from './router'
import App from './components/App.vue'
// import { domain, fromNow } from './filters'

// Google charts
window.google.charts.load('current', {
  'packages': ['corechart', 'line']
});

// install resource, for http requests
Vue.use(Resource)

// register filters globally
// Vue.filter('fromNow', fromNow)
// Vue.filter('domain', domain)
//
// Vue.directive('progress', {
//   bind: function () {},
//   update: function (value, old) {
//     // The directive may be called before the element have been upgraded
//     window.componentHandler.upgradeElement(this.el)
//     this.el.MaterialProgress.setProgress(value)
//   }
// })

// Vue.directive('mdl', {
//   bind: function () {
//     window.componentHandler.upgradeElement(this.el)
//   }
// })

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

/**
 * uncomment if want page to go back to top..
 * TODO: Maybe animate this?
 */

/*router.afterEach(function () {
  console.log('hi')
  var _router_el = document.getElementById('router_view')
  _router_el.scrollTop = 0
})*/
