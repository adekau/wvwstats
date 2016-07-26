<template>
  <div v-mdl class="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
    <header class="demo-drawer-header">
    <header class="demo-drawer-header" style="text-align: center;">
      <img class="logo" src="/static/img/logo.png">
      <span>WvW Stats</span>
    </header>
    </header>
    <nav v-mdl class="demo-navigation mdl-navigation mdl-color--blue-grey-800">
      <a v-link="{ path: '/na' }" class="mdl-navigation__link"><i class="mdl-color-text--blue-grey-400 material-icons"
                                                 role="presentation">list</i>NA Matches</a>
      <a v-link="{ path: '/eu' }" class="mdl-navigation__link"><i class="mdl-color-text--blue-grey-400 material-icons"
                                                 role="presentation">list</i>EU Matches</a>
      <a href="{{mapUrl}}" class="mdl-navigation__link"><i class="mdl-color-text--blue-grey-400 material-icons"
                                                 role="presentation">autorenew</i>Live</a>
      <a v-link="{ path: '/leaderboard' }" class="mdl-navigation__link"><i class="mdl-color-text--blue-grey-400 material-icons"
                                                 role="presentation">format_list_numbered</i>Leaderboard</a>
      <a v-link="{ path: '/grapher', query: grapherQuery }" class="mdl-navigation__link"><i class="mdl-color-text--blue-grey-400 material-icons"
                                                 role="presentation">trending_up</i>Grapher</a>
      <div class="mdl-layout-spacer"></div>
      <a v-link="{ path: '/about' }" class="mdl-navigation__link"><i class="mdl-color-text--blue-grey-400 material-icons"
                                                 role="presentation">info</i>About</a>
    </nav>
  </div>
</template>

<script>
  import store from '../store'

  export default {
    data () {
      return {
        selectedWorld: 0,
        grapherQuery: {server: null, data: null}
      }
    },

    created () {
      this.selectedWorld = store.fetchSelectedWorld()
      this.grapherQuery = store.fetchGrapherQuery()

      store.on('selectedWorld-updated', this.update)
      store.on('grapherQuery-updated', this.updateGQ)
    },

    destroyed () {
      store.removeListener('selectedWorld-updated', this.update)
      store.removeListener('grapherQuery-updated', this.updateGQ)
    },

    computed: {
      mapUrl () {
        if (this.selectedWorld == 0) {
          return '#/map'
        } else {
          return '#/map/' + this.selectedWorld
        }
      }
    },

    methods: {
      update () {
        this.selectedWorld = store.fetchSelectedWorld()
      },

      updateGQ () {
        this.grapherQuery = store.fetchGrapherQuery()
      }
    }
  }
</script>

<style>
  .logo {
    height: 87px;
    width: 89px;
    margin: 0 auto;
  }
</style>
