<template>
  <div class="mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--12-col mdl-grid">
    <div style="width:100%" v-if="isValidWorld && serverByTimezone !== {}">
      <h4 class="mdl-color-text--blue-grey-600 mdl-cell--12-col"
        style="margin-left: 6px; border-bottom: 1px solid grey;">
        {{getWorldById(paramServer).name}}
      </h4>
      <div style="width: 100%;" v-for="timezone in serverByTimezone">
        <h6 class="mdl-color-text--blue-grey-600 mdl-cell--12-col"
          style="margin-left: 6px; border-bottom: 1px solid grey;">
          {{timezone.name | format}}
        </h6>

        <table class="ratings mdl-cell mdl-cell--12-col mdl-data-table mdl-shadow--2dp
          mdl-cell--4-col-phone mdl-cell--8-col-tablet">
          <thead>
            <tr>
              <th class="mdl-data-table__cell--non-numeric">Date</th>
              <th>Kills</th>
              <th>Deaths</th>
              <th>Scores</th>
              <th>Rating Metric</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in timezone.data">
              <td data-label="Date" class="mdl-data-table__cell--non-numeric">
                {{date(item.time)}}
              </td>
              <td data-label="Kills">{{item.kills}}</td>
              <td data-label="Deaths">{{item.deaths}}</td>
              <td data-label="Scores">{{item.scores}}</td>
              <td data-label="Rating Metric">{{round(item.metric, 3, true)}}</td>
            </tr>
            <tr>
              <td data-label="Date" class="mdl-data-table__cell--non-numeric">
                Totals
              </td>
              <td data-label="Kills">{{getTotals(timezone).kills}}</td>
              <td data-label="Deaths">{{getTotals(timezone).deaths}}</td>
              <td data-label="Scores">{{getTotals(timezone).scores}}</td>
              <td data-label="Rating Metric">{{round(getTotals(timezone).metric, 3, true)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div style="width:100%;" v-else>
      Invalid server ID or the server is not the primary server of the match-up (it is linked to a higher rated server).
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WorldTimezoneStats',

    data () {
      return {
        timezones: [],
        paramServer: 0
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
          this.timezones = this.$store.state.timezones.all
        })
      }
    },

    beforeRouteEnter (to, from, next) {
      const server = to.params.server
      if (server === undefined) {
        next(vm => vm.paramServer = null)
      } else {
        next(vm => vm.paramServer = server)
      }
    },

    methods: {
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

      // Timezone is an array of all the timezone objects.
      // [{kills: _, deaths: _, scores:_, metric:_, etc}, ...]
      getTotals (timezone) {
        if (timezone === undefined || timezone == null) {
          return {
            kills: '-',
            deaths: '-',
            scores: '-',
            metric: '-'
          }
        }
        var killsTotal = 0
        var deathsTotal = 0
        var scoresTotal = 0
        var metricTotal = 0
        for (var i = 0; i < timezone.data.length; i++) {
          killsTotal += timezone.data[i].kills
          deathsTotal += timezone.data[i].deaths
          scoresTotal += timezone.data[i].scores
          metricTotal += timezone.data[i].metric
        }
        return {
          kills: killsTotal,
          deaths: deathsTotal,
          scores: scoresTotal,
          metric: metricTotal
        }
      },

      date (value) {
        var d = new Date(value)
        if (this.paramServer < 2000) {
          return `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`
        } else {
          return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
        }
      },

      round (value, accuracy, keep) {
        if (typeof value !== 'number') return value

        var fixed = value.toFixed(accuracy)

        return keep ? fixed : +fixed
      }
    },

    computed: {

      worldlist () {
        return this.$store.state.worlds
      },

      matches () {
        return this.$store.state.matches
      },

      serverByTimezone () {
        var tz = this.timezones
        var sid = this.paramServer
        var ret = {}

        for (var i = 0; i < tz.length; i++) {
          var cur = tz[i]
          var c_tz = cur.timezone.trim()
          if (!ret[c_tz]) {
            ret[c_tz] = {name: c_tz, data: []}
          }

          for (var z = 0; z < cur.data.length; z++) {
            var c = cur.data[z]
            var cs = c.world
            if (cs === parseInt(sid)) {
              c.time = cur.start_time
              ret[c_tz].data.push(c)
            }
          }

        }
        return ret
      },

      isValidWorld () {
        var wl = this.worldlist
        var sid = this.paramServer

        if (!wl.length) {
          return
        }

        for (var i = 0; i < wl.length; i++) {
          if (parseInt(sid) === wl[i].id) {
            return true
          }
        }

        return false
      }

    },

    filters: {
      format (value) {
        return value.replace('_', ' ').toUpperCase()
      }
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
