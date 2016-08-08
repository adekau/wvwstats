<template>
  <div class="mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--12-col mdl-grid">
    <h4 class="mdl-color-text--blue-grey-600 mdl-cell--12-col"
      style="margin-left: 6px; border-bottom: 1px solid grey;">
      Timezone Ranks
    </h4>
    <p style="margin-left: 8px; margin-bottom: 0;">
      NA-EST and EU timezones do not generate on Fridays. Data resets with the North American WvW Reset.
      After reset, the first timezone that will generate is NA-PST at 2:00 am Eastern Standard Time.
      Click on a server name to view kill, death, and score totals for each timezone.
    </p>
    <h4 class="mdl-color-text--blue-grey-600 mdl-cell--12-col"
      style="margin-left: 6px; border-bottom: 1px solid grey;">
      North America
    </h4>
    <table class="ratings mdl-cell mdl-cell--12-col mdl-data-table mdl-shadow--2dp
      mdl-cell--4-col-phone mdl-cell--8-col-tablet">
      <thead>
        <tr>
          <th class="mdl-data-table__cell--non-numeric">Server</th>
          <th v-for="column in columns">
            <a v-on:click="sortBy(column, 'na')">{{column | format}}</a>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="server in naRanksByServer | orderBy sortKey reverse">
          <td class="mdl-data-table__cell--non-numeric" data-label="Server">
            <a :href="'#/timezones/' + server.server" class="tzlink">
              {{getWorldById(server.server).name}}
            </a>
          </td>
          <td data-label="NA EST">{{server['na_est'] | rank}}</td>
          <td data-label="NA PST">{{server['na_pst'] | rank}}</td>
          <td data-label="EU">{{server['eu'] | rank}}</td>
          <td data-label="OCX">{{server['ocx'] | rank}}</td>
          <td data-label="SEA">{{server['sea'] | rank}}</td>
        </tr>
        <tr v-if="noData">
          <td colspan="6"
            class="mdl-data-table__cell--non-numeric">
            Data not available yet. EU and NA-EST timezones do not generate on Fridays.
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mdl-color-text--blue-grey-600 mdl-cell--12-col"
      style="margin-left: 6px; border-bottom: 1px solid grey;">
      Europe
    </h4>
    <table class="ratings mdl-cell mdl-cell--12-col mdl-data-table mdl-shadow--2dp
      mdl-cell--4-col-phone mdl-cell--8-col-tablet">
      <thead>
        <tr>
          <th class="mdl-data-table__cell--non-numeric">Server</th>
          <th v-for="column in columns">
            <a v-on:click="sortBy(column, 'eu')">{{column | format}}</a>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="server in euRanksByServer | orderBy sortKeyEU reverseEU">
          <td class="mdl-data-table__cell--non-numeric" data-label="Server">
            <a :href="'#/timezones/' + server.server" class="tzlink">
              {{getWorldById(server.server).name}}
            </a>
          </td>
          <td data-label="NA EST">{{server['na_est'] | rank}}</td>
          <td data-label="NA PST">{{server['na_pst'] | rank}}</td>
          <td data-label="EU">{{server['eu'] | rank}}</td>
          <td data-label="OCX">{{server['ocx'] | rank}}</td>
          <td data-label="SEA">{{server['sea'] | rank}}</td>
        </tr>
        <tr v-if="noData">
          <td colspan="6"
            class="mdl-data-table__cell--non-numeric">
            Data not available yet. EU and NA-EST timezones do not generate on Fridays.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import store from '../store'

  export default {
    data () {
      return {
        sortKey: 'na_est',
        sortKeyEU: 'eu',
        reverse: 1,
        reverseEU: 1,
        columns: ['na_est', 'na_pst', 'eu', 'ocx', 'sea'],
        matches: [],
        timezones: [],
        worldlist: []
      }
    },

    ready () {
      if (this.matches.length > 0) {
        store.removeListener('matches-updated', this.updateMatches)

        var oldest_date = this.matches[0].start_time
        for (var i = 1; i < this.matches.length; i++) {
          var st = this.matches[i].start_time
          if (st < oldest_date) {
            oldest_date = st
          }
        }
        store.fetchTimezones('all', oldest_date , (tz) => {
          this.timezones = tz
        })
      }
    },

    route: {
      data ({ to }) {
        return {
          matches: store.fetchMatches(),
          worldlist: store.fetchWorlds()
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
      updateMatches () {
        this.matches = store.fetchMatches()
        store.removeListener('matches-updated', this.updateMatches)
        var oldest_date = this.matches[0].start_time
        for (var i = 1; i < this.matches.length; i++) {
          var st = this.matches[i].start_time
          if (st < oldest_date) {
            oldest_date = st
          }
        }
        store.fetchTimezones('all', oldest_date , (tz) => {
          this.timezones = tz
        })
      },

      updateWorlds () {
        this.worldlist = store.fetchWorlds()
      },
      /**
       * getWorldById
       * id: world's id
       * returns the world object of the form: {id: _, name: _, population: _}
       */
      getWorldById (id) {
        for (var i = 0; i < this.worldlist.length; i++) {
          let curWorld = this.worldlist[i]
          if(curWorld.id == id) {
            return curWorld
          }
        }
        return
      },

      getRanksByTimezone (tz, region) {
        var obj = this.byTimezone[tz]
        var arr = []
        var ret = {}

        Object.keys(obj).forEach( (key) => {
          if (parseInt(key) > region * 1000 && parseInt(key) < (region + 1) * 1000) {
            arr.push({
              world: key,
              metric: obj[key]
            })
          }
        })

        arr.sort( (a, b) => {
          return b.metric - a.metric
        })

        for (var i = 0; i < arr.length; i++) {
          var cur = arr[i]
          ret[cur.world] = i + 1
        }

        return ret
      },

      sortBy (sortKey, region) {
        if (region === 'na') {
          this.reverse = (this.sortKey == sortKey) ? -1 * this.reverse : 1;
          this.sortKey = sortKey;
        } else {
          this.reverseEU = (this.sortKeyEU == sortKey) ? -1 * this.reverseEU : 1;
          this.sortKeyEU = sortKey;
        }
      }
    },

    computed: {

      byTimezone() {
        // Alias to force this to be computed.
        var tz = this.timezones
        var tmp = {}
        var ret = {}

        for (var i = 0; i < tz.length; i++) {
          // See if the timezone key exists in the tmp object, if not create it
          // as a blank object. (will store world ids as keys)
          var c_tz = tz[i].timezone.trim()
          if (!tmp[c_tz]) {
            tmp[c_tz] = {}
            ret[c_tz] = {}
          }
          // Loop through each object's data and push the individual server info
          // into the server's key (type: array)
          for (var z = 0; z < tz[i].data.length; z++) {
            var cur = tz[i].data[z]
            if (!tmp[c_tz][cur.world]) {
              tmp[c_tz][cur.world] = []
              ret[c_tz][cur.world] = 0
              tmp[c_tz][cur.world].push(cur)
              ret[c_tz][cur.world] = tmp[c_tz][cur.world]
                .reduce((acc, obj) => {
                  return acc + obj.metric
                }, 0)
            } else {
              tmp[c_tz][cur.world].push(cur)
              ret[c_tz][cur.world] = tmp[c_tz][cur.world]
                .reduce((acc, obj) => {
                  return acc + obj.metric
                }, 0)

            }
          }
        }

        return ret
      },

      naRanksByServer () {
        var tz = this.byTimezone
        var ret = {}

        Object.keys(tz).forEach( (tz_key) => {
          var response = this.getRanksByTimezone(tz_key, 1)
          Object.keys(response).forEach( (key) => {
            if(!ret[key]) {
              ret[key] = {server: key}
              ret[key][tz_key] = response[key]
            } else {
              ret[key][tz_key] = response[key]
            }
          })
        })
        return ret
      },

      euRanksByServer () {
        var tz = this.byTimezone
        var ret = {}

        Object.keys(tz).forEach( (tz_key) => {
          var response = this.getRanksByTimezone(tz_key, 2)
          Object.keys(response).forEach( (key) => {
            if(!ret[key]) {
              ret[key] = {server: key}
              ret[key][tz_key] = response[key]
            } else {
              ret[key][tz_key] = response[key]
            }
          })
        })
        return ret
      },

      noData () {
        return this.timezones.length === 0
      }

    },

    filters: {
      format (value) {
        return value.replace('_', ' ').toUpperCase()
      },

      rank (value) {
        if (value === undefined || value === null) {
          return '-'
        }
        var j = value % 10,
        k = value % 100;
        if (j == 1 && k != 11) {
          return value + "st";
        }
        if (j == 2 && k != 12) {
          return value + "nd";
        }
        if (j == 3 && k != 13) {
          return value + "rd";
        }
        return value + "th";
      },
    }
  }

</script>

<style>
  .tzlink {
    color: black;
  }
</style>
