<template>
  <div class="mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--12-col mdl-grid">

    <div v-if="!isValidMatch"
      class="mdl-shadow--2dp mdl-color--blue-grey-100 mdl-cell mdl-cell--12-col mdl-grid">
      Invalid match id
    </div>

    <matchheading v-if="isValidMatch"></matchheading>
    <scoredetails v-if="isValidMatch" :matchinfo="match" :worldlist="worldlist"
      :officialglicko="officialglicko"></scoredetails>

    <!-- Todo: Should change both of these to use computed properties for server name
               to prevent them from occasionally being blank on page load when
               it takes awhile to fetch worldlist -->
    <matchkd :match="match" :worldlist="worldlist"></matchkd>
    <matchpoints :match="match" :worldlist="worldlist"></matchpoints>
    <matchmapskd v-for="map in match.maps"
      :match="match" :worldlist="worldlist" :mapid="map"></matchmapskd>

  </div>
</template>

<style>
  li.list_header {
    font-weight: bold;
    line-height: 28px;
  }

  .servername {
    display: flex;
  }

  .servername span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

<script>
  import store from '../store'
  import Scoredetails from './Scoredetails.vue'
  import Matchheading from './Matchheading.vue'
  import Matchkd from './Matchkd.vue'
  import Matchpoints from './Matchpoints.vue'
  import Matchmapskd from './Matchmapskd.vue'

  export default {
    data () {
      return {
        worldlist: [],
        matchId: 0,
        matches: [],
        match: {},
        officialglicko: {}
      }
    },

    route: {
      data ({ to }) {
        return {
          worldlist: store.fetchWorlds(),
          matchId: this.$route.params.matchid,
          matches: store.fetchMatches(),
          officialglicko: store.fetchGlicko()
        }
      }
    },

    created () {
      store.on('matches-updated', this.updateMatches)
      store.on('matches-updated', this.updateWorlds)
      store.on('glicko-updated', this.updateGlicko)
    },

    destroyed () {
      store.destroyed('matches-updated', this.updateMatches)
      store.destroyed('matches-updated', this.updateWorlds)
      store.destroyed('glicko-updated', this.updateGlicko)
    },

    methods: {
      updateMatches () {
        this.matches = store.fetchMatches()
      },

      updateWorlds () {
        this.worldlist = store.fetchWorlds()
      },

      updateGlicko () {
        this.officialglicko = store.fetchGlicko()
      },

      getWorldById (id) {
        for (var i = 0; i < this.worldlist.length; i++) {
          let curWorld = this.worldlist[i]
          if(curWorld.id === id) {
            return curWorld
          }
        }
        return
      }
    },

    computed: {
      isValidMatch () {
        var ret = false;
        if (this.matches !== [] && this.matches !== undefined) {
          for (var i = 0; i < this.matches.length; i++) {
            if (this.matches[i].id === this.matchId) {
              this.match = this.matches[i]
              ret = true
              console.log(ret)
              return ret
            }
          }
        }
        console.log(ret)
        return ret
      }
    },

    filters: {
      round: function (value, accuracy, keep) {
        if (typeof value !== 'number') return value

        var fixed = value.toFixed(accuracy)

        return keep ? fixed : +fixed
      }

    },

    components: {
      Scoredetails,
      Matchheading,
      Matchkd,
      Matchpoints,
      Matchmapskd
    }

  }
</script>
