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
  </div>
</template>

<script>
  import store from '../store'
  import Scoredetails from './Scoredetails.vue'
  import Matchheading from './Matchheading.vue'

  export default {
    data() {
      return {
        region: '2-',
        matches: [],
        worldlist: []
      }
    },

    route: {
      data ({ to }) {
        const region = to.region
        return {
          region: region,
          matches: store.fetchMatches(),
          worldlist: store.fetchWorlds()
        }
      }
    },

    created () {
      store.on('matches-updated', this.update)
      store.on('worlds-updated', this.updateWorlds)
    },

    destroyed () {
      store.removeListener('matches-updated', this.update)
      store.removeListener('worlds-updated', this.updateWorlds)
    },

    methods: {
      update () {
        this.matches = store.fetchMatches()
      },

      updateWorlds () {
        this.worldlist = store.fetchWorlds()
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
</style>
