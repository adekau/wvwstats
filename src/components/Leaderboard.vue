<template>
  <div class="leaderboard-container">
    <div id="lb-nav" class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col-phone
      mdl-cell--12-col mdl-cell--8-col-tablet mdl-grid">
      <ul class="lb-nav">
        <li>
          <a class="leaderboard_nav" href="javascript: void(0);"
            onclick="document.getElementById('kd').scrollIntoView(true);">KD Ratio</a>
        </li>

        <li>
          <a class="leaderboard_nav" href="javascript: void(0);"
            onclick="document.getElementById('kills').scrollIntoView(true);">Kills</a>
        </li>

        <li>
          <a class="leaderboard_nav" href="javascript: void(0);"
            onclick="document.getElementById('deaths').scrollIntoView(true);">Deaths</a>
        </li>

        <li>
          <a class="leaderboard_nav" href="javascript: void(0);"
            onclick="document.getElementById('scores').scrollIntoView(true);">Score</a>
        </li>

        <li>
          <a class="leaderboard_nav" href="javascript: void(0);"
            onclick="document.getElementById('pointsppt').scrollIntoView(true);">Points from PPT</a>
        </li>

        <li>
          <a class="leaderboard_nav" href="javascript: void(0);"
            onclick="document.getElementById('percentppt').scrollIntoView(true);">Percent of Points from PPT</a>
        </li>

        <li>
          <a class="leaderboard_nav" href="javascript: void(0);"
            onclick="document.getElementById('percentppk').scrollIntoView(true);">Percent of Points from PPK</a>
        </li>
      </ul>
    </div>

    <!-- K/D RATIO -->

    <div id="kd" class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--6-col
      mdl-cell--4-col-phone mdl-cell--8-col-tablet mdl-grid">
      <h6 class="mdl-color-text--blue-grey-600 mdl-cell--12-col"
        style="margin-left: 6px; border-bottom: 1px solid grey;">
        Kill/Death Ratio
      </h6>
      <div class="mdl-cell mdl-cell--4-col-phone
        mdl-cell--12-col mdl-cell--8-col-tablet" style="text-align: right;">
        <a class="leaderboard_nav_top" href="javascript: void(0);"
          onclick="document.getElementById('lb-nav').scrollIntoView(true);">⬆ Back to Nav</a>
      </div>

      <table class="mdl-cell mdl-cell--12-col mdl-data-table mdl-shadow--2dp
        mdl-cell--4-col-phone mdl-cell--8-col-tablet">
        <thead>
          <tr>
            <th>Rank</th>
            <th style="text-align: left;">Server</th>
            <th>K/D Ratio</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in weekleaderboard.kd">
            <td>
              {{$index + 1}}
            </td>
            <td style="text-align: left;">
              {{ getWorldById(item.server).name }}
            </td>
            <td>
              {{ item.kd | round 3 false}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- KILLS -->

    <div id="kills" class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--6-col
      mdl-cell--4-col-phone mdl-cell--8-col-tablet mdl-grid">
      <h6 class="mdl-color-text--blue-grey-600 mdl-cell--12-col"
        style="margin-left: 6px; border-bottom: 1px solid grey;">
        Kills
      </h6>
      <div class="mdl-cell mdl-cell--4-col-phone
        mdl-cell--12-col mdl-cell--8-col-tablet" style="text-align: right;">
        <a class="leaderboard_nav_top" href="javascript: void(0);"
          onclick="document.getElementById('lb-nav').scrollIntoView(true);">⬆ Back to Nav</a>
      </div>

      <table class="mdl-cell mdl-cell--12-col mdl-data-table mdl-shadow--2dp
        mdl-cell--4-col-phone mdl-cell--8-col-tablet">
        <thead>
          <tr>
            <th>Rank</th>
            <th style="text-align: left;">Server</th>
            <th>Kills</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in weekleaderboard.kills">
            <td>
              {{$index + 1}}
            </td>
            <td style="text-align: left;">
              {{ getWorldById(item.server).name }}
            </td>
            <td>
              {{ item.kills | round 3 false}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Deaths -->

    <div id="deaths" class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--6-col
      mdl-cell--4-col-phone mdl-cell--8-col-tablet mdl-grid">
      <h6 class="mdl-color-text--blue-grey-600 mdl-cell--12-col"
        style="margin-left: 6px; border-bottom: 1px solid grey;">
        Deaths
      </h6>
      <div class="mdl-cell mdl-cell--4-col-phone
        mdl-cell--12-col mdl-cell--8-col-tablet" style="text-align: right;">
        <a class="leaderboard_nav_top" href="javascript: void(0);"
          onclick="document.getElementById('lb-nav').scrollIntoView(true);">⬆ Back to Nav</a>
      </div>

      <table class="mdl-cell mdl-cell--12-col mdl-data-table mdl-shadow--2dp
        mdl-cell--4-col-phone mdl-cell--8-col-tablet">
        <thead>
          <tr>
            <th>Rank</th>
            <th style="text-align: left;">Server</th>
            <th>Deaths</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in weekleaderboard.deaths">
            <td>
              {{$index + 1}}
            </td>
            <td style="text-align: left;">
              {{ getWorldById(item.server).name }}
            </td>
            <td>
              {{ item.deaths | round 3 false}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Scores -->

    <div id="scores" class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--6-col
      mdl-cell--4-col-phone mdl-cell--8-col-tablet mdl-grid">
      <h6 class="mdl-color-text--blue-grey-600 mdl-cell--12-col"
        style="margin-left: 6px; border-bottom: 1px solid grey;">
        Scores
      </h6>
      <div class="mdl-cell mdl-cell--4-col-phone
        mdl-cell--12-col mdl-cell--8-col-tablet" style="text-align: right;">
        <a class="leaderboard_nav_top" href="javascript: void(0);"
          onclick="document.getElementById('lb-nav').scrollIntoView(true);">⬆ Back to Nav</a>
      </div>

      <table class="mdl-cell mdl-cell--12-col mdl-data-table mdl-shadow--2dp
        mdl-cell--4-col-phone mdl-cell--8-col-tablet">
        <thead>
          <tr>
            <th>Rank</th>
            <th style="text-align: left;">Server</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in weekleaderboard.scores">
            <td>
              {{$index + 1}}
            </td>
            <td style="text-align: left;">
              {{ getWorldById(item.server).name }}
            </td>
            <td>
              {{ item.score | round 3 false}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Points from PPT -->

    <div id="pointsppt" class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--6-col
      mdl-cell--4-col-phone mdl-cell--8-col-tablet mdl-grid">
      <h6 class="mdl-color-text--blue-grey-600 mdl-cell--12-col"
        style="margin-left: 6px; border-bottom: 1px solid grey;">
        Points from PPT
      </h6>
      <div class="mdl-cell mdl-cell--4-col-phone
        mdl-cell--12-col mdl-cell--8-col-tablet" style="text-align: right;">
        <a class="leaderboard_nav_top" href="javascript: void(0);"
          onclick="document.getElementById('lb-nav').scrollIntoView(true);">⬆ Back to Nav</a>
      </div>

      <table class="mdl-cell mdl-cell--12-col mdl-data-table mdl-shadow--2dp
        mdl-cell--4-col-phone mdl-cell--8-col-tablet">
        <thead>
          <tr>
            <th>Rank</th>
            <th style="text-align: left;">Server</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in weekleaderboard.pointsFromPPT">
            <td>
              {{$index + 1}}
            </td>
            <td style="text-align: left;">
              {{ getWorldById(item.server).name }}
            </td>
            <td>
              {{ item.points | round 3 false}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Percent from PPT -->

    <div id="percentppt" class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--6-col
      mdl-cell--4-col-phone mdl-cell--8-col-tablet mdl-grid">
      <h6 class="mdl-color-text--blue-grey-600 mdl-cell--12-col"
        style="margin-left: 6px; border-bottom: 1px solid grey;">
        Percentage of Points from <span data-tooltip="Points per Tick">PPT</span>
      </h6>
      <div class="mdl-cell mdl-cell--4-col-phone
        mdl-cell--12-col mdl-cell--8-col-tablet" style="text-align: right;">
        <a class="leaderboard_nav_top" href="javascript: void(0);"
          onclick="document.getElementById('lb-nav').scrollIntoView(true);">⬆ Back to Nav</a>
      </div>

      <table class="mdl-cell mdl-cell--12-col mdl-data-table mdl-shadow--2dp
        mdl-cell--4-col-phone mdl-cell--8-col-tablet">
        <thead>
          <tr>
            <th>Rank</th>
            <th style="text-align: left;">Server</th>
            <th>Percent</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in weekleaderboard.percentPointsFromPPT">
            <td>
              {{$index + 1}}
            </td>
            <td style="text-align: left;">
              {{ getWorldById(item.server).name }}
            </td>
            <td>
              {{ item.percent * 100 | round 2 true}}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Percent from PPK -->

    <div id="percentppk" class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--6-col
      mdl-cell--4-col-phone mdl-cell--8-col-tablet mdl-grid">
      <h6 class="mdl-color-text--blue-grey-600 mdl-cell--12-col"
        style="margin-left: 6px; border-bottom: 1px solid grey;">
        Percentage of Points from <span data-tooltip="Points per Kill">PPK</span>
      </h6>
      <div class="mdl-cell mdl-cell--4-col-phone
        mdl-cell--12-col mdl-cell--8-col-tablet" style="text-align: right;">
        <a class="leaderboard_nav_top" href="javascript: void(0);"
          onclick="document.getElementById('lb-nav').scrollIntoView(true);">⬆ Back to Nav</a>
      </div>

      <table class="mdl-cell mdl-cell--12-col mdl-data-table mdl-shadow--2dp
        mdl-cell--4-col-phone mdl-cell--8-col-tablet">
        <thead>
          <tr>
            <th>Rank</th>
            <th style="text-align: left;">Server</th>
            <th>Percent</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in weekleaderboard.percentPointsFromPPK">
            <td>
              {{$index + 1}}
            </td>
            <td style="text-align: left;">
              {{ getWorldById(item.server).name }}
            </td>
            <td>
              {{ item.percent * 100 | round 2 true}}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
  import Leaderboarditems from './Leaderboarditems.vue'
  import store from '../store'

  export default {
    data () {
      return {
        weekleaderboard: {},
        worldlist: []
      }
    },

    route: {
      data ({ to }) {
        return {
          weekleaderboard: store.fetchWeekleaderboard(),
          worldlist: store.fetchWorlds()
        }
      }
    },

    created () {
      store.on('worlds-updated', this.updateWorlds)
      store.on('weekleaderboard-updated', this.updateWeekleaderboard)
    },

    destroyed () {
      store.removeListener('worlds-updated', this.updateWorlds)
      store.removeListener('weekleaderboard-updated', this.updateWeekleaderboard)
    },

    methods: {
      updateWorlds () {
        this.worldlist = store.fetchWorlds()
      },

      updateWeekleaderboard () {
        this.weekleaderboard = store.fetchWeekleaderboard()
      },

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

    filters: {
      round: function (value, accuracy, keep) {
        if (typeof value !== 'number') return value

        var fixed = value.toFixed(accuracy)

        return keep ? fixed : +fixed
      }
    }
  }
</script>

<style>
  .leaderboard-container {
    all: inherit;
    width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  ul.lb-nav {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: rgb(112,112,112);
  }

  ul.lb-nav li {
    float: left;
  }

  li a.leaderboard_nav {
    display:block;
    padding-right: 12px;
    text-decoration: none;
    color: white;
    text-align: center;
    padding: 6px 8px;
    margin: 0px 1px 1px 0px;
    outline: 1px solid white;
  }

  a.leaderboard_nav_top {
    text-decoration: none;
  }
</style>
