<template>
  <div>
    <div class="server-select mdl-shadow--2dp">
      <div class="server-select-container">
        <strong>Server: &nbsp;</strong>
        <select class="map-select" v-model="selectedWorld" :disabled="worldlist.length === 0">
          <option v-for="world in sorted_worldlist">
            {{world.name}}
          </option>
        </select>
      </div>
    </div>
    <GameMap :matchArr='matchArr' :objectives='objectives' :worldlist='worldlist'
      :selectedWorld='cSelectedWorld'></GameMap>
  </div>
</template>

<script>
  import GameMap from './GameMap.vue'
  import _ from 'lodash'

  export default {
    name: 'MapPage',

    data () {
      return {
        selectedWorld: '',
        paramServer: null
      }
    },

    beforeRouteEnter (to, from, next) {
      const server = to.params.server
      if (server === undefined) {
        next(vm => {vm.paramServer = null})
      } else {
        next(vm => {vm.paramServer = server})
      }
    },

    computed: {
      matchArr () {
        return this.$store.state.matches
      },

      objectives () {
        const objectives = this.$store.state.objectives
        return objectives
      },

      worldlist () {
        return this.$store.state.worlds
      },

      cSelectedWorld () {
        var pserver = this.paramServer
        if (this.selectedWorld === '' || pserver !== null) {
          var tmp = this.getWorldById(pserver)
          if (tmp !== undefined) {
            this.selectedWorld = tmp.name
            this.paramServer = null
            return tmp.name
          } else {
            return ''
          }
        } else {
          return this.selectedWorld
        }
      },

      sorted_worldlist () {
        return _.sortBy(this.worldlist, ['name'])
      }
    },

    methods: {
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

    components: {
      GameMap
    },
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

  .map-select {
    width: 140px;
  }
</style>
