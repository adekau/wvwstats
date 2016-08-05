<template>
  <div class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid">
    <div style='margin-bottom: 5px; display: block;'>
      <label for='worldSelect'>Server: &nbsp;</label>
      <select id='worldSelect' v-model="selectedWorld" :disabled="worldlist.length === 0">
        <option v-for="world in worldlist | orderBy 'name'">
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
      :match='currentMatch', :worldlist='worldlist'></chart>

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
  import store from '../store'

  export default {
    data () {
      return {
        matches: [],
        worldlist: [],
        selectedWorld: null,
        selectedData: null,
        queryWorld: null,
        queryData: null,
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

    route: {
      data({ to }) {
        const server = to.query.server
        const data = to.query.data

        return {
          matches: store.fetchMatches(),
          worldlist: store.fetchWorlds(),
          queryWorld: server,
          queryData: data
        }
      }
    },

    created () {
      store.on('matches-updated', this.updateMatches)
      store.on('worlds-updated', this.updateWorlds)
    },

    destroyed () {
      store.removeListener('matches-updated', this.updateMatches)
      store.removeListener('worlds-updated', this.updateWorlds)
    },

    methods: {
      updateMatches() {
        this.matches = store.fetchMatches()
        this.selectedWorld = this.queryWorld
        this.selectedData = this.queryData
        store.removeListener('matches-updated', this.updateMatches)
      },

      updateWorlds() {
        this.worldlist = store.fetchWorlds()
        this.selectedWorld = this.queryWorld
        this.selectedData = this.queryData
        store.removeListener('worlds-updated', this.updateWorlds)
      },

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
        var server = this.selectedWorld
        if (server === undefined || server === null) {
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

        store.updateGrapherQuery(gq)

        this.$router.go({
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

        store.updateGrapherQuery(gq)

        this.$router.go({
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
