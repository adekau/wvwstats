<template>
  <div class="leaderboard-container">
    <div id="lb-nav" class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col-phone
      mdl-cell--12-col mdl-cell--8-col-tablet mdl-grid">
      <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
        onclick="document.getElementById('kd').scrollIntoView(true);"
      >
        KD Ratio
      </MdlButton>

      <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
        onclick="document.getElementById('kills').scrollIntoView(true);"
      >
        Kills
      </MdlButton>

      <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
        onclick="document.getElementById('deaths').scrollIntoView(true);"
      >
        Deaths
      </MdlButton>

      <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
        onclick="document.getElementById('activity').scrollIntoView(true);"
      >
        Activity
      </MdlButton>

      <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
        onclick="document.getElementById('scores').scrollIntoView(true);"
      >
        Scores
      </MdlButton>

      <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
        onclick="document.getElementById('pointsppt').scrollIntoView(true);"
      >
        Points From PPT
      </MdlButton>

      <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
        onclick="document.getElementById('percentppt').scrollIntoView(true);"
      >
        % Points From PPT
      </MdlButton>

      <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
        onclick="document.getElementById('percentppk').scrollIntoView(true);"
      >
        % Points From PPK
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
        >
          Back to Nav
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
              <b>{{index + 1}}</b>.
            </td>
            <td class="reducedPadding" style="text-align: left;">
              {{ getWorldById(item.server).name }} -
              <span class="grey">
                Tier {{ tier(item.server) }} {{ region(item.server) }}
              </span>
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
        >
          Back to Nav
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
              <b>{{index + 1}}</b>.
            </td>
            <td class="reducedPadding" style="text-align: left;">
              {{ getWorldById(item.server).name }} -
              <span class="grey">
                Tier {{ tier(item.server) }} {{ region(item.server) }}
              </span>
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
        >
          Back to Nav
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
              <b>{{index + 1}}</b>.
            </td>
            <td class="reducedPadding"  style="text-align: left;">
              {{ getWorldById(item.server).name }} -
              <span class="grey">
                Tier {{ tier(item.server) }} {{ region(item.server) }}
              </span>
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
        <span id="lb-activity">Activity</span>
        <MdlTooltip target="lb-activity">
          Kills + Deaths
        </MdlTooltip>
      </h6>
      <div class="mdl-cell mdl-cell--4-col-phone
        mdl-cell--12-col mdl-cell--8-col-tablet" style="text-align: right;">
        <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
          onclick="document.getElementById('lb-nav').scrollIntoView(true);"
        >
          Back to Nav
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
              <b>{{index + 1}}</b>.
            </td>
            <td class="reducedPadding" style="text-align: left;">
              {{ getWorldById(item.server).name }} -
              <span class="grey">
                Tier {{ tier(item.server) }} {{ region(item.server) }}
              </span>
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
        >
          Back to Nav
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
              <b>{{index + 1}}</b>.
            </td>
            <td class="reducedPadding" style="text-align: left;">
              {{ getWorldById(item.server).name }} -
              <span class="grey">
                Tier {{ tier(item.server) }} {{ region(item.server) }}
              </span>
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
        >
          Back to Nav
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
              <b>{{index + 1}}</b>.
            </td>
            <td class="reducedPadding" style="text-align: left;">
              {{ getWorldById(item.server).name }} -
              <span class="grey">
                Tier {{ tier(item.server) }} {{ region(item.server) }}
              </span>
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
        Percentage of Points from <span id="lb-ppt">PPT</span>
        <MdlTooltip target="lb-ppt">
          Points per Tick
        </MdlTooltip>
      </h6>
      <div class="mdl-cell mdl-cell--4-col-phone
        mdl-cell--12-col mdl-cell--8-col-tablet" style="text-align: right;">
        <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
          onclick="document.getElementById('lb-nav').scrollIntoView(true);"
        >
          Back to Nav
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
              <b>{{index + 1}}</b>.
            </td>
            <td class="reducedPadding" style="text-align: left;">
              {{ getWorldById(item.server).name }} -
              <span class="grey">
                Tier {{ tier(item.server) }} {{ region(item.server) }}
              </span>
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
        Percentage of Points from <span id="lb-ppk">PPK</span>
        <MdlTooltip target="lb-ppk">
          Points per Kill
        </MdlTooltip>
      </h6>
      <div class="mdl-cell mdl-cell--4-col-phone
        mdl-cell--12-col mdl-cell--8-col-tablet" style="text-align: right;">
        <MdlButton class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
          onclick="document.getElementById('lb-nav').scrollIntoView(true);"
        >
          Back to Nav
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
              <b>{{index + 1}}</b>.
            </td>
            <td class="reducedPadding" style="text-align: left;">
              {{ getWorldById(item.server).name }} -
              <span class="grey">
                Tier {{ tier(item.server) }} {{ region(item.server) }}
              </span>
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
  import MdlButton from './MdlButton'
  import MdlTooltip from './MdlTooltip'
  export default {
    name: 'Leaderboard',

    data () {
      return {}
    },

    components: {
      MdlButton,
      MdlTooltip
    },

    computed: {
      weekleaderboard () {
        return this.$store.state.leaderboard
      },

      worldlist () {
        return this.$store.state.worlds
      },
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
      },

      // TODO: to optimize store results..
      tier (server) {
        if (!this.$store.state.matches.length) {
          return
        }
        return this.$store.state.matches.filter((match) => {
          return match.all_worlds.green.includes(server)
            || match.all_worlds.blue.includes(server)
            || match.all_worlds.red.includes(server)
        })[0].id.slice(2,3)
      },

      region (server) {
        return server > 2000 ? 'EU' : 'NA'
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

  .grey {
    color: #757575;
  }
</style>
