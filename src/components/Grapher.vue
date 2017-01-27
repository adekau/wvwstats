<template>
  <div class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid">
    <div style='margin-bottom: 5px; display: block;'>
      <label for='worldSelect'>Server: &nbsp;</label>
      <select id='worldSelect' v-model="selectedWorld" :disabled="worldlist.length === 0">
        <option v-for="world in sorted_worldlist">
          {{world.name}}
        </option>
      </select>
      &nbsp;
      <label for='dataSelect'>Data: &nbsp;</label>
      <select id='dataSelect' v-model="selectedData">
        <option v-for="item in availableXAxis">
          {{item}}
        </option>
      </select>
      <!-- &nbsp;
      <label for='chartHeight'>Chart Height: &nbsp;</label>
      <input id='chartHeight' v-model='chartHeight' /> -->
    </div>

    <chart chartname='grapher' chartheight='500px' :chartdata='selectedData'
      :match='currentMatch' :worldlist='worldlist'></chart>

    <h4 class="mdl-color-text--blue-grey-600 mdl-cell--12-col"
      style="margin-left: 6px; border-bottom: 1px solid grey;">
      Grapher Information
    </h4>
    <p style="margin-left: 8px; margin-bottom: 0;">
      Click and drag over an area of the chart data to zoom in.
      Right click on the chart to reset to the full view.
    </p>
  </div>
</template>

<script>
  import Chart from './Chart.vue'
  export default {
    name: 'Grapher',

    data () {
      return {
        selectedWorld: null,
        selectedData: null,
        queryWorld: null,
        queryData: null,
        matches: [],
        // chartHeight: 500,
        availableXAxis: [
          'kills',
          'deaths',
          'k/d',
          'activity (k+d)',
          'ppt',
          'scores',
          'Score from PPK (as percent)',
          'Score from PPT (as percent)',
          'Score from PPT',
          'camps',
          'towers',
          'keeps',
          'castles',
          'glicko',
          'glicko change'
        ]
      }
    },

    beforeRouteEnter (to, from, next) {
      const server = to.query.server
      const data = to.query.data

      if (server === undefined || data === undefined) {
        next(vm => {
          vm.queryWorld = null
          vm.queryData = null
        })
      } else {
        next (vm => {
          vm.queryWorld = server
          vm.queryData = data
        })
      }
    },

    beforeMount () {
      this.$store.dispatch('FETCH_MATCHES').then(() => {
        this.matches = this.$store.state.matches
      })
    },

    methods: {
      getWorldByName (name) {
        name = name.trim()
        for (var i = 0; i < this.worldlist.length; i++) {
          let curWorld = this.worldlist[i]
          if(curWorld.name === name) {
            return curWorld
          }
        }
        return
      },

      getWorldById (id) {
        for (var i = 0; i < this.worldlist.length; i++) {
          let curWorld = this.worldlist[i]
          if(curWorld.id == id) {
            return curWorld
          }
        }
        return
      }
    },

    computed: {
      worldlist () {
        return this.$store.state.worlds
      },

      cSelectedWorld () {
        var squery = this.$route.query.server
        var sdata = this.$route.query.data
        // Do selected data here as well.
        if (this.selectedData === null) {
          if (sdata !== null && sdata !== undefined) {
            this.selectedData = sdata
          }
        }
        if (this.selectedWorld === null) {
          if (squery !== null && squery !== undefined) {
            this.selectedWorld = squery
            return squery
          } else {
            return null
          }
        } else {
          if (squery !== null && squery !== undefined) {
            this.selectedWorld = squery
            return squery
          } else {
            return this.selectedWorld
          }
        }
      },

      /**
       * worldMatchIds
       * Loops through each match and assembles an object by world id with what
       * match that server is in.
       */
      worldMatchIds () {
        var ret = {}

        if(!this.matches) {
            return ret
        }

        for (var i = 0; i < this.matches.length; i++) {
          let matchId = this.matches[i].id
          let matchServers = this.matches[i].all_worlds

          Object.keys(matchServers).forEach((key) => {
            var serversArray = matchServers[key]
            for(var server in serversArray) {
              ret[serversArray[server]] = matchId
            }
          })
        }
        return ret
      },

      /**
       * currentMatchId
       * using worldMatchIds, finds the current match id of the selected world.
       */
      currentMatchId () {
        var server = this.cSelectedWorld
        if (server === undefined || server === null || this.worldlist.length === 0) {
          return
        }
        var id = this.getWorldByName(server).id
        return this.worldMatchIds[id]
      },

      /**
       * currentMatch
       * using the currentMatchId, find the match object in the matches array.
       */
       currentMatch () {
         var cMatchId = this.currentMatchId
         for (var i = 0; i < this.matches.length; i++) {
           var match = this.matches[i]
           if (cMatchId === match.id) {
             return match
           }
         }
         return
       },

       sorted_worldlist () {
         return _.sortBy(this.worldlist, ['name'])
       }
    },

    watch: {
      'selectedWorld': function (val, oldVal) {
        if (val === undefined || val === null) {
          return
        }

        var gq = {
          'server': this.selectedWorld,
          'data': this.selectedData
        }

        this.$store.dispatch('UPDATE_GRAPHERQUERY', {
          grapherQuery: gq
        })

        this.$router.push({
          path: '/grapher',
          query: gq
        })
      },

      'selectedData': function (val, oldVal) {
        if (val === undefined || val === null) {
          return
        }

        var gq = {
          'server': this.selectedWorld,
          'data': this.selectedData
        }

        this.$store.dispatch('UPDATE_GRAPHERQUERY', {
          grapherQuery: gq
        })

        this.$router.push({
          path: '/grapher',
          query: gq
        })
      }
    },

    components: {
      Chart
    }
  }
</script>
