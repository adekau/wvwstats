<template>
  <!-- North America Matches -->
  <div class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid"
    :class="{ loading: !matches.length }">
    <!-- <h3>NA Matches</h3> -->
    <matchheading></matchheading>
    <scoredetails v-for="match in matches
      | filterBy region in 'id'
      | orderBy 'id'"
      :matchinfo="match"
      :worldlist="worldlist" :officialglicko="officialglicko"></scoredetails>

      <h4 class="mdl-color-text--blue-grey-600 mdl-cell--12-col"
        style="margin-left: 6px; border-bottom: 1px solid grey;">
        Ratings
      </h4>

      <table class="mdl-cell mdl-cell--12-col mdl-data-table mdl-shadow--2dp
        mdl-cell--4-col-phone mdl-cell--8-col-tablet">
        <thead>
          <tr>
            <th>Rank</th>
            <th class="mdl-data-table__cell--non-numeric">Server</th>
            <th>Old Rating</th>
            <th>New Rating</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="server in servers
            | orderBy 'predicted' -1">
            <td data-label="Rank">
              {{$index + 1}}
            </td>
            <td class="mdl-data-table__cell--non-numeric" data-label="Server">
              {{server.name}}
            </td>
            <td data-label="Old Rating">
              {{server.official | round 3 true}}
            </td>
            <td data-label="New Rating">
              {{server.predicted | round 3 true}}
            </td>
            <td data-label="Change" class="{{server.textclass}}">
              {{server.predicted - server.official | round 3 true}}
            </td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
  import store from '../store'
  import Scoredetails from './Scoredetails.vue'
  import Matchheading from './Matchheading.vue'

  export default {
    data() {
      return {
        region: '1-',
        matches: [],
        worldlist: [],
        officialglicko: {},
        predictedglicko: {},
        servers: []
      }
    },

    route: {
      data ({ to }) {
        const region = to.region
        return {
          region: region,
          matches: store.fetchMatches(),
          worldlist: store.fetchWorlds(),
          officialglicko: store.fetchGlicko(),
          predictedglicko: store.fetchPredictedGlicko()
        }
      }
    },

    created () {
      store.on('matches-updated', this.update)
      store.on('worlds-updated', this.updateWorlds)
      store.on('glicko-updated', this.updateGlicko)
      store.on('predictedGlicko-updated', this.updatePredictedGlicko)
    },

    destroyed () {
      store.removeListener('matches-updated', this.update)
      store.removeListener('worlds-updated', this.updateWorlds)
      store.removeListener('glicko-updated', this.updateGlicko)
      store.removeListener('predictedGlicko-updated', this.updatePredictedGlicko)
    },

    computed: {
      worldsById () {
        let ret = {}
        for (let i = 0; i < this.worldlist.length; i++) {
          let id = this.worldlist[i].id
          ret[id] = this.worldlist[i]
        }
        return ret
      }
    },

    methods: {
      update () {
        this.matches = store.fetchMatches()
      },

      updateWorlds () {
        this.worldlist = store.fetchWorlds()
      },

      updateGlicko () {
        this.officialglicko = store.fetchGlicko()
      },

      updatePredictedGlicko () {
        this.predictedglicko = store.fetchPredictedGlicko()
        this.updateTableData()
      },

      updateTableData () {
        let glicko = this.officialglicko
        let pglicko = this.predictedglicko
        let ret = []

        Object.keys(glicko).forEach( (key) => {
          if (key < 2000 && pglicko[key]) {
            let startGlicko = glicko[key].rating
            let curGlicko = pglicko[key]
            let textclass = (curGlicko - startGlicko) >= 0 ?
              'glicko-up' : 'glicko-down'
            ret.push({
              name: this.worldsById[key].name,
              official: startGlicko,
              predicted: curGlicko,
              textclass: textclass
            })
          }
        })
        this.servers = ret
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
      Matchheading,
      Scoredetails
    }
  }
</script>

<style>
  .loading:after {
    content: "Loading...";
    padding-top: 12px;
    padding-bottom: 12px;
    display: inline-block;
    margin: auto;
    text-align: center;
    position: relative;
    left: 10px;
    font-size: 20px;
  }

  .glicko-up {
    color: rgb(89,170,91);
    font-weight: bold;
  }
  .glicko-down {
    color: rgb(182, 89, 91);
    font-weight: bold;
  }

  tbody tr:nth-child(even) {
    background-color: rgb(248,248,248);
  }

  @media only screen and (max-width: 575px) {

    table, thead, tbody, th, td, tr {
        display: block;
    }

    thead {
      display: none;
    }

    /*mdl */

    .mdl-data-table tbody tr {
      height: auto;
    }

    .mdl-data-table tbody tr:nth-child(even) {
      background-color: #eee;
    }

    .mdl-data-table td,
    .mdl-data-table td:first-of-type {
      padding-left: 50%;
    }

    .mdl-data-table__cell--non-numeric {
      text-align: right !important;
    }

    .mdl-data-table td:before {
      position: absolute;
      top: 6px;
      left: 6px;
      width: 45%;
      padding: 6px 18px 0;
      white-space: nowrap;
      content: attr(data-label);
      text-align: left;
      color: rgba(0, 0, 0, 0.541176);
      font-weight: bold;
      font-family: Helvetica, Arial, sans-serif;
      font-size: 12px;
    }

    .mdl-data-table td:last-of-type {
      padding-right: 18px;
    }
  }
</style>
