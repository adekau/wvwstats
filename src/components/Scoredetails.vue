<template>
  <div class="mdl-shadow--2dp mdl-color--blue-grey-100 mdl-cell mdl-cell--12-col mdl-grid">
    <div class="mdl-cell--2-col mdl-cell--2-col-phone mdl-cell--2-col-tablet mdl-grid">
      <ul class="mdl-list" style="width: 100%;">
        <li class="worldname">
          <router-link v-bind:to="'/match/' + matchinfo.id"
            class="worldname_link"
            v-bind:data-tooltip="serverTooltip.green">
            {{worldinfo.green}}
          </router-link>
        </li>
        <li class="worldname">
          <router-link v-bind:to="'/match/' + matchinfo.id"
            class="worldname_link"
            v-bind:data-tooltip="serverTooltip.blue">
            {{worldinfo.blue}}
          </router-link>
        </li>
        <li class="worldname">
          <router-link v-bind:to="'/match/' + matchinfo.id"
            class="worldname_link"
            v-bind:data-tooltip="serverTooltip.red">
            {{worldinfo.red}}
          </router-link>
        </li>
      </ul>
      <!-- Tooltips for world names -->

    </div>
    <div class="mdl-cell--3-col mdl-cell--2-col-phone mdl-cell--2-col-tablet mdl-grid">
      <ul class="mdl-list" style="width: 100%;">
        <li>
          <div class="first-place" style="padding: 10px;">
            <div v-bind:data-longtooltip =
              "worldinfo.blue + ':' + scoreDiff.green.blue + '\n' + worldinfo.red + ':' + scoreDiff.green.red"
              class="mdl-progress mdl-js-progress">
            </div>

          </div>
        </li>
        <li>
          <div class="second-place" style="padding: 10px;">

            <div v-bind:data-longtooltip=
              "worldinfo.green + ':' + scoreDiff.blue.green + '\n' + worldinfo.red + ':' + scoreDiff.blue.red"
              class="mdl-progress mdl-js-progress">
            </div>

          </div>
        </li>
        <li>
          <div class="third-place" style="padding: 10px;">

            <div v-bind:data-longtooltip=
              "worldinfo.green + ':' + scoreDiff.red.green + '\n' + worldinfo.blue + ':' + scoreDiff.red.blue"
              class="mdl-progress mdl-js-progress">
            </div>

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

  export default {

    props: ['matchinfo', 'worldlist', 'predictedglicko'],

    data () {
      return {
      }
    },

    computed: {
      /**
       * worldinfo
       * used to compute the name of the servers in the match.
       */
      worldinfo () {
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
          camps: {green: 0, blue: 0, red: 0},
          towers: {green: 0, blue: 0, red: 0},
          keeps: {green: 0, blue: 0, red: 0},
          castles: {green: 0, blue: 0, red: 0}
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
      ppt () {
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
      percentage () {
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
       serverTooltip () {
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
       scoreDiff () {
         let s = this.matchinfo.scores
         return {
           green: {
             blue: this.isPositive(s.green - s.blue) ? '⬆ ' + (s.green - s.blue) : '⬇ ' + (s.green - s.blue),
             red: this.isPositive(s.green - s.red) ? '⬆ ' + (s.green - s.red) : '⬇ ' + (s.green - s.red)
           },
           blue: {
             green: this.isPositive(s.blue - s.green) ? '⬆ ' + (s.blue - s.green) : '⬇ ' + (s.blue - s.green),
             red: this.isPositive(s.blue - s.red) ? '⬆ ' + (s.blue - s.red) : '⬇ ' + (s.blue - s.red)
           },
           red: {
             green: this.isPositive(s.red - s.green) ? '⬆ ' + (s.red - s.green) : '⬇ ' + (s.red - s.green),
             blue: this.isPositive(s.red - s.blue) ? '⬆ ' + (s.red - s.blue) : '⬇ ' + (s.red - s.blue)
           }
         }
       },

       /**
        * glicko
        * returns the glicko for this matchup
        */
        glicko () {
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
      getWorldById (id) {
        for (var i = 0; i < this.worldlist.length; i++) {
          let curWorld = this.worldlist[i]
          if(curWorld.id === id) {
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
      isPositive (value) {
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

    }

  }
</script>

<style>

  [data-tooltip] {
    position: relative;
    z-index: 2;
    cursor: pointer;
  }

  /* Hide the tooltip content by default */
  [data-tooltip]:before,
  [data-tooltip]:after {
    visibility: hidden;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=0);
    opacity: 0;
    pointer-events: none;
  }

  /* Position tooltip above the element */
  [data-tooltip]:before {
    /*display: inline-block;*/
    position: absolute;
    bottom: 150%;
    left: 50%;
    margin-bottom: 5px;
    margin-left: -51px;
    padding: 7px;
    width: 102px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    background-color: #000;
    background-color: hsla(0, 0%, 20%, 0.9);
    color: #fff;
    content: attr(data-tooltip);
    text-align: center;
    font-size: 14px;
    line-height: 1.2;
  }

  /* Triangle hack to make tooltip look like a speech bubble */
  [data-tooltip]:after {
    position: absolute;
    bottom: 150%;
    left: 50%;
    margin-left: -5px;
    width: 0;
    border-top: 5px solid #000;
    border-top: 5px solid hsla(0, 0%, 20%, 0.9);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: " ";
    font-size: 0;
    line-height: 0;
  }

  /* Show tooltip content on hover */
  [data-tooltip]:hover:before,
  [data-tooltip]:hover:after {
    visibility: visible;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=100);
    opacity: 1;
  }

  /* Longer tooltip */
  [data-longtooltip] {
    position: relative;
    z-index: 2;
    cursor: pointer;
  }

  /* Hide the tooltip content by default */
  [data-longtooltip]:before,
  [data-longtooltip]:after {
    visibility: hidden;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=0);
    opacity: 0;
    pointer-events: none;
  }

  /* Position tooltip above the element */
  [data-longtooltip]:before {
    display: inline-block;
    position: absolute;
    bottom: 150%;
    left: 50%;
    margin-bottom: 5px;
    margin-left: -100px;
    padding: 7px;
    /*width: 170px;*/
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    background-color: #000;
    background-color: hsla(0, 0%, 20%, 0.9);
    color: #fff;
    white-space:pre;
    content: attr(data-longtooltip);
    text-align: center;
    font-size: 14px;
    line-height: 1.2;
  }

  /* Triangle hack to make tooltip look like a speech bubble */
  [data-longtooltip]:after {
    position: absolute;
    bottom: 150%;
    left: 50%;
    margin-left: -5px;
    width: 0;
    border-top: 5px solid #000;
    border-top: 5px solid hsla(0, 0%, 20%, 0.9);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: " ";
    font-size: 0;
    line-height: 0;
  }

  /* Show tooltip content on hover */
  [data-longtooltip]:hover:before,
  [data-longtooltip]:hover:after {
    visibility: visible;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=100);
    opacity: 1;
  }


  .no-padding-left {
    padding-left: 0px;
  }
  .glicko-up {
    color: rgb(89,170,91);
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
    background-color: rgb(191,200,215);
    /*box-shadow: 1px 1px 1px rgb(150,159,176);*/
  }
  .first-place>.mdl-progress>.progressbar {
    background-color: rgb(89,182,91);
  }
  .second-place>.mdl-progress>.progressbar {
    background-color: rgb(89,91,182)
  }
  .third-place>.mdl-progress>.progressbar {
    background-color: rgb(182,89,91);
  }

  .worldname_link {
    color: inherit;
    text-decoration: none;
    font-weight: normal;
  }

  .worldname_link:hover {
    color: rgb(89,91,182);
    text-decoration: underline;
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
