<template>
  <div class="mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--12-col mdl-grid">
    <div style="width:100%" v-if="isValidWorld && serverByTimezone['na_est'].data.length > 0">
      <h4 class="mdl-color-text--blue-grey-600 mdl-cell--12-col"
        style="margin-left: 6px; border-bottom: 1px solid grey;">
        {{getWorldById($route.params.server).name}}
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
                {{item.time | date}}
              </td>
              <td data-label="Kills">{{item.kills}}</td>
              <td data-label="Deaths">{{item.deaths}}</td>
              <td data-label="Scores">{{item.scores}}</td>
              <td data-label="Rating Metric">{{item.metric | round 3 true}}</td>
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
  import store from '../store'

  export default {
    data () {
      return {
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
      }
    },

    computed: {
      serverByTimezone () {
        var tz = this.timezones
        var sid = this.$route.params.server
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
        var sid = this.$route.params.server

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
      },

      date (value) {
        var d = new Date(value)
        if (this.$route.params.server < 2000) {
          return `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`
        } else {
          return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
        }

      },

      round: function (value, accuracy, keep) {
        if (typeof value !== 'number') return value

        var fixed = value.toFixed(accuracy)

        return keep ? fixed : +fixed
      }
    }
  }
</script>
