<template>
  <div class="mdl-shadow--2dp mdl-color--blue-grey-100 mdl-cell mdl-cell--12-col mdl-grid">
    <div class="mdl-cell--12-col mdl-cell--4-col-phone mdl-cell--8-col-tablet">
      <h6 style="text-align:center; margin-top: 9px; margin-bottom: -4px;">
        Match {{new Date(matchinfo.start_time).toLocaleDateString()}} — {{new Date(matchinfo.end_time).toLocaleDateString()}}
      </h6>
    </div>
    <div class="mdl-cell--2-col mdl-cell--2-col-phone mdl-cell--2-col-tablet mdl-grid">
      <ul class="mdl-list" style="width: 100%;">
        <li class="worldname">
          <!--TODO: Replace the span with the router-link again when matchhistory
                    details page is created. UPDATE: Probably not, 'View' button-->
          <span :id="'wnGreen' + matchinfo.id + matchinfo.kills.green" class="noOutline">
            {{worldinfo.green}}
          </span>
          <MdlTooltip :target="'wnGreen' + matchinfo.id + matchinfo.kills.green">
            {{serverTooltip.green}}
          </MdlTooltip>
        </li>
        <li class="worldname">
          <span :id="'wnBlue' + matchinfo.id + matchinfo.kills.blue" class="noOutline">
            {{worldinfo.blue}}
          </span>
          <MdlTooltip :target="'wnBlue' + matchinfo.id + matchinfo.kills.blue">
            {{serverTooltip.blue}}
          </MdlTooltip>
        </li>
        <li class="worldname">
          <span :id="'wnRed' + matchinfo.id + matchinfo.kills.red" class="noOutline">
            {{worldinfo.red}}
          </span>
          <MdlTooltip :target="'wnRed' + matchinfo.id + matchinfo.kills.red">
            {{serverTooltip.red}}
          </MdlTooltip>
        </li>
      </ul>
    </div>
    <!-- Tooltips for world names -->
    <div class="mdl-cell--3-col mdl-cell--2-col-phone mdl-cell--2-col-tablet mdl-grid">
      <ul class="mdl-list" style="width: 100%;">
        <li>
          <div class="first-place" style="padding: 10px;">
            <MdlProgress :id="'pgGreen' + matchinfo.id + matchinfo.kills.green" v-bind:progress="percentage.green">
            </MdlProgress>

            <MdlTooltip :target="'pgGreen' + matchinfo.id + matchinfo.kills.green" class="pgTooltip">
              <em>{{worldinfo.blue}}</em> : <span :class="scoreDiff.green.blue.class">{{scoreDiff.green.blue.diff}}</span><br
              />
              <em>{{worldinfo.red}}</em> : <span :class="scoreDiff.green.red.class">{{scoreDiff.green.red.diff}}</span>
            </MdlTooltip>

          </div>
        </li>
        <li>
          <div class="second-place" style="padding: 10px;">

            <MdlProgress :id="'pgBlue' + matchinfo.id + matchinfo.kills.blue" v-bind:progress="percentage.blue">
            </MdlProgress>

            <MdlTooltip :target="'pgBlue' + matchinfo.id + matchinfo.kills.blue" class="pgTooltip">
              <em>{{worldinfo.green}}</em> : <span :class="scoreDiff.blue.green.class">{{scoreDiff.blue.green.diff}}</span><br
              />
              <em>{{worldinfo.red}}</em> : <span :class="scoreDiff.blue.red.class">{{scoreDiff.blue.red.diff}}</span>
            </MdlTooltip>

          </div>
        </li>
        <li>
          <div class="third-place" style="padding: 10px;">

            <MdlProgress :id="'pgRed' + matchinfo.id + matchinfo.kills.red" v-bind:progress="percentage.red">
            </MdlProgress>

            <MdlTooltip :target="'pgRed' + matchinfo.id + matchinfo.kills.red" class="pgTooltip">
              <em>{{worldinfo.green}}</em> : <span :class="scoreDiff.red.green.class">{{scoreDiff.red.green.diff}}</span><br
              />
              <em>{{worldinfo.blue}}</em> : <span :class="scoreDiff.red.blue.class">{{scoreDiff.red.blue.diff}}</span>
            </MdlTooltip>

          </div>
        </li>
      </ul>
    </div>
    <div class="mdl-cell--1-col mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-grid">
      <ul class="mdl-list" style="margin:auto;">
        <li>{{matchinfo.scores.green}}</li>
        <li>{{matchinfo.scores.blue}}</li>
        <li>{{matchinfo.scores.red}}</li>
      </ul>
    </div>
    <div class="mdl-cell--1-col mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-grid">
      <ul class="mdl-list">
        <li>
          {{matchinfo.kills.green / matchinfo.deaths.green | round(3, true)}}
        </li>
        <li>
          {{matchinfo.kills.blue / matchinfo.deaths.blue | round(3, true)}}
        </li>
        <li>
          {{matchinfo.kills.red / matchinfo.deaths.red | round(3, true)}}
        </li>
      </ul>
    </div>
    <div class="mdl-cell--1-col mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-grid">
      <ul class="mdl-list">
        <li>
          {{matchinfo.kills.green + matchinfo.deaths.green}}
        </li>
        <li>
          {{matchinfo.kills.blue + matchinfo.deaths.blue}}
        </li>
        <li>
          {{matchinfo.kills.red + matchinfo.deaths.red}}
        </li>
      </ul>
    </div>
    <div class="mdl-cell--1-col mdl-grid no-padding-left mdl-cell--hide-phone mdl-cell--hide-tablet">
      <ul class="mdl-list">
        <li>
          {{glicko.green - glicko.delta.green | round(3, true)}}
        </li>
        <li>
          {{glicko.blue - glicko.delta.blue | round(3, true)}}
        </li>
        <li>
          {{glicko.red - glicko.delta.red | round(3, true)}}
        </li>
      </ul>
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
    <div class="mdl-cell--1-col mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-grid">
      <MdlButton class="viewMatchButton" disabled>
        View
      </MdlButton>
    </div>
  </div>
</template>

<script>
  import store from '../store'
  import MdlProgress from './MdlProgress'
  import MdlTooltip from './MdlTooltip'
  import MdlButton from './MdlButton'

  export default {

    props: ['matchinfo', 'worldlist', 'predictedglicko'],

    computed: {
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

      /**
       * ppt
       * Calculates the points per tick per server.
       */
      ppt() {
        return {
          green: (this.objectives.camps.green * 2) + (this.objectives.towers.green * 4) +
          (this.objectives.keeps.green * 8) + (this.objectives.castles.green * 12),
          blue: (this.objectives.camps.blue * 2) + (this.objectives.towers.blue * 4) +
          (this.objectives.keeps.blue * 8) + (this.objectives.castles.blue * 12),
          red: (this.objectives.camps.red * 2) + (this.objectives.towers.red * 4) +
          (this.objectives.keeps.red * 8) + (this.objectives.castles.red * 12)
        }
      },

      /**
       * percentage
       * Calculates the percentages to fill the progress bars.
       */
      percentage() {
        let leader = Math.max(this.matchinfo.scores.green, this.matchinfo.scores.blue, this.matchinfo.scores.red)
        return {
          green: ((this.matchinfo.scores.green / leader) * 100),
          blue: ((this.matchinfo.scores.blue / leader) * 100),
          red: ((this.matchinfo.scores.red / leader) * 100)
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
        let s = this.matchinfo.scores
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
        if (this.predictedglicko[this.matchinfo.worlds.green].rating) {
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
      MdlTooltip,
      MdlButton
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
    font-size: 14px;
    line-height: 19px;
  }
  
  .noOutline {
    outline: none;
  }
  
  .viewMatchButton {
    width: 100%;
    height: 100%;
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