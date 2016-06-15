<template>
  <div class="mdl-shadow--2dp mdl-color--blue-grey-100 mdl-cell mdl-cell--12-col mdl-grid">
    <div class="mdl-cell--2-col mdl-cell--2-col-phone mdl-cell--2-col-tablet mdl-grid">
      <ul class="mdl-list">
        <li>
          <span data-tooltip="{{ greenServers }}">
            {{worldinfo.green}}
          </span>

        </li>
        <li>
          <span data-tooltip="{{ blueServers }}">
            {{worldinfo.blue}}
          </span>
        </li>
        <li>
          <span data-tooltip="{{ redServers }}">
            {{worldinfo.red}}
          </span>
        </li>
      </ul>
      <!-- Tooltips for world names -->

    </div>
    <div class="mdl-cell--3-col mdl-cell--2-col-phone mdl-cell--2-col-tablet mdl-grid">
      <ul class="mdl-list" style="width: 100%;">
        <li>
          <div class="first-place" style="padding: 10px;">

            <div data-longtooltip=
              "{{worldinfo.blue}}: {{ scoreDiff.green.blue }} &#xa; {{worldinfo.red}}: {{ scoreDiff.green.red}}"
              v-progress="greenPercent" class="mdl-progress mdl-js-progress">
            </div>

          </div>
        </li>
        <li>
          <div class="second-place" style="padding: 10px;">

            <div data-longtooltip=
              "{{worldinfo.green}}: {{ scoreDiff.blue.green }} &#xa; {{worldinfo.red}}: {{ scoreDiff.blue.red}}"
              v-progress="bluePercent" class="mdl-progress mdl-js-progress">
            </div>

          </div>
        </li>
        <li>
          <div class="third-place" style="padding: 10px;">

            <div data-longtooltip=
              "{{worldinfo.green}}: {{ scoreDiff.red.green }} &#xa; {{worldinfo.blue}}: {{ scoreDiff.red.blue}}"
              v-progress="redPercent" class="mdl-progress mdl-js-progress">
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
          <ul style="text-align: left; list-style: none; margin-left: -25px;">
            <li>{{camps.green}}</li>
            <li>{{camps.blue}}</li>
            <li>{{camps.red}}</li>
          <ul>
        </div>
        <div class="mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet">
          <ul style="text-align: left; list-style: none; margin-left: -25px;">
            <li>{{towers.green}}</li>
            <li>{{towers.blue}}</li>
            <li>{{towers.red}}</li>
          <ul>
        </div>
        <div class="mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet">
          <ul style="text-align: left; list-style: none; margin-left: -25px;">
            <li>{{keeps.green}}</li>
            <li>{{keeps.blue}}</li>
            <li>{{keeps.red}}</li>
          <ul>
        </div>
        <div class="mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet">
          <ul style="text-align: left; list-style: none; margin-left: -25px;">
            <li>{{castles.green}}</li>
            <li>{{castles.blue}}</li>
            <li>{{castles.red}}</li>
          <ul>
        </div>
      </div>
      <div class="mdl-cell--1-col mdl-grid no-padding-left mdl-cell--hide-phone mdl-cell--hide-tablet">
        <ul class="mdl-list">
          <li>
            {{glicko.green | round 3 true}}
          </li>
          <li>
            {{glicko.blue | round 3 true}}
          </li>
          <li>
            {{glicko.red | round 3 true}}
          </li>
        </ul>
      </div>
      <div class="mdl-cell--1-col mdl-grid mdl-cell--hide-phone mdl-cell--hide-tablet">
        <ul class="mdl-list">
          <li>
            <span v-show="isPositive(glicko.delta.green)" class="glicko glicko-up">
              <!-- <img width="12" height="12" src="../assets/uparrow.png"> -->
              {{glicko.delta.green | round 3 true}}
            </span>
            <span v-show="!isPositive(glicko.delta.green)" class="glicko glicko-down">
              <!-- <img width="12" height="12" src="../assets/downarrow.png"> -->
              {{glicko.delta.green | round 3 true}}
            </span>
          </li>
          <li>
            <span v-show="isPositive(glicko.delta.blue)" class="glicko glicko-up">
              <!-- <img width="12" height="12" src="../assets/uparrow.png"> -->
              {{glicko.delta.blue | round 3 true}}
            </span>
            <span v-show="!isPositive(glicko.delta.blue)" class="glicko glicko-down">
              <!-- <img width="12" height="12" src="../assets/downarrow.png"> -->
              {{glicko.delta.blue | round 3 true}}
            </span>
          </li>
          <li>
            <span v-show="isPositive(glicko.delta.red)" class="glicko glicko-up">
              <!-- <img width="12" height="12" src="../assets/uparrow.png"> -->
              {{glicko.delta.red | round 3 true}}
            </span>
            <span v-show="!isPositive(glicko.delta.red)" class="glicko glicko-down">
              <!-- <img width="12" height="12" src="../assets/downarrow.png"> -->
              {{glicko.delta.red | round 3 true}}
            </span>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        greenPercent: 100,
        bluePercent: 67,
        redPercent: 59
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
    margin-left: -85px;
    padding: 7px;
    width: 170px;
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
    margin-left: -85px;
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
</style>
