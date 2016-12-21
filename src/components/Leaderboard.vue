<template>
  <div class="leaderboard-container">
    <div id="lb-nav" class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col-phone
      mdl-cell--12-col mdl-cell--8-col-tablet mdl-grid">
      <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
        onclick="document.getElementById('kd').scrollIntoView(true);"
        text="KD Ratio">
      </MdlButton>

      <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
        onclick="document.getElementById('kills').scrollIntoView(true);"
        text="Kills">
      </MdlButton>

      <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
        onclick="document.getElementById('deaths').scrollIntoView(true);"
        text="Deaths">
      </MdlButton>

      <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
        onclick="document.getElementById('activity').scrollIntoView(true);"
        text="Activity">
      </MdlButton>

      <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
        onclick="document.getElementById('scores').scrollIntoView(true);"
        text="Scores">
      </MdlButton>

      <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
        onclick="document.getElementById('pointsppt').scrollIntoView(true);"
        text="Points From PPT">
      </MdlButton>

      <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
        onclick="document.getElementById('percentppt').scrollIntoView(true);"
        text="% Points From PPT">
      </MdlButton>

      <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
        onclick="document.getElementById('percentppk').scrollIntoView(true);"
        text="% Points From PPK">
      </MdlButton>
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
        <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
          onclick="document.getElementById('lb-nav').scrollIntoView(true);"
          text="Back to Nav">
        </MdlButton>
      </div>

      <table class="mdl-cell mdl-cell--12-col mdl-data-table mdl-shadow--2dp
        mdl-cell--4-col-phone mdl-cell--8-col-tablet">
        <thead>
          <tr>
            <th>Rank</th>
            <th class="reducedPadding" style="text-align: left;">Server</th>
            <th>K/D Ratio</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in weekleaderboard.kd">
            <td>
              {{index + 1}}
            </td>
            <td class="reducedPadding" style="text-align: left;">
              {{ getWorldById(item.server).name }}
            </td>
            <td>
              {{ item.kd | round(3, false)}}
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
        <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
          onclick="document.getElementById('lb-nav').scrollIntoView(true);"
          text="Back to Nav">
        </MdlButton>
      </div>

      <table class="mdl-cell mdl-cell--12-col mdl-data-table mdl-shadow--2dp
        mdl-cell--4-col-phone mdl-cell--8-col-tablet">
        <thead>
          <tr>
            <th>Rank</th>
            <th class="reducedPadding" style="text-align: left;">Server</th>
            <th>Kills</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in weekleaderboard.kills">
            <td>
              {{index + 1}}
            </td>
            <td class="reducedPadding" style="text-align: left;">
              {{ getWorldById(item.server).name }}
            </td>
            <td>
              {{ item.kills | round(3, false)}}
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
        <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
          onclick="document.getElementById('lb-nav').scrollIntoView(true);"
          text="Back to Nav">
        </MdlButton>
      </div>

      <table class="mdl-cell mdl-cell--12-col mdl-data-table mdl-shadow--2dp
        mdl-cell--4-col-phone mdl-cell--8-col-tablet">
        <thead>
          <tr>
            <th>Rank</th>
            <th class="reducedPadding" style="text-align: left;">Server</th>
            <th>Deaths</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in weekleaderboard.deaths">
            <td>
              {{index + 1}}
            </td>
            <td class="reducedPadding"  style="text-align: left;">
              {{ getWorldById(item.server).name }}
            </td>
            <td>
              {{ item.deaths | round(3, false)}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Activity -->

    <div id="activity" class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--6-col
      mdl-cell--4-col-phone mdl-cell--8-col-tablet mdl-grid">
      <h6 class="mdl-color-text--blue-grey-600 mdl-cell--12-col"
        style="margin-left: 6px; border-bottom: 1px solid grey;">
        <span data-tooltip="Kills + Deaths">Activity</span>
      </h6>
      <div class="mdl-cell mdl-cell--4-col-phone
        mdl-cell--12-col mdl-cell--8-col-tablet" style="text-align: right;">
        <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
          onclick="document.getElementById('lb-nav').scrollIntoView(true);"
          text="Back to Nav">
        </MdlButton>
      </div>

      <table class="mdl-cell mdl-cell--12-col mdl-data-table mdl-shadow--2dp
        mdl-cell--4-col-phone mdl-cell--8-col-tablet">
        <thead>
          <tr>
            <th>Rank</th>
            <th class="reducedPadding" style="text-align: left;">Server</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in weekleaderboard.activity">
            <td>
              {{index + 1}}
            </td>
            <td class="reducedPadding" style="text-align: left;">
              {{ getWorldById(item.server).name }}
            </td>
            <td>
              {{ item.activity | round(3, false)}}
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
        <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
          onclick="document.getElementById('lb-nav').scrollIntoView(true);"
          text="Back to Nav">
        </MdlButton>
      </div>

      <table class="mdl-cell mdl-cell--12-col mdl-data-table mdl-shadow--2dp
        mdl-cell--4-col-phone mdl-cell--8-col-tablet">
        <thead>
          <tr>
            <th>Rank</th>
            <th class="reducedPadding" style="text-align: left;">Server</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in weekleaderboard.scores">
            <td>
              {{index + 1}}
            </td>
            <td class="reducedPadding" style="text-align: left;">
              {{ getWorldById(item.server).name }}
            </td>
            <td>
              {{ item.score | round(3, false)}}
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
        <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
          onclick="document.getElementById('lb-nav').scrollIntoView(true);"
          text="Back to Nav">
        </MdlButton>
      </div>

      <table class="mdl-cell mdl-cell--12-col mdl-data-table mdl-shadow--2dp
        mdl-cell--4-col-phone mdl-cell--8-col-tablet">
        <thead>
          <tr>
            <th>Rank</th>
            <th class="reducedPadding" style="text-align: left;">Server</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in weekleaderboard.pointsFromPPT">
            <td>
              {{index + 1}}
            </td>
            <td class="reducedPadding" style="text-align: left;">
              {{ getWorldById(item.server).name }}
            </td>
            <td>
              {{ item.points | round(3, false)}}
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
        <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
          onclick="document.getElementById('lb-nav').scrollIntoView(true);"
          text="Back to Nav">
        </MdlButton>
      </div>

      <table class="mdl-cell mdl-cell--12-col mdl-data-table mdl-shadow--2dp
        mdl-cell--4-col-phone mdl-cell--8-col-tablet">
        <thead>
          <tr>
            <th>Rank</th>
            <th class="reducedPadding" style="text-align: left;">Server</th>
            <th>Percent</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in weekleaderboard.percentPointsFromPPT">
            <td>
              {{index + 1}}
            </td>
            <td class="reducedPadding" style="text-align: left;">
              {{ getWorldById(item.server).name }}
            </td>
            <td>
              {{ item.percent * 100 | round(2, true)}}%
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
        <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
          onclick="document.getElementById('lb-nav').scrollIntoView(true);"
          text="Back to Nav">
        </MdlButton>
      </div>

      <table class="mdl-cell mdl-cell--12-col mdl-data-table mdl-shadow--2dp
        mdl-cell--4-col-phone mdl-cell--8-col-tablet">
        <thead>
          <tr>
            <th>Rank</th>
            <th class="reducedPadding" style="text-align: left;">Server</th>
            <th>Percent</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in weekleaderboard.percentPointsFromPPK">
            <td>
              {{index + 1}}
            </td>
            <td class="reducedPadding" style="text-align: left;">
              {{ getWorldById(item.server).name }}
            </td>
            <td>
              {{ item.percent * 100 | round(2, true)}}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
  import MdlButton from './MdlButton.vue'
  export default {
    name: 'Leaderboard',

    data () {
      return {}
    },

    components: {
      MdlButton
    },

    computed: {
      weekleaderboard () {
        return this.$store.state.leaderboard
      },

      worldlist () {
        return this.$store.state.worlds
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

  #lb-nav {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #lb-nav button {
    margin-right: 5px;
    margin-top: 2px;
    margin-bottom: 2px;
  }

  .leaderboard-container tr, .leaderboard-container td {
    height: 0px !important;
  }

  .reducedPadding {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
</style>
