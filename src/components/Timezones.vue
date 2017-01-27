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
          <th class="mdl-data-table__cell--non-numeric" v-for="column in columns">
            <a v-on:click="sortBy(column, 'na')">{{column | format}}</a>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="server in sortServers(naRanksByServer, 'na')">
          <td class="mdl-data-table__cell--non-numeric" data-label="Server">
            <router-link :to="'timezones/' + server.server" class="tzlink">
              {{getWorldById(server.server).name}}
            </router-link>
            <span class="tierText">- Tier {{serverTier[server.server]}}</span>
          </td>
          <td class="mdl-data-table__cell--non-numeric" data-label="NA EST">
            <b>{{server['na_est'] | rank}}</b>
            <span v-if="byTimezone['na_est']" class="tierText">({{asInt(byTimezone['na_est'][server.server])}})</span>
          </td>
          <td class="mdl-data-table__cell--non-numeric" data-label="NA PST">
            <b>{{server['na_pst'] | rank}}</b>
            <span v-if="byTimezone['na_pst']" class="tierText">({{asInt(byTimezone['na_pst'][server.server])}})</span>
          </td>
          <td class="mdl-data-table__cell--non-numeric" data-label="EU">
            <b>{{server['eu'] | rank}}</b>
            <span v-if="byTimezone['eu']" class="tierText">({{asInt(byTimezone['eu'][server.server])}})</span>
          </td>
          <td class="mdl-data-table__cell--non-numeric" data-label="OCX">
            <b>{{server['ocx'] | rank}}</b>
            <span v-if="byTimezone['ocx']" class="tierText">({{asInt(byTimezone['ocx'][server.server])}})</span>
          </td>
          <td class="mdl-data-table__cell--non-numeric" data-label="SEA">
            <b>{{server['sea'] | rank}}</b>
            <span v-if="byTimezone['sea']" class="tierText">({{asInt(byTimezone['sea'][server.server])}})</span>
          </td>
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
          <th class="mdl-data-table__cell--non-numeric" v-for="column in columns">
            <a v-on:click="sortBy(column, 'eu')">{{column | format}}</a>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="server in sortServers(euRanksByServer, 'eu')">
          <td class="mdl-data-table__cell--non-numeric" data-label="Server">
            <router-link :to="'timezones/' + server.server" class="tzlink">
              {{getWorldById(server.server).name}}
            </router-link>
            <span class="tierText">- Tier {{serverTier[server.server]}}</span>
          </td>
          <td class="mdl-data-table__cell--non-numeric" data-label="NA EST">
            <b>{{server['na_est'] | rank}}</b>
            <span v-if="byTimezone['na_est']" class="tierText">({{asInt(byTimezone['na_est'][server.server])}})</span>
          </td>
          <td class="mdl-data-table__cell--non-numeric" data-label="NA PST">
            <b>{{server['na_pst'] | rank}}</b>
            <span v-if="byTimezone['na_pst']" class="tierText">({{asInt(byTimezone['na_pst'][server.server])}})</span>
          </td>
          <td class="mdl-data-table__cell--non-numeric" data-label="EU">
            <b>{{server['eu'] | rank}}</b>
            <span v-if="byTimezone['eu']" class="tierText">({{asInt(byTimezone['eu'][server.server])}})</span>
          </td>
          <td class="mdl-data-table__cell--non-numeric" data-label="OCX">
            <b>{{server['ocx'] | rank}}</b>
            <span v-if="byTimezone['ocx']" class="tierText">({{asInt(byTimezone['ocx'][server.server])}})</span>
          </td>
          <td class="mdl-data-table__cell--non-numeric" data-label="SEA">
            <b>{{server['sea'] | rank}}</b>
            <span v-if="byTimezone['sea']" class="tierText">({{asInt(byTimezone['sea'][server.server])}})</span>
          </td>
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
  export default {
    data () {
      return {
        sortKey: 'na_est',
        sortKeyEU: 'eu',
        reverse: 1,
        reverseEU: 1,
        columns: ['na_est', 'na_pst', 'eu', 'ocx', 'sea'],
        timezones: []
      }
    },

    mounted () {
      if (this.matches[0] && !this.timezones[0]) {
        var oldest_date = this.matches[0].start_time
        for (var i = 1; i < this.matches.length; i++) {
          var st = this.matches[i].start_time
          if (st < oldest_date) {
            oldest_date = st
          }
        }
        this.$store.dispatch('FETCH_TIMEZONE', {
          timezone_name: 'all',
          start_time: oldest_date
        }).then(() => {
          console.log(this.$store.state.timezones.all)
          this.timezones = this.$store.state.timezones.all
        })
      }
    },

    methods: {
      asInt (number) {
        return parseInt(number)
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
      },

      sortServers (servers, region) {
        var sortkey, reverse
        var serversArr = []
        // Get the right variables depending on region
        if (region === 'na') {
          sortkey = this.sortKey
          reverse = this.reverse
        } else {
          sortkey = this.sortKeyEU
          reverse = this.reverseEU
        }

        Object.keys(servers).forEach((key) => {
          serversArr.push(servers[key])
        })

        serversArr.sort((a, b) => {
          return reverse === 1
            ? a[sortkey] - b[sortkey]
            : b[sortkey] - a[sortkey]
        })

        return serversArr
      }
    },

    computed: {

      worldlist () {
        return this.$store.state.worlds
      },

      matches () {
        return this.$store.state.matches
      },

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

        console.log(ret)
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
      },

      serverTier () {
        var ret = {}
        if (!this.worldlist.length || !this.matches.length) {
          return
        }

        this.matches.forEach((match) => {
          Object.keys(match.worlds).forEach((world) => {
            ret[match.worlds[world]] = match.id.slice(match.id.length - 1, match.id.length)
          })
        })

        return ret
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
    },

    watch: {
      'matches': function (val, oldVal) {
        if (val[0]) {
          var oldest_date = val[0].start_time
          for (var i = 1; i < val.length; i++) {
            var st = val[i].start_time
            if (st < oldest_date) {
              oldest_date = st
            }
          }
          this.$store.dispatch('FETCH_TIMEZONE', {
            timezone_name: 'all',
            start_time: oldest_date
          }).then(() => {
            this.timezones = this.$store.state.timezones.all
          })
        }
      } // end matches watcher

    } // end watchers
  }

</script>

<style>
  .tzlink {
    color: black;
  }

  .tierText {
    color: #757575;
  }
</style>
