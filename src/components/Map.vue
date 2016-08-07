<template>
  <div>
    <div class="server-select mdl-shadow--2dp">
      <div class="server-select-container">
        <strong>Server: &nbsp;</strong>
        <select class="map-select" v-model="selectedWorld" :disabled="!mapPrepared">
          <option v-for="world in worldlist | orderBy 'name'">
            {{world.name}}
          </option>
        </select>
      </div>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
  import store from '../store'

  export default {
    data () {
      return {
        map: false,
        worldlist: [],
        selectedWorld: '',
        matchArr: [],
        objectiveIds: [],
        objectives: [],
        objectiveInfo: {},
        objectivesById: {},
        mapMarkers: {},
        defaultIconSize: [26, 26],
        mapIcons: {
          camp: {green: null, blue: null, red: null, neutral: null},
          tower: {green: null, blue: null, red: null, neutral: null},
          keep: {green: null, blue: null, red: null, neutral: null},
          castle: {green: null, blue: null, red: null, neutral: null},
          claimed: {
            camp: {green: null, blue: null, red: null, neutral: null},
            tower: {green: null, blue: null, red: null, neutral: null},
            keep: {green: null, blue: null, red: null, neutral: null},
            castle: {green: null, blue: null, red: null, neutral: null}
          }
        },
        mapPrepared: 0,
        paramServer: 0,
        riTimer: null
      }
    },

    ready () {
      var southWest, northEast

      this.map = window.L.map('map', {
        minZoom: 0,
        maxZoom: 6,
        crs: window.L.CRS.Simple,
        maxBoundsViscosity: 1.0
      }).setView([0, 0], 0)

      southWest = this.unproject([0, 16384])
      northEast = this.unproject([16384, 0])

      this.map.setMaxBounds(new window.L.LatLngBounds(southWest, northEast))

      window.L.tileLayer('https://tiles{s}.guildwars2.com/2/1/{z}/{x}/{y}.jpg', {
        minZoom: 0,
        maxZoom: 6,
        continuousWorld: true,
        subdomains: '1234'
      }).addTo(this.map)

      if(this.objectives.length > 0) {
        this.prepareMap()
      } else {
        store.updateObjectives()
      }

      if(this.worldlist.length > 0) {
        this.setServer()
      } else {
        store.updateWorlds()
      }
    },

    route: {
      data ({ to }) {
        const server = to.params.server
        // Increase timeout if this not working.
        setTimeout(this.setServer, 30)
        return {
          worldlist: store.fetchWorlds(),
          matchArr: store.fetchMatches(),
          objectives: store.fetchObjectives(),
          objectiveIds: store.fetchObjectiveIds(),
          paramServer: server
        }
      }
    },

    created () {
      store.on('matches-updated', this.updateMatches)
      store.on('worlds-updated', this.updateWorlds)
      store.on('objectives-updated', this.updateObjectives)
      this.prepareIcons()
    },

    destroyed () {
      store.removeListener('matches-updated', this.updateMatches)
      store.removeListener('worlds-updated', this.updateWorlds)
      store.removeListener('objectives-updated', this.updateObjectives)
    },

    computed: {
      /**
       * worldMatchIds
       * Loops through each match and assembles an object by world id with what
       * match that server is in.
       */
      worldMatchIds () {
        var ret = {}

        if(!this.matchArr) {
            return ret
        }

        for (var i = 0; i < this.matchArr.length; i++) {
          let matchId = this.matchArr[i].id
          let matchServers = this.matchArr[i].all_worlds

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
       * objectivesById
       * returns an object indexed by id of the objectives in the match-up
       */
      objectivesById () {
        var curMatchId = this.currentMatch // alias. force compute
        var curMatch = Object.create(null)
        var ret = Object.create(null)

        if (!this.matchArr[0]) {
          return curMatch
        }

        for (var i = 0; i < this.matchArr.length; i++) {
          let match = this.matchArr[i]
          if(match.id === curMatchId) {
            curMatch = match
          }
        }

        let temp = curMatch.maps.map( (obj) => {
          return obj.objectives
        })

        temp = [].concat.apply([], temp)

        for (var z = 0; z < temp.length; z++) {
          let id = temp[z].id
          ret[id] = temp[z]
        }

        return ret
      },

      /**
       * currentMatch
       * using worldMatchIds, finds the current match of the selected world.
       */
      currentMatch () {
        var server = this.selectedWorld
        var id = this.getWorldByName(server).id
        return this.worldMatchIds[id]
      }
    },

    methods: {
      updateMatches () {
        this.matchArr = store.fetchMatches()
        if (this.mapPrepared && this.worldlist.length > 0 && this.selectedWorld) {
          this.updateMap()
        }
      },

      updateWorlds () {
        this.worldlist = store.fetchWorlds()
        this.setServer()
      },

      updateObjectives () {
        this.objectives = store.fetchObjectives()
        this.prepareMap()
      },

      unproject: function (coord) {
        return this.map.unproject(coord, this.map.getMaxZoom())
      },

      setServer () {
        if (this.mapPrepared && this.matchArr[0]) {
          var server = this.paramServer
          if(server) {
            this.selectedWorld = this.getWorldById(server).name
            this.updateMap()
          }
        } else {
          setTimeout(this.setServer, 30)
        }
      },

      timeDifference (current, previous) {
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        var elapsed = current - previous;

        if (elapsed < msPerMinute) {
          return (elapsed/1000) > 1 ? Math.round(elapsed/1000) + ' seconds ago'
            : Math.round(elapsed/1000) + ' seconds ago'
        }

        else if (elapsed < msPerHour) {
          return Math.round(elapsed/msPerMinute) > 1 ? Math.round(elapsed/msPerMinute) + ' minutes ago'
            : Math.round(elapsed/msPerMinute) + ' minute ago'
        }

        else if (elapsed < msPerDay ) {
          return Math.round(elapsed/msPerHour) > 1 ? Math.round(elapsed/msPerHour) + ' hours ago'
            : Math.round(elapsed/msPerHour) + ' hour ago'
        }

        else if (elapsed < msPerMonth) {
          return Math.round(elapsed/msPerDay) > 1 ? 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago'
            : 'approximately ' + Math.round(elapsed/msPerDay) + ' day ago'
        }

        else if (elapsed < msPerYear) {
          return Math.round(elapsed/msPerMonth) > 1 ? 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago'
            : 'approximately ' + Math.round(elapsed/msPerMonth) + ' month ago'
        }

        else {
          return Math.round(elapsed/msPerYear) > 1 ? 'approximately ' + Math.round(elapsed/msPerYear) + ' years ago'
            : 'approximately ' + Math.round(elapsed/msPerYear) + ' year ago'
        }
      },
      /**
       * getWorldByName
       * name: world's string name
       * returns the world object of the form: {id: _, name: _, population: _}
       */
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

      /**
       * prepareIcons
       * Prepares the mapIcons object.
       */
      prepareIcons () {
        var types = ['camp', 'tower', 'keep', 'castle']
        var colors = ['green', 'blue', 'red', 'neutral']

        for (var type in types) {
          for (var color in colors) {
            this.mapIcons[types[type]][colors[color]] = window.L.icon({
              iconUrl: 'http://www.wvwstats.com/static/img/' + types[type] + '_' + colors[color] + '.png',
              iconSize: this.defaultIconSize
            })
            this.mapIcons.claimed[types[type]][colors[color]] = window.L.icon({
              iconUrl: 'http://www.wvwstats.com/static/img/' + types[type] + '_' + colors[color] + '.png',
              iconSize: this.defaultIconSize,
              shadowUrl: 'http://www.wvwstats.com/static/img/claimed.svg',
              shadowSize: [12, 12],
              shadowAnchor: [18, 18]
            })
          }
        }
      },

      /**
       * prepareMap
       * create neutral icons on the map and register the map markers.
       */
      prepareMap () {
        for (var bit in this.objectives) {
          let obj = this.objectives[bit]
          let name = obj.name
          let id = obj.id
          delete obj.id
          this.objectiveInfo[id] = obj
          this.mapMarkers[id] = window.L.marker(this.unproject(obj.coord), {
            title: name,
            icon: this.mapIcons[obj.type.toLowerCase()].neutral
          }).addTo(this.map)
          .bindPopup(name)
          this.mapPrepared = 1
        }
      },

      /**
       * updateMap
       * Modify the icons based on who owns them
       */
      updateMap () {
        if(!this.mapPrepared) {
          return
        }

        let objectives = this.objectivesById

        for (var i = 0; i < this.objectiveIds.length; i++) {
          let item = this.objectiveIds[i]
          let curObjective = objectives[item]

          if (curObjective) {
            this.handleObjective(curObjective, item)
          }
        }

        if (!this.riTimer) {
          this.riTimer = setInterval(this.timerUpdate, 1000)
        }
      },

      /**
       * handleObjective
       * takes an objective and fills the map with the correct icon and
       * tooltip with the correct information.
       */
      handleObjective (curObjective, item) {
        var unclaimedLastFlippedTime = new Date(curObjective.last_flipped)
        var unclaimedLastFlippedFmt = this.timeDifference(new Date(), unclaimedLastFlippedTime)

        if(curObjective.claimed_by) {
          let guildId = curObjective.claimed_by
          this.mapMarkers[item].setIcon(
            this.mapIcons.claimed[curObjective.type.toLowerCase()][curObjective.owner.toLowerCase()])

          store.fetchGuildById(guildId).then((guild) => {
            this.mapMarkers[item].unbindPopup()
            this.mapMarkers[item].bindPopup('<center><b>' + this.objectiveInfo[item].name + '</b></center><br />' +
              'Last flipped <b>' + unclaimedLastFlippedFmt + '</b><br />' +
              'Claimed by: <b>[' + guild.tag + ']</b> ' + guild.guild_name)
          })
        } else {
          this.mapMarkers[item].setIcon(
            this.mapIcons[curObjective.type.toLowerCase()][curObjective.owner.toLowerCase()])
          this.mapMarkers[item].unbindPopup()
          this.mapMarkers[item].bindPopup('<center><b>' + this.objectiveInfo[item].name + '</b></center><br />' +
            'Last flipped <b>' + unclaimedLastFlippedFmt + '</b>')
        }
      },

      timerUpdate: function () {
        for (var i = 0; i < this.objectiveIds.length; i++) {
          var item = this.objectiveIds[i]
          var curObjective = this.objectivesById[item]
          // Variables
          var lastFlippedTime = new Date(curObjective.last_flipped)
          var timeOwned = Math.floor((new Date() - lastFlippedTime) / 1000)
          // Label Configuration
          if (timeOwned < 300) {
            var riTime = 300 - timeOwned
            var minutes = Math.floor(riTime / 60)
            var seconds = riTime % 60
            if (seconds < 10) {
              seconds = '0' + seconds
            }
            var labelText = minutes + ':' + seconds
            this.mapMarkers[item].unbindLabel()
            this.mapMarkers[item].bindLabel(labelText, {
              noHide: true,
              className: 'maptimer',
              offset: [-16, 14]
            }).showLabel()
          } else {
            this.mapMarkers[item].unbindLabel()
          }
        }
      }

    },

    watch: {
      'selectedWorld': function (val, oldVal) {
        this.$router.go('/map/' + this.getWorldByName(val).id)
        store.updateSelectedWorld(this.getWorldByName(val).id)
        this.updateMap()
      }
    }

  }
</script>

<style>
  .server-select {
    position: absolute;
    top: 20px;
    left: calc(50% - 110px);
    z-index: 9999;
    height: 30px;
    width: 220px;
    background-color: rgba(230,230,230,.62);
    border-radius: 8px;
  }

  .server-select div {
    display: inline-block;
    margin-top: 4px;
    margin-left: 12px;
  }

  .leaflet-container {
    background: #fff;
  }

  .map-select {
    width: 140px;
  }

  #map {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1;
  }

  .maptimer {
    background-color: rgba(255,255,255,0.6);
    border: none;
    padding: 5px;
    padding-top: 0;
    padding-bottom: 0;
  }
</style>
