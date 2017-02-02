<template>
  <div class="mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--12-col mdl-grid">

    <div v-if="!isValidMatch"
      class="mdl-shadow--2dp mdl-color--blue-grey-100 mdl-cell mdl-cell--12-col mdl-grid">
      <span v-if="dataReady">
        Match {{$route.params.matchid}} does not exist.
      </span>
      <span v-else>
        Data is loading...
      </span>
    </div>

    <matchheading v-if="isValidMatch && dataReady"></matchheading>

    <scoredetails v-if="isValidMatch && dataReady" :matchinfo="mtu" :worldlist="worldlist"
      :predictedglicko="formattedglicko"></scoredetails>

    <div v-if="dataReady && isValidMatch" class="mdl-shadow--2dp mdl-color--blue-grey-100 mdl-cell mdl-cell--12-col qlFlex">
      <div>
        <router-link v-if="match.worlds" :to="'/map/' + match.worlds.green">
          <MdlButton class="ql">
            <i class="material-icons">autorenew</i> Live Map
          </MdlButton>
        </router-link>
      </div>

      <div>
        <router-link v-if="match.worlds"
          :to="{ path: '/grapher', query: { server: getWorldById(match.worlds.green).name, data: null } }"
          >
          <MdlButton class="ql">
            <i class="material-icons">trending_up</i> Grapher
          </MdlButton>
        </router-link>
      </div>

      <div>
        <div id="ql-tzinfo" class="ql qlTz">
          Timezone Data:
        </div>
        <MdlTooltip target="ql-tzinfo">
          Timezone Info<br />
          Click a colored clock based on your server's color.
        </MdlTooltip>
        <router-link v-if="match.worlds" :to="'/timezones/' + match.worlds.green">
          <button id="qlTimezoneIconGreen" class="mdl-button mdl-js-button mdl-button--icon qlGreen">
            <i class="material-icons">schedule</i>
          </button>
          <MdlTooltip target="qlTimezoneIconGreen">
            Timezone Data - ({{getWorldById(match.worlds.green).name}})
          </MdlTooltip>
        </router-link>

        <router-link v-if="match.worlds" :to="'/timezones/' + match.worlds.blue">
          <button id="qlTimezoneIconBlue" class="mdl-button mdl-js-button mdl-button--icon qlBlue">
            <i class="material-icons">schedule</i>
          </button>
          <MdlTooltip target="qlTimezoneIconBlue">
            Timezone Data - ({{getWorldById(match.worlds.blue).name}})
          </MdlTooltip>
        </router-link>

        <router-link v-if="match.worlds" :to="'/timezones/' + match.worlds.red">
          <button id="qlTimezoneIconRed" class="mdl-button mdl-js-button mdl-button--icon qlRed">
            <i class="material-icons">schedule</i>
          </button>
          <MdlTooltip target="qlTimezoneIconRed">
            Timezone Data - ({{getWorldById(match.worlds.red).name}})
          </MdlTooltip>
        </router-link>
      </div>
    </div>

    <div class="mdl-shadow--2dp mdl-color--blue-grey-100 mdl-cell mdl-cell--12-col"
      id="rangeField">
      <center><h6>
        Custom Time Period
        <span v-if="cr_err" style="color: red"> - {{cr_err}}</span>
      </h6></center>
      <div class="fgrid">
        <div class="fgrid-col-512-12">
          <div class="centered">
            <span class="tp-label">Start Time:</span>
            <Flatpickr v-on:crchange="cr_start_value_change"
              :clr="clr" :start="match.start_time" :end="matchEndTime" class="flatpickr"></Flatpickr>
          </div>
        </div>
        <div class="fgrid-col-512-12">
          <div class="centered">
            <span class="tp-label">End Time:</span>
            <Flatpickr v-on:crchange="cr_end_value_change" :clr="clr"
              :start="match.start_time" :end="matchEndTime" class="flatpickr"></Flatpickr>
          </div>
        </div>
        <div class="fgrid-col-1-12">
          <div style="width: 76px; margin-left: auto; margin-right: auto;">
            <MdlButton style="height: 20px; line-height: 5px;" v-on:click="clearTimes()">Clear</MdlButton>
          </div>
        </div>
      </div>
    </div>

    <matchkd v-if="isValidMatch && dataReady" :match="mtu" :worldlist="worldlist"></matchkd>

    <matchpoints v-if="isValidMatch && dataReady" :match="mtu" :worldlist="worldlist"></matchpoints>

    <matchmapskd v-if="isValidMatch && dataReady" v-for="map in mtu.maps"
      :match="mtu" :worldlist="worldlist" :mapid="map"></matchmapskd>

    <div v-if="isValidMatch"
      class="mdl-shadow--2dp mdl-color--blue-grey-100 mdl-cell mdl-cell--12-col mdl-grid">
      <chart v-if='dataReady'
        chartname="ppt" chartdata="ppt" :match='graphMatch' :worldlist='worldlist'
        chartheight="360px" charttitle="PPT Evolution"></chart>

    </div>

    <div v-if="isValidMatch"
      class="mdl-shadow--2dp mdl-color--blue-grey-100 mdl-cell mdl-cell--12-col mdl-grid">
      <chart v-if='dataReady'
        chartname="scores" chartdata="scores" :match='graphMatch' :worldlist='worldlist'
        chartheight="360px" charttitle="Score Evolution"></chart>

    </div>
  </div>
</template>

<style>
  li.list_header {
    font-weight: bold;
    line-height: 28px;
  }

  .servername {
    display: flex;
  }

  .servername span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

<script>
  import Scoredetails from './Scoredetails'
  import Matchheading from './Matchheading'
  import Matchkd from './Matchkd'
  import Matchpoints from './Matchpoints'
  import Matchmapskd from './Matchmapskd'
  import Chart from './Chart'
  import MdlButton from './MdlButton'
  import MdlTooltip from './MdlTooltip'
  import Flatpickr from './Flatpickr'

  export default {
    name: 'MatchPage',

    data () {
      return {
        d: [],
        ms: [],
        matchId: null,
        match: {},
        graphMatch: null,
        clr: 0,
        cr_start: [],
        cr_end: [],
        cr_err: null,
        mtu: {} // match to use (mtu) in objects
      }
    },

    beforeRouteEnter (to, from, next) {
      const matchId = to.params.matchid
      if (matchId === undefined) {
        next(vm => {
          vm.matchId = null
        })
      } else {
        next(vm => {
          vm.matchId = matchId
        })
      }
    },

    methods: {
      getWorldById (id) {
        for (var i = 0; i < this.worldlist.length; i++) {
          let curWorld = this.worldlist[i]
          if(curWorld.id === id) {
            return curWorld
          }
        }
        return
      },

      cr_start_value_change (val) {
        this.cr_start = val
        this.update_cr()
      },

      cr_end_value_change (val) {
        this.cr_end = val
        this.update_cr()
      },

      clearTimes () {
        this.clr += 1
        this.cr_err = null
      },

      update_cr () {
        if (this.cr_start.length && this.cr_end.length) {
          var t = this.validateDates()
          if (t === null) {
            this.mtu = this.match
            return
          }
          this.$store.dispatch('FETCH_DATA_RANGE', {
            start: this.cr_start[0].toISOString(),
            end: this.cr_end[0].toISOString(),
            match: this.matchId
          }).then( (result) => {
            this.mtu = result
          })
        } else {
          this.mtu = this.match
        }
      },

      validateDates () {
        const start = this.cr_start[0]
        const end   = this.cr_end[0]
        const match_start = new Date(+new Date(this.match.start_time) + 900000)
        const match_end = new Date(this.match.end_time)
        const now   = new Date()

        if (+start > +now || +start < +match_start || +start > +match_end) {
          this.cr_err = "Start time outside allowed time."
          return null
        }

        if (+end > +now || +end > +match_end || +end < +match_start) {
          this.cr_err = "End time outside allowed time."
          return null
        }

        if (+start === +end) {
          this.cr_err = "Start time equals end time."
          return null
        }

        if (+start > +end) {
          this.cr_err = "Start time is after end time."
          return null
        }

        this.cr_err = null
        return 1
      }
    },

    computed: {
      matches () {
        return this.$store.state.matches
      },

      worldlist () {
        return this.$store.state.worlds
      },

      officialglicko () {
        return this.$store.state.glicko
      },

      predictedglicko () {
        return this.$store.state.predictedglicko
      },

      isValidMatch () {
        var ret = false
        var i;
        if (!this.dataReady) {
          return ret
        } else {
          for (i = 0; i < this.matches.length; i++) {
            if (this.matches[i].id === this.matchId) {
              this.match = this.matches[i]
              this.update_cr()
              if (!this.graphMatch) {
                this.graphMatch = this.matches[i]
              } else {
                if (this.graphMatch.id !== this.matches[i].id) {
                  this.graphMatch = this.matches[i]
                }
              }
              ret = true
              return ret
            }
          }
        }
        return ret
      },

      matchEndTime () {
        // + shortcut for unix timestamp
        const today = +new Date()
        const met = +new Date(this.match.end_time)
        return today < met ? today : met
      },

      dataReady () {
        return this.worldlist.length > 0 && this.matches.length > 0
      },

      formattedglicko () {
        var glicko = this.predictedglicko
        var ret = {}

        if (glicko === null || glicko === undefined) {
          return
        }

        for (var i = 0; i < this.predictedglicko.length; i++) {
          var cg = this.predictedglicko[i]
          ret[cg.id] = cg.glicko
        }

        return ret
      }
    },

    filters: {
      round: function (value, accuracy, keep) {
        if (typeof value !== 'number') return value

        var fixed = value.toFixed(accuracy)

        return keep ? fixed : +fixed
      }

    },

    components: {
      Scoredetails,
      Matchheading,
      Matchkd,
      Matchpoints,
      Matchmapskd,
      Chart,
      MdlButton,
      MdlTooltip,
      Flatpickr
    }

  }
</script>

<style>
  .ql {
    color: #555;
  }

  .qlGreen {
    color: rgb(89,182,91);
  }

  .qlBlue {
    color: rgb(89,91,182);
  }

  .qlRed {
    color: rgb(182,89,91);
  }

  .ql, .qlGreen, .qlBlue, .qlRed {
    text-decoration: none;
  }

  .qlFlex {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    padding: 3px;
  }

  .qlTz {
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 0;
    display: inline-block;
    position: relative;
    margin: 0;
    vertical-align: middle;
    outline: none;
    line-height: 36px;
    text-align: center;
  }
  .qlNoHover {
    padding-right: 3px;
  }

  .qlNoHover:hover, .qlNoHover:active {
    background-color: inherit !important;
    cursor: default !important;
  }

  [class*='fgrid'],
  [class*='fgrid-col-'],
  [class*='mobile-'],
  .grid:after {
  	-webkit-box-sizing: border-box;
  	-moz-box-sizing: border-box;
  	box-sizing: border-box;
  }

  [class*='fgrid-col-'] {
	   float: left;
     min-height: 1px;
     padding-right: 20px; /* column-space */
   }

  [class*='fgrid-col-'] [class*='fgrid-col-']:last-child {
    padding-right: 0;
  }

  .fgrid {
  	width: 100%;
  	max-width: 1140px;
  	min-width: 748px; /* when using padded grid on ipad in portrait mode, width should be viewport-width - padding = (768 - 20) = 748. actually, it should be even smaller to allow for padding of grid containing element */
  	margin: 0 auto;
  	overflow: hidden;
  }

  .fgrid:after {
  	content: "";
  	display: table;
  	clear: both;
  }

  .fgrid-col-512-12 {
    width: 44.444441667%;
  }
  .fgrid-col-1-12 {
    width: 11.110833333%
  }

  #rangeField {
    height: 80px;
  }

  #rangeField h6 {
    margin-bottom: 7px;
    margin-top: 10px;
  }

  @media handheld, only screen and (max-width: 767px) {
  	.fgrid {
  		width: 100%;
  		min-width: 0;
  		margin-left: 0;
  		margin-right: 0;
  		padding-left: 20px; /* grid-space to left */
  		padding-right: 10px; /* grid-space to right: (grid-space-left - column-space) e.g. 20px-10px=10px */
  	}

    [class*='fgrid-col-'] {
      width: auto;
      float: none;
      margin: 10px 0;
      padding-left: 0;
      padding-right: 10px; /* column-space */
    }

    [class*='fgrid-col-'] [class*='fgrid-col-'] {
      padding-right: 0;
    }

    #rangeField {
      height: 145px;
    }
  }

  .slider {
    padding-left:20px;
    min-width: 260px;
  }

  .flatpickr {
    width: 170px;
    border: 1px solid #757575;
    border-radius: 2px;
  }

  .centered {
    width: 260px;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 5px;
  }

  .tp-label {
    display: inline-block;
    width: 80px;
  }
</style>
