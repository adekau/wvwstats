import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
// import { domain, fromNow } from './filters'
import App from './components/App.vue'
import Homepage from './components/Homepage.vue'
import Map from './components/Map.vue'

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
    component: Homepage,
    pageTitle: 'European Matches',
    region: '2-'
  },
  '/map': {
    component: Map,
    pageTitle: 'Live Map'
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/na'
})

router.start(App, '#app')
