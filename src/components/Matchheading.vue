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
      <div class="mdl-grid wvw-mh"> <span id="mh-ppt">PPT</span> </div>
      <MdlTooltip target="mh-ppt">
        Points Per Tick (5 min)
      </MdlTooltip>
    </div>
    <div class="mdl-cell--3-col mdl-cell--2-col-phone mdl-cell--2-col-tablet mdl-grid">
      <div class="mdl-grid mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet">
        <div id="mh-camp" style="display: inline-block; margin-left: -4px;">
          <img height="22" width="22" src="/static/img/camp.png">
        </div>
        <MdlTooltip target="mh-camp">
          Camp - 2 Points
        </MdlTooltip>
      </div>
      <div class="mdl-grid mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet">
        <div id="mh-tower" style="display: inline-block; margin-left: -4px;">
          <img height="18" width="18" src="/static/img/tower.png">
        </div>
        <MdlTooltip target="mh-tower">
          Tower - 4 Points
        </MdlTooltip>
      </div>
      <div class="mdl-grid mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet">
        <div id="mh-keep" style="display: inline-block; margin-left: -4px;">
          <img height="20" width="20" src="/static/img/keep.png">
        </div>
        <MdlTooltip target="mh-keep">
          Keep - 8 Points
        </MdlTooltip>
      </div>
      <div class="mdl-grid mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet">
        <div id="mh-castle" style="display: inline-block; margin-left: -4px;">
          <img height="20" width="20" src="/static/img/castle.png">
        </div>
        <MdlTooltip target="mh-castle">
          Castle - 12 Points
        </MdlTooltip>
      </div>
    </div>
    <div class="mdl-cell--1-col mdl-grid no-padding-left mdl-cell--hide-phone mdl-cell--hide-tablet">
      <div class="mdl-cell wvw-mh" id="mh-rating"> Rating </div>
      <MdlTooltip target="mh-rating">
        Predicted Glicko Rating
      </MdlTooltip>
    </div>
    <div class="mdl-cell--1-col mdl-grid mdl-cell--hide-phone mdl-cell--hide-tablet">
      <div class="mdl-cell wvw-mh" id="mh-change"> Change </div>
      <MdlTooltip target="mh-change">
        Change in Glicko Rating from Beginning of Week
      </MdlTooltip>
    </div>
  </div>
</template>

<script>
  import MdlTooltip from './MdlTooltip'
  export default {
    components: {
      MdlTooltip
    }
  }
</script>

<style>
  .wvw-mh {
    font-weight: bold;
  }
</style>
