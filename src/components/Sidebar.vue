<template>
  <div class="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
    <header class="demo-drawer-header">
    <header class="demo-drawer-header" style="text-align: center;">
      <img class="logo" src="/static/img/logo.png">
      <span>WvW Stats</span>
    </header>
    </header>
    <nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800">

      <router-link to='/na' class="mdl-navigation__link">
        <i class="mdl-color-text--blue-grey-400 material-icons"
          role="presentation">
          list
        </i>
        NA Matches
      </router-link>

      <router-link to='/eu' class="mdl-navigation__link">
        <i class="mdl-color-text--blue-grey-400 material-icons"
          role="presentation">
          list
        </i>
        EU Matches
      </router-link>

      <router-link :to="'/map/' + selectedWorld " class="mdl-navigation__link">
        <i class="mdl-color-text--blue-grey-400 material-icons"
          role="presentation">
          autorenew
        </i>
        Live Map
      </router-link>

      <router-link to='/leaderboard' class="mdl-navigation__link">
        <i class="mdl-color-text--blue-grey-400 material-icons"
          role="presentation">
          format_list_numbered
        </i>
        Leaderboard
      </router-link>

      <!--TODO: Get the grapher query thing back into this.-->
      <router-link :to="{ path: '/grapher', query: grapherQuery }"
        class="mdl-navigation__link">
        <i class="mdl-color-text--blue-grey-400 material-icons"
          role="presentation">
          trending_up
        </i>
        Grapher
      </router-link>

      <router-link to='/timezones' class="mdl-navigation__link">
        <i class="mdl-color-text--blue-grey-400 material-icons"
          role="presentation">
          schedule
        </i>
        Timezones
      </router-link>


      <router-link :to="'/history/' + server" class="mdl-navigation__link">
        <i class="mdl-color-text--blue-grey-400 material-icons"
          role="presentation">
          history
        </i>
        Match History
      </router-link>

      <router-link to='/embed' class="mdl-navigation__link">
        <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">
          web
        </i>
        Embed
      </router-link>

      <div class="mdl-layout-spacer"></div>

      <router-link to='/about' class="mdl-navigation__link">
        <i class="mdl-color-text--blue-grey-400 material-icons"
          role="presentation">
          info
        </i>
        About
      </router-link>

    </nav>
  </div>
</template>

<script>
  export default {
    data () { return {} },

    computed: {
      selectedWorld () {
        return this.$store.state.selectedWorld
      },

      grapherQuery () {
        return this.$store.state.grapherQuery
      },

      server () {
        return this.$store.state.activeServer === null
          ? 'All'
          : this.$store.state.activeServer
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
