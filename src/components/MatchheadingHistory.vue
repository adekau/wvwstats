<template>
  <div class="mdl-shadow--2dp mdl-color--blue-grey-100 mdl-cell mdl-cell--12-col mdl-grid">
    <div class="mdl-cell--2-col mdl-cell--2-col-phone mdl-cell--2-col-tablet mdl-grid">
      <div class="mdl-cell wvw-mh"> Server </div>
    </div>
    <div class="mdl-cell--3-col mdl-cell--2-col-phone mdl-cell--2-col-tablet mdl-grid">
      <div class="mdl-cell wvw-mh" style="width: auto;"> Score Percent </div>
    </div>
    <div class="mdl-cell--1-col mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-grid">
      <div class="mdl-grid wvw-mh"> Score </div>
    </div>
    <div class="mdl-cell--1-col mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-grid">
      <div class="mdl-grid wvw-mh"> K/D </div>
    </div>
    <div class="mdl-cell--1-col mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-grid">
      <div class="mdl-grid wvw-mh"> <span :id="'mhh-activity' + randomNumber()"> Activity </span> </div>
      <MdlTooltip :target="'mhh-activity' + randomNumber()">
        Kills + Deaths
      </MdlTooltip>
    </div>
    <div class="mdl-cell--1-col mdl-cell--hide-phone mdl-cell--hide-tablet mdl-grid">
      <div class="mdl-grid wvw-mh"> <span :id="'mhh-srating' + randomNumber()"> S.Rating </span> </div>
      <MdlTooltip :target="'mhh-srating' + randomNumber()">
        Start Rating
      </MdlTooltip>
    </div>
    <div class="mdl-cell--1-col mdl-grid no-padding-left mdl-cell--hide-phone mdl-cell--hide-tablet">
      <div class="mdl-cell wvw-mh"> <span :id="'mhh-erating' + randomNumber()"> E.Rating </span> </div>
      <MdlTooltip :target="'mhh-erating' + randomNumber()">
        End Rating
      </MdlTooltip>
    </div>
    <div class="mdl-cell--1-col mdl-grid mdl-cell--hide-phone mdl-cell--hide-tablet">
      <div class="mdl-cell wvw-mh">  <span :id="'mhh-change' + randomNumber()"> Change </span> </div>
      <MdlTooltip :target="'mhh-change' + randomNumber()">
        Change in Glicko Rating from Beginning of Week
      </MdlTooltip>
    </div>
    <div class="mdl-cell--1-col mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-grid">
      <div class="mdl-cell wvw-mh"> <span :id="'mhh-view' + randomNumber()"> View </span> </div>
      <MdlTooltip :target="'mhh-view' + randomNumber()">
        View Match Details (Coming Soon)
      </MdlTooltip>
    </div>
  </div>
</template>

<script>
  import MdlTooltip from './MdlTooltip'
  export default {
    data () {
      return {
        trandomNumber: null
      }
    },

    components: {
      MdlTooltip
    },

    methods: {
      randomNumber () {
        const r = 55 * Math.random()
        if (this.trandomNumber) {
          return this.trandomNumber
        } else {
          this.trandomNumber = r
          return r
        }
      }
    }
  }
</script>

<style>
  .wvw-mh {
    font-weight: bold;
  }
</style>
