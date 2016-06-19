<template>
  <div class="mdl-shadow--2dp mdl-color--blue-grey-100 mdl-cell mdl-cell--12-col mdl-grid">
    <div class="mdl-cell--2-col mdl-cell--2-col-phone mdl-cell--2-col-tablet mdl-grid">
      <div class="mdl-cell wvw-mh"> Servers </div>
    </div>
    <div class="mdl-cell--3-col mdl-cell--2-col-phone mdl-cell--2-col-tablet mdl-grid">
      <div class="mdl-cell wvw-mh" style="width: auto;"> Score Percent </div>
    </div>
    <div class="mdl-cell--1-col mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-grid">
      <div class="mdl-grid wvw-mh"> Score </div>
    </div>
    <div class="mdl-cell--1-col mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-grid">
      <div class="mdl-grid wvw-mh"> <span data-tooltip="Points Per Tick (15 min)">PPT</span> </div>
    </div>
    <div class="mdl-cell--3-col mdl-cell--2-col-phone mdl-cell--2-col-tablet mdl-grid">
      <div class="mdl-grid mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet">
        <div data-tooltip="Camp - 5 Points" style="display: inline-block; margin-left: -4px;">
          <img height="22" width="22" src="/static/img/camp.png">
        </div>
      </div>
      <div class="mdl-grid mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet">
        <div data-tooltip="Tower - 10 Points" style="display: inline-block; margin-left: -4px;">
          <img height="18" width="18" src="/static/img/tower.png">
        </div>
      </div>
      <div class="mdl-grid mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet">
        <div data-tooltip="Keep - 25 Points" style="display: inline-block; margin-left: -4px;">
          <img height="20" width="20" src="/static/img/keep.png">
        </div>
      </div>
      <div class="mdl-grid mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet">
        <div data-tooltip="Castle - 35 Points" style="display: inline-block; margin-left: -4px;">
          <img height="20" width="20" src="/static/img/castle.png">
        </div>
      </div>
    </div>
    <div class="mdl-cell--1-col mdl-grid no-padding-left mdl-cell--hide-phone mdl-cell--hide-tablet">
      <div class="mdl-cell wvw-mh" data-tooltip="Predicted Glicko Rating"> Rating </div>
    </div>
    <div class="mdl-cell--1-col mdl-grid mdl-cell--hide-phone mdl-cell--hide-tablet">
      <div class="mdl-cell wvw-mh" data-tooltip="Change in Glicko Rating from Beginning of Week"> Change </div>
    </div>
  </div>
</template>

<style>
  .wvw-mh {
    font-weight: bold;
  }
</style>
