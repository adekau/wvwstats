<template>
  <div v-mdl class="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
    <header class="demo-drawer-header">
    <header class="demo-drawer-header" style="text-align: center;">
      <img class="logo" src="../assets/logo.png">
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
      <a v-link="{ path: '/ratings' }" class="mdl-navigation__link"><i class="mdl-color-text--blue-grey-400 material-icons"
                                                 role="presentation">format_list_numbered</i>Ratings</a>
      <a v-link="{ path: '/predictions' }" class="mdl-navigation__link"><i class="mdl-color-text--blue-grey-400 material-icons"
                                                 role="presentation">help_outline</i>Predictions</a>
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
        selectedWorld: 0
      }
    },

    created () {
      this.selectedWorld = store.fetchSelectedWorld()
      store.on('selectedWorld-updated', this.update)
    },

    destroyed () {
      store.removeListener('selectedWorld-updated', this.update)
    },

    computed: {
      mapUrl () {
        if (this.selectedWorld == 0) {
          return '/map'
        } else {
          return '/map/' + this.selectedWorld
        }
      }
    },

    methods: {
      update () {
        this.selectedWorld = store.fetchSelectedWorld()
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
