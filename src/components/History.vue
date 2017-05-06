<template>
  <div class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid">
    <!-- <h6 style="width:100%;text-align:center;">This page is a work in progress.</h6> -->

    <h4 class="mdl-color-text--blue-grey-600 mdl-cell--12-col"
      style="margin-left: 6px; border-bottom: 1px solid grey;">
      Server Select
    </h4>

    <label for="serverSelect" class="serverLabel">Server:</label>
    <select id="serverSelect" v-model="server" style="width: 170px; margin-bottom: 25px;"
      v-on:change="goToPageOne()">
      <option>All</option>
      <option v-for="world in _.sortBy(worldlist, ['name'])" v-bind:value="world.id">{{world.name}}</option>
    </select>

    <div class="pagination">
      <router-link v-if="page > 1" :to="'/history/' + server + '/' + (page - 1)">&lt; prev</router-link>
      <a v-else class="disabled">&lt; prev</a>
      <span>Page {{ page }} / {{ maxPage }}</span>
      <router-link v-if="hasMore" :to="'/history/' + server + '/' + (page + 1)">more &gt;</router-link>
      <a v-else class="disabled">more &gt;</a>
    </div>

    <h6 v-if="loading" style="width:100%;text-align:center;">
      Data is loading...
    </h6>

    <MatchheadingHistory v-if="displayedItems.length"></MatchheadingHistory>
    <ScoredetailsHistory v-if="extractGlicko(item) && displayedPage > 0" v-for="item in displayedItems"
      :worldlist="worldlist" :matchinfo="item" :predictedglicko="extractGlicko(item)">
    </ScoredetailsHistory>
    <div v-else></div>
    <MatchheadingHistory v-if="displayedItems.length"></MatchheadingHistory>

    <div class="pagination">
      <router-link v-if="page > 1" :to="'/history/' + server + '/' + (page - 1)">&lt; prev</router-link>
      <a v-else class="disabled">&lt; prev</a>
      <span>Page {{ page }} / {{ maxPage }}</span>
      <router-link v-if="hasMore" :to="'/history/' + server + '/' + (page + 1)">more &gt;</router-link>
      <a v-else class="disabled">more &gt;</a>
    </div>
  </div>
</template>

<script>
  import ScoredetailsHistory from './ScoredetailsHistory'
  import MatchheadingHistory from './MatchheadingHistory'
  import _ from 'lodash'

  let isInitialRender = true

  export default {
    name: 'History',

    data () {
      const data = {
        // t: [], I don't now why this is here.
        loading: false,
        server: 'All',
        transition: 'slide-up',
        displayedPage: isInitialRender ? Number(this.$store.state.route.params.page) || 1 : -1,
        displayedItems: isInitialRender ? this.$store.getters.activeItems : []
      }

      isInitialRender = false
      return data
    },

    beforeMount () {
      this.server = this.$route.params.server || 'All'
      this.loadItems(this.page)
    },

    watch: {
      page (to, from) {
        this.loadItems(to, from)
      },

      server (n, o) {
        this.loadItems()
      }
    },

    methods: {
      loadItems (to = this.page, from = -1) {
        this.loading = true
        this.$store.dispatch('FETCH_MATCHHISTORY_IDS', { server: this.server }).then(() => {
          if (this.page < 0 || this.page > this.maxPage) {
            this.$router.replace(`/history/${this.server}/1`)
            return
          }
          this.transition = from === -1
            ? null
            : to > from ? 'slide-left' : 'slide-right'
          this.displayedPage = to
          this.displayedItems = this.$store.getters.activeItems
          this.loading = false
        })
      },

      extractGlicko (match) {
        const { green, blue, red } = match.worlds
        var ret = null
        if (match.glicko) {
          ret = Object.create(null)
          ret[green] = match.glicko.green
          ret[blue] = match.glicko.blue
          ret[red] = match.glicko.red
        }
        return ret
      },

      goToPageOne () {
        this.$router.replace(`/history/${this.server}/1`)
      }
    },

    computed: {
      _ () {
        return _
      },

      page () {
        return Number(this.$store.state.route.params.page) || 1
      },

      maxPage () {
        const { itemsPerPage, matchHistoryIds } = this.$store.state
        if (!matchHistoryIds[this.server]) {
          return '?'
        }
        return Math.ceil(matchHistoryIds[this.server].length / itemsPerPage)
      },

      hasMore () {
        return this.page < this.maxPage
      },

      worldlist () {
        return this.$store.state.worlds
      }
    },

    components: {
      ScoredetailsHistory,
      MatchheadingHistory
    }
  }
</script>

<style>
  .disabled {color:#ccc;}

  .serverLabel {
    margin-left: 5px;
    margin-right: 8px;
    line-height: 18px;
  }

  .pagination {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  .news-list {
    width: 100%;
    transition: all .5s cubic-bezier(.55,0,.1,1);
  }

  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    transform: translate(30px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    transform: translate(-30px, 0);
  }
  .item-move, .item-enter-active, .item-leave-active {
    transition: all .5s cubic-bezier(.55,0,.1,1);
  }
  .item-enter {
    opacity: 0;
    transform: translate(30px, 0);
  }

  .item-leave-active {
    position: absolute;
    opacity: 0;
    transform: translate(30px, 0);
  }
</style>
