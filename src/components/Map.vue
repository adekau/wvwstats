<template>
  <div>
    <div class="server-select mdl-shadow--2dp">
      <div class="server-select-container">
        <strong>Server: &nbsp;</strong>
        <select class="map-select" v-model="selectedWorld">
          <option v-for="world in worldlist">
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
        }
      }
    },

    ready () {
      var southWest, northEast

      this.map = window.L.map('map', {
        minZoom: 0,
        maxZoom: 7,
        crs: window.L.CRS.Simple,
        maxBoundsViscosity: 1.0
      }).setView([0, 0], 0)

      southWest = this.unproject([0, 16384])
      northEast = this.unproject([16384, 0])

      this.map.setMaxBounds(new window.L.LatLngBounds(southWest, northEast))

      window.L.tileLayer('https://tiles.guildwars2.com/2/1/{z}/{x}/{y}.jpg', {
        minZoom: 0,
        maxZoom: 7,
        continuousWorld: true
      }).addTo(this.map)

      if(this.objectives.length > 0) {
        this.prepareMap()
      } else {
        store.updateObjectives()
      }
    },

    route: {
      data ({ to }) {
        return {
          worldlist: store.fetchWorlds(),
          matchArr: store.fetchMatches(),
          objectives: store.fetchObjectives()
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
      },

      updateWorlds () {
        this.worldlist = store.fetchWorlds()
      },

      updateObjectives () {
        this.objectives = store.fetchObjectives()
        this.prepareMap()
      },

      unproject: function (coord) {
        return this.map.unproject(coord, this.map.getMaxZoom())
      },

      /**
       * getWorldByName
       * name: world's string name
       * returns the world object of the form: {id: _, name: _, population: _}
       */
      getWorldByName (name) {
        for (var i = 0; i < this.worldlist.length; i++) {
          let curWorld = this.worldlist[i]
          if(curWorld.name === name) {
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
        }
      }

    },

    watch: {
      'selectedWorld': function (val, oldVal) {
        console.log(this.currentMatch)
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
    background: #000;
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
