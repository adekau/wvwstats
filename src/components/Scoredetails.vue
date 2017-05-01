<template>
  <div v-if="dataLoaded" class="mdl-shadow--2dp mdl-color--blue-grey-100 mdl-cell mdl-cell--12-col mdl-grid">
    <div class="mdl-cell--2-col mdl-cell--2-col-phone mdl-cell--2-col-tablet mdl-grid">
      <ul class="mdl-list" style="width: 100%;">
        <li class="worldname">
          <router-link :id="'wnGreen' + matchinfo.id + matchinfo.kills.green" v-bind:to="'/match/' + matchinfo.id" class="worldname_link">
            {{worldinfo.green}}
          </router-link>
          <MdlTooltip :target="'wnGreen' + matchinfo.id + matchinfo.kills.green" class="pgTooltipName">
            {{serverTooltip.green}}
          </MdlTooltip>
        </li>
        <li class="worldname">
          <router-link :id="'wnBlue' + matchinfo.id + matchinfo.kills.blue" v-bind:to="'/match/' + matchinfo.id" class="worldname_link">
            {{worldinfo.blue}}
          </router-link>
          <MdlTooltip :target="'wnBlue' + matchinfo.id + matchinfo.kills.blue" class="pgTooltipName">
            {{serverTooltip.blue}}
          </MdlTooltip>
        </li>
        <li class="worldname">
          <router-link :id="'wnRed' + matchinfo.id + matchinfo.kills.red" v-bind:to="'/match/' + matchinfo.id" class="worldname_link">
            {{worldinfo.red}}
          </router-link>
          <MdlTooltip :target="'wnRed' + matchinfo.id + matchinfo.kills.red" class="pgTooltipName">
            {{serverTooltip.red}}
          </MdlTooltip>
        </li>
      </ul>
      <!-- Tooltips for world names -->

    </div>
    <div class="mdl-cell--2-col mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-grid">
      <ul class="mdl-list" style="width: 100%;">
        <li>
          <div class="first-place" style="padding: 10px;">
            <!--<div v-bind:data-longtooltip =
              "worldinfo.blue + ':' + scoreDiff.green.blue + '\n' + worldinfo.red + ':' + scoreDiff.green.red"
              class="mdl-progress mdl-js-progress">
            </div>-->
            <MdlProgress :id="'pgGreen' + matchinfo.id" v-bind:progress="percentage.green">
            </MdlProgress>

            <MdlTooltip :target="'pgGreen' + matchinfo.id" class="pgTooltip">
              <em>{{worldinfo.blue}}</em> : <span :class="scoreDiff.green.blue.class">{{scoreDiff.green.blue.diff}}</span><br
              />
              <em>{{worldinfo.red}}</em> : <span :class="scoreDiff.green.red.class">{{scoreDiff.green.red.diff}}</span>
            </MdlTooltip>

          </div>
        </li>
        <li>
          <div class="second-place" style="padding: 10px;">

            <MdlProgress :id="'pgBlue' + matchinfo.id" v-bind:progress="percentage.blue">
            </MdlProgress>

            <MdlTooltip :target="'pgBlue' + matchinfo.id" class="pgTooltip">
              <em>{{worldinfo.green}}</em> : <span :class="scoreDiff.blue.green.class">{{scoreDiff.blue.green.diff}}</span><br
              />
              <em>{{worldinfo.red}}</em> : <span :class="scoreDiff.blue.red.class">{{scoreDiff.blue.red.diff}}</span>
            </MdlTooltip>

          </div>
        </li>
        <li>
          <div class="third-place" style="padding: 10px;">

            <MdlProgress :id="'pgRed' + matchinfo.id" v-bind:progress="percentage.red">
            </MdlProgress>

            <MdlTooltip :target="'pgRed' + matchinfo.id" class="pgTooltip">
              <em>{{worldinfo.green}}</em> : <span :class="scoreDiff.red.green.class">{{scoreDiff.red.green.diff}}</span><br
              />
              <em>{{worldinfo.blue}}</em> : <span :class="scoreDiff.red.blue.class">{{scoreDiff.red.blue.diff}}</span>
            </MdlTooltip>

          </div>
        </li>
      </ul>
    </div>
    <div class="mdl-cell--1-col mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-grid">
      <ul v-if="useSkirmish" class="mdl-list" style="margin:auto;">
        <!-- Skirmish Scores -->
        <li :id="'scGreen' + matchinfo.id + matchinfo.kills.green">{{skirmish.green}}</li>
        <MdlTooltip :target="'scGreen' + matchinfo.id + matchinfo.kills.green" class="pgTooltip">
          {{matchinfo.scores.green}}
        </MdlTooltip>
        <li :id="'scBlue' + matchinfo.id + matchinfo.kills.blue">{{skirmish.blue}}</li>
        <MdlTooltip :target="'scBlue' + matchinfo.id + matchinfo.kills.blue" class="pgTooltip">
          {{matchinfo.scores.blue}}
        </MdlTooltip>
        <li :id="'scRed' + matchinfo.id + matchinfo.kills.red">{{skirmish.red}}</li>
        <MdlTooltip :target="'scRed' + matchinfo.id + matchinfo.kills.red" class="pgTooltip">
          {{matchinfo.scores.red}}
        </MdlTooltip>
      </ul>
      <ul v-else class="mdl-list" style="margin:auto;">
        <!-- Old Scores (total) -->
        <li>{{matchinfo.scores.green}}</li>
        <li>{{matchinfo.scores.blue}}</li>
        <li>{{matchinfo.scores.red}}</li>
      </ul>
    </div>
    <div class="mdl-cell--1-col mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-grid">
      <ul v-if="matchinfo.victory_points" class="mdl-list" style="margin:auto;">
        <li>{{matchinfo.victory_points.green}}</li>
        <li>{{matchinfo.victory_points.blue}}</li>
        <li>{{matchinfo.victory_points.red}}</li>
      </ul>
      <ul v-else class="mdl-list" style="margin:auto;">
        <li id="mi_vp_1"> N/A </li>
        <MdlTooltip target="mi_vp_1">
          Victory Points not available in custom data range mode.
        </MdlTooltip>
        <li id="mi_vp_2"> N/A </li>
        <MdlTooltip target="mi_vp_2">
          Victory Points not available in custom data range mode.
        </MdlTooltip>
        <li id="mi_vp_3"> N/A </li>
        <MdlTooltip target="mi_vp_3">
          Victory Points not available in custom data range mode.
        </MdlTooltip>
      </ul>
    </div>
    <div class="mdl-cell--1-col mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-grid">
      <ul class="mdl-list" style="margin:auto;">
        <li>+{{ppt.green}}</li>
        <li>+{{ppt.blue}}</li>
        <li>+{{ppt.red}}</li>
      </ul>
    </div>
    <div class="mdl-cell--3-col mdl-cell--2-col-phone mdl-cell--2-col-tablet mdl-grid">
      <div class="mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet">
        <ul style="text-align: left; list-style: none;">
          <li>{{objectives.camps.green}}</li>
          <li>{{objectives.camps.blue}}</li>
          <li>{{objectives.camps.red}}</li>
          <ul>
      </div>
      <div class="mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet">
        <ul style="text-align: left; list-style: none;">
          <li>{{objectives.towers.green}}</li>
          <li>{{objectives.towers.blue}}</li>
          <li>{{objectives.towers.red}}</li>
          <ul>
      </div>
      <div class="mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet">
        <ul style="text-align: left; list-style: none;">
          <li>{{objectives.keeps.green}}</li>
          <li>{{objectives.keeps.blue}}</li>
          <li>{{objectives.keeps.red}}</li>
          <ul>
      </div>
      <div class="mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet">
        <ul style="text-align: left; list-style: none;">
          <li>{{objectives.castles.green}}</li>
          <li>{{objectives.castles.blue}}</li>
          <li>{{objectives.castles.red}}</li>
          <ul>
      </div>
    </div>
    <div class="mdl-cell--1-col mdl-grid no-padding-left mdl-cell--hide-phone mdl-cell--hide-tablet">
      <ul class="mdl-list">
        <li>
          {{glicko.green | round(3, true)}}
        </li>
        <li>
          {{glicko.blue | round(3, true)}}
        </li>
        <li>
          {{glicko.red | round(3, true)}}
        </li>
      </ul>
    </div>
    <div class="mdl-cell--1-col mdl-grid mdl-cell--hide-phone mdl-cell--hide-tablet">
      <ul class="mdl-list">
        <li>
          <span v-show="isPositive(glicko.delta.green)" class="glicko glicko-up">
              <!-- <img src="../assets/uparrow.png" width="10" height="10"> -->
              {{glicko.delta.green | round(3, true)}}
            </span>
          <span v-show="!isPositive(glicko.delta.green)" class="glicko glicko-down">
              <!-- <img src="../assets/downarrow.png" width="10" height="10"> -->
              {{glicko.delta.green | round(3, true)}}
            </span>
        </li>
        <li>
          <span v-show="isPositive(glicko.delta.blue)" class="glicko glicko-up">
              <!-- <img src="../assets/uparrow.png" width="10" height="10"> -->
              {{glicko.delta.blue | round(3, true)}}
            </span>
          <span v-show="!isPositive(glicko.delta.blue)" class="glicko glicko-down">
              <!-- <img src="../assets/downarrow.png" width="10" height="10"> -->
              {{glicko.delta.blue | round(3, true)}}
            </span>
        </li>
        <li>
          <span v-show="isPositive(glicko.delta.red)" class="glicko glicko-up">
              <!-- <img src="../assets/uparrow.png" width="10" height="10"> -->
              {{glicko.delta.red | round(3, true)}}
            </span>
          <span v-show="!isPositive(glicko.delta.red)" class="glicko glicko-down">
              <!-- <img src="../assets/downarrow.png" width="10" height="10"> -->
              {{glicko.delta.red | round(3, true)}}
            </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import store from '../store'
  import MdlProgress from './MdlProgress'
  import MdlTooltip from './MdlTooltip'

  export default {

    props: ['matchinfo', 'worldlist', 'predictedglicko', 'useSkirmish'],

    computed: {
      dataLoaded() {
        return Object.keys(this.matchinfo).length
          && this.worldlist.length
          && Object.keys(this.predictedglicko).length
      },
      /**
       * worldinfo
       * used to compute the name of the servers in the match.
       */
      worldinfo() {
        let ret = Object.create(null)
        let servers = this.matchinfo.worlds
        Object.keys(servers).forEach((key) => {
          let worldId = servers[key]
          ret[key] = this.getWorldById(worldId).name
        })
        return ret
      },

      /**
       * objectives
       * used to store the number of objectives stored.
       */
      objectives: function () {
        // Reset
        let ret = {
          camps: { green: 0, blue: 0, red: 0 },
          towers: { green: 0, blue: 0, red: 0 },
          keeps: { green: 0, blue: 0, red: 0 },
          castles: { green: 0, blue: 0, red: 0 }
        }

        let ref = this.matchinfo.maps
        // Loop though the maps
        Object.keys(ref).forEach((key) => {
          // Loop through the map objectives.
          let refSingleMap = ref[key].objectives
          Object.keys(refSingleMap).forEach((key) => {
            let objective = refSingleMap[key]
            switch (objective.type.toLowerCase()) {
              case 'camp':
                ret.camps[objective.owner.toLowerCase()]++
                break
              case 'tower':
                ret.towers[objective.owner.toLowerCase()]++
                break
              case 'keep':
                ret.keeps[objective.owner.toLowerCase()]++
                break
              case 'castle':
                ret.castles[objective.owner.toLowerCase()]++
                break
            }
          })
        })
        return ret
      },

      skirmish() {
        let ret = { "green": 0, "blue": 0, "red": 0 }
        let ref = this.matchinfo.skirmishes
        if (!ref) return ret
        let curSkirmish = ref[ref.length - 1]
        ret = curSkirmish.scores
        return ret
      },

      /**
       * ppt
       * Calculates the points per tick per server.
       */
      ppt() {
        let ret = { green: 0, blue: 0, red: 0 }
        let ref = this.matchinfo.maps
        // Loop though the maps
        Object.keys(ref).forEach((key) => {
          // Loop through the map objectives.
          let refSingleMap = ref[key].objectives
          Object.keys(refSingleMap).forEach((key) => {
            let objective = refSingleMap[key]
            ret[objective.owner.toLowerCase()] += objective.points_tick
          })
        })
        return ret
      },

      /**
       * percentage
       * Calculates the percentages to fill the progress bars.
       */
      percentage() {
        if (this.useSkirmish) {
          let leader = Math.max(this.skirmish.green, this.skirmish.blue, this.skirmish.red)
          return {
            green: ((this.skirmish.green / leader) * 100),
            blue: ((this.skirmish.blue / leader) * 100),
            red: ((this.skirmish.red / leader) * 100)
          }
        } else {
          let leader = Math.max(this.matchinfo.scores.green, this.matchinfo.scores.blue, this.matchinfo.scores.red)
          return {
            green: ((this.matchinfo.scores.green / leader) * 100),
            blue: ((this.matchinfo.scores.blue / leader) * 100),
            red: ((this.matchinfo.scores.red / leader) * 100)
          }
        }
      },

      /**
       * serverTooltip
       * Calculates the html message to display in the tooltip for server names.
       */
      serverTooltip() {
        var ret = {
          green: '', blue: '', red: ''
        }

        if (!this.worldlist) {
          return ret
        }

        let servers = this.matchinfo.all_worlds
        Object.keys(servers).forEach((key) => {
          ret[key] = ''
          let current = servers[key]
          if (current.length > 1) {
            let currentLen = current.length
            for (var i = 0; i < currentLen; i++) {
              if (i === currentLen - 1) {
                ret[key] += this.getWorldById(current[currentLen - 1 - i]).name
              } else {
                ret[key] += this.getWorldById(current[currentLen - 1 - i]).name + ' & '
              }
            }
          } else {
            ret[key] = 'No linked server.'
          }
        })
        return ret
      },

      /**
       * scoreDiff
       * generates the tooltips for hoving over the progress bars.
       */
      scoreDiff() {
        if (this.useSkirmish) {
          var s = this.skirmish
        } else {
          var s = this.matchinfo.scores
        }
        return {
          green: {
            blue: {
              diff: this.isPositive(s.green - s.blue) ? '⬆ ' + (s.green - s.blue) : '⬇ ' + (s.green - s.blue),
              class: this.isPositive(s.green - s.blue) ? 'pbPos' : 'pbNeg'
            },
            red: {
              diff: this.isPositive(s.green - s.red) ? '⬆ ' + (s.green - s.red) : '⬇ ' + (s.green - s.red),
              class: this.isPositive(s.green - s.red) ? 'pbPos' : 'pbNeg'
            }
          },
          blue: {
            green: {
              diff: this.isPositive(s.blue - s.green) ? '⬆ ' + (s.blue - s.green) : '⬇ ' + (s.blue - s.green),
              class: this.isPositive(s.blue - s.green) ? 'pbPos' : 'pbNeg'
            },
            red: {
              diff: this.isPositive(s.blue - s.red) ? '⬆ ' + (s.blue - s.red) : '⬇ ' + (s.blue - s.red),
              class: this.isPositive(s.blue - s.red) ? 'pbPos' : 'pbNeg'
            }
          },
          red: {
            green: {
              diff: this.isPositive(s.red - s.green) ? '⬆ ' + (s.red - s.green) : '⬇ ' + (s.red - s.green),
              class: this.isPositive(s.red - s.green) ? 'pbPos' : 'pbNeg'
            },
            blue: {
              diff: this.isPositive(s.red - s.blue) ? '⬆ ' + (s.red - s.blue) : '⬇ ' + (s.red - s.blue),
              class: this.isPositive(s.red - s.blue) ? 'pbPos' : 'pbNeg'
            }
          }
        }
      },

      /**
       * glicko
       * returns the glicko for this matchup
       */
      glicko() {
        if (this.predictedglicko[this.matchinfo.worlds.green]) {
          var ret = {
            green: this.predictedglicko[this.matchinfo.worlds.green].rating,
            blue: this.predictedglicko[this.matchinfo.worlds.blue].rating,
            red: this.predictedglicko[this.matchinfo.worlds.red].rating,
            delta: {
              green: this.predictedglicko[this.matchinfo.worlds.green].delta,
              blue: this.predictedglicko[this.matchinfo.worlds.blue].delta,
              red: this.predictedglicko[this.matchinfo.worlds.red].delta
            }
          }
        } else {
          ret = {}
        }
        return ret
      }

    },

    methods: {
      /**
       * getWorldById
       * id : numerical id of the world (1001-2301)
       * returns the world object of the form: {id: _, name: _, population: _}
       */
      getWorldById(id) {
        for (var i = 0; i < this.worldlist.length; i++) {
          let curWorld = this.worldlist[i]
          if (curWorld.id === id) {
            return curWorld
          }
        }
        return
      },

      /**
       * isPositive
       * value : numeral to determine positivity
       * returns true if positive, false if not.
       * used by glicko numbers to show green/red based on gain/loss
       */
      isPositive(value) {
        return value >= 0
      }
    },

    filters: {
      round: function (value, accuracy, keep) {
        if (typeof value !== 'number') return value

        var fixed = value.toFixed(accuracy)

        return keep ? fixed : +fixed
      },
      removeNegative: function (value) {
        return Math.abs(value)
      }

    },

    components: {
      MdlProgress,
      MdlTooltip
    }

  }

</script>

<style>
  .no-padding-left {
    padding-left: 0px;
  }
  
  .glicko-up {
    color: rgb(89, 170, 91);
    font-weight: bold;
  }
  
  .glicko-down {
    color: rgb(182, 89, 91);
    font-weight: bold;
  }
  
  .glicko-up-container {
    display: inline-block;
  }
  
  .mdl-progress>.bufferbar {
    background-image: none;
    background-color: rgb(191, 200, 215);
    /*box-shadow: 1px 1px 1px rgb(150,159,176);*/
  }
  
  .first-place>.mdl-progress>.progressbar {
    background-color: rgb(89, 182, 91);
  }
  
  .second-place>.mdl-progress>.progressbar {
    background-color: rgb(89, 91, 182)
  }
  
  .third-place>.mdl-progress>.progressbar {
    background-color: rgb(182, 89, 91);
  }
  
  .serverColorGreen {
    color: rgb(89, 182, 91);
  }
  
  .serverColorBlue {
    color: rgb(89, 91, 182)
  }
  
  .serverColorRed {
    color: rgb(182, 89, 91);
  }
  
  .worldname_link {
    color: inherit;
    text-decoration: none;
    font-weight: normal;
  }
  
  .worldname_link:hover {
    color: rgb(89, 91, 182);
    text-decoration: underline;
  }
  
  .pgTooltip {
    font-size: 13px !important;
    line-height: 19px !important;
  }
  
  .pgTooltipName {
    font-size: 13px !important;
    line-height: 19px !important;
    max-width: 155px !important;
  }
  
  .pbPos {
    color: rgb(149, 252, 151);
    /*text-shadow: -1px 0 rgb(89,182,91), 0 1px rgb(89,182,91), 1px 0 rgb(89,182,91), 0 -1px rgb(89,182,91);*/
    letter-spacing: 0.062em;
    font-weight: normal;
    text-shadow: 0 0 3px rgba(0, 0, 0, .63);
  }
  
  .pbNeg {
    color: rgb(255, 152, 154);
    /*text-shadow: -1px 0 rgb(182,89,91), 0 1px rgb(182,89,91), 1px 0 rgb(182,89,91), 0 -1px rgb(182,89,91);*/
    letter-spacing: 0.062em;
    text-shadow: 0 0 3px rgba(0, 0, 0, .63);
    font-weight: normal;
  }
  /*.worldname {
    display: flex;
  }

  .worldname span {
    white-space: nowrap;
    overflow: scroll;
    text-overflow: ellipsis;
  }

  .worldname span [data-tooltip] {
    white-space: normal;
    overflow: auto;
  }*/
</style>