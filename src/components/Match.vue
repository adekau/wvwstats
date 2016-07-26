<template>
  <div class="mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--12-col mdl-grid">

    <div v-if="!isValidMatch"
      class="mdl-shadow--2dp mdl-color--blue-grey-100 mdl-cell mdl-cell--12-col mdl-grid">
      Match {{$route.params.matchid}} does not exist.
    </div>

    <div v-if="!dataReady"
      class="mdl-shadow--2dp mdl-color--blue-grey-100 mdl-cell mdl-cell--12-col mdl-grid">
      Data is loading...
    </div>

    <matchheading v-if="isValidMatch && dataReady"></matchheading>

    <scoredetails v-if="isValidMatch && dataReady" :matchinfo="match" :worldlist="worldlist"
      :officialglicko="officialglicko"></scoredetails>

    <matchkd v-if="isValidMatch && dataReady" :match="match" :worldlist="worldlist"></matchkd>

    <matchpoints v-if="isValidMatch && dataReady" :match="match" :worldlist="worldlist"></matchpoints>

    <matchmapskd v-if="isValidMatch && dataReady" v-for="map in match.maps"
      :match="match" :worldlist="worldlist" :mapid="map"></matchmapskd>

    <div v-if="isValidMatch"
      class="mdl-shadow--2dp mdl-color--blue-grey-100 mdl-cell mdl-cell--12-col mdl-grid">
      <chart v-if='dataReady'
        chartname="ppt" chartdata="ppt" :match='match' :worldlist='worldlist'
        chartheight="360px" charttitle="PPT Evolution"></chart>

    </div>

    <div v-if="isValidMatch"
      class="mdl-shadow--2dp mdl-color--blue-grey-100 mdl-cell mdl-cell--12-col mdl-grid">
      <chart v-if='dataReady'
        chartname="scores" chartdata="scores" :match='match' :worldlist='worldlist'
        chartheight="360px" charttitle="Score Evolution"></chart>

    </div>
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
  import Chart from './Chart.vue'

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
        // TODO change this when updating the store...
        if (this.data) {
          setTimeout(() => {
            this.redrawChartData()
          }, 500)
        }
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
              return ret
            }
          }
        }
        return ret
      },

      dataReady () {
        console.log(this.worldlist)
        return (this.worldlist !== [] && this.matches !== []
          && this.worldlist[1] !== null && this.worldlist[1] !== undefined
          && this.matches[1] !== null && this.matches[1] !== undefined)
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
      Matchmapskd,
      Chart
    }

  }
</script>
