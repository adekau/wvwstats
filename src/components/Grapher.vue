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
        queryServer: null,
        queryData: null,
        // chartHeight: 500,
        availableXAxis: [
          'kills',
          'deaths',
          'scores',
          'ppt',
          'camps',
          'towers',
          'keeps',
          'castles',
          'k/d',
          'activity (k+d)'
        ]
      }
    },

    ready () {
      this.setInput()
    },

    route: {
      data({ to }) {
        const server = to.query.server
        const data = to.query.data

        setTimeout(this.setInput, 30)

        return {
          matches: store.fetchMatches(),
          worldlist: store.fetchWorlds(),
          queryServer: server,
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
        store.removeListener('matches-updated', this.updateMatches)
      },

      updateWorlds() {
        this.worldlist = store.fetchWorlds()
        this.setInput()
        store.removeListener('worlds-updated', this.updateWorlds)
      },

      setInput() {
        if (this.worldlist === null || this.worldlist[1] === undefined) {
          return
        } else {
          if (this.queryServer !== null) {
            this.selectedWorld = this.getWorldById(this.queryServer).name
          }

          if( this.queryData !== null) {
            this.selectedData = this.queryData
          }
        }
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
        var gq = {
          'server': this.getWorldByName(val).id,
          'data': this.selectedData
        }

        store.updateGrapherQuery(gq)

        this.$router.go({
          path: '/grapher',
          query: gq
        })
      },

      'selectedData': function (val, oldVal) {
        var gq = {
          'server': this.selectedWorld !== null ? this.getWorldByName(this.selectedWorld).id : null,
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
