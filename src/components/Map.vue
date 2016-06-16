<template>
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
</template>

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
  }

  .maptimer {
    background-color: rgba(255,255,255,0.6);
    border: none;
    padding: 5px;
    padding-top: 0;
    padding-bottom: 0;
  }
</style>

<script>
  import store from '../store'

  export default {
    data () {
      return {
        map: false,
        worldlist: [],
        selectedWorld: '',
        worldlist: [],
        matchArr: []
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
        this.matchArr = store.fetchMatches()
      },

      updateWorlds () {
        this.worldlist = store.fetchWorlds()
      },

      unproject: function (coord) {
        return this.map.unproject(coord, this.map.getMaxZoom())
      }
    }
  }
</script>
