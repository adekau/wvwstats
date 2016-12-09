<!-- Pass this vue the an index for the map array as well as the match object.-->

<template>
  <div
    class="mdl-shadow--2dp mdl-color--blue-grey-100 mdl-cell mdl-cell--6-col
    mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-grid">

    <div class="mdl-cell--12-col mdl-cell--4-col-phone mdl-cell--8-col-tablet">
      <center>
        <h6>{{getMapName()}}</h6>
      </center>
    </div>

    <div class="mdl-cell--4-col mdl-cell--2-col-phone mdl-cell--3-col-tablet mdl-grid">
      <ul class="mdl-list" style="width: 100%;">
        <li class="list_header">
          Server
        </li>
        <li class="servername">
          <span>{{ getWorldById(match.worlds.green).name }}</span>
        </li>
        <li class="servername">
          <span>{{ getWorldById(match.worlds.blue).name }}</span>
        </li>
        <li class="servername">
          <span>{{ getWorldById(match.worlds.red).name }}</span>
        </li>
      </ul>
    </div>

    <div class="mdl-cell--2-col mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-grid">
      <ul class="mdl-list" style="width: 100%;">
        <li class="list_header">
          Kills
        </li>
        <li>
          {{ mapid.kills.green }}
        </li>
        <li>
          {{ mapid.kills.blue }}
        </li>
        <li>
          {{ mapid.kills.red }}
        </li>
      </ul>
    </div>

    <div class="mdl-cell--2-col mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-grid">
      <ul class="mdl-list" style="width: 100%;">
        <li class="list_header">
          Deaths
        </li>
        <li>
          {{ mapid.deaths.green }}
        </li>
        <li>
          {{ mapid.deaths.blue }}
        </li>
        <li>
          {{ mapid.deaths.red }}
        </li>
      </ul>
    </div>

    <div class="mdl-cell--2-col mdl-cell--hide-tablet
      mdl-cell--hide-desktop mdl-cell--2-col-phone mdl-cell--1-col-tablet mdl-grid">
    </div>

    <div class="mdl-cell--2-col mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-grid">
      <ul class="mdl-list" style="width: 100%;">
        <li class="list_header">
          <span data-tooltip="Kills + Deaths">Activity</span>
        </li>
        <li>
          {{ mapid.deaths.green + mapid.kills.green }}
        </li>
        <li>
          {{ mapid.deaths.blue + mapid.kills.blue }}
        </li>
        <li>
          {{ mapid.deaths.red + mapid.kills.red }}
        </li>
      </ul>
    </div>

    <div class="mdl-cell--2-col mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-grid">
      <ul class="mdl-list" style="width: 100%;">
        <li class="list_header">
          K/D
        </li>
        <li>
          {{ round(mapid.kills.green / mapid.deaths.green, 3, false) }}
        </li>
        <li>
          {{ round(mapid.kills.blue / mapid.deaths.blue, 3, false) }}
        </li>
        <li>
          {{ round(mapid.kills.red / mapid.deaths.red, 3, false) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style></style>

<script>
  export default {
    props: ['match', 'worldlist', 'mapid'],

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

      round (value, accuracy, keep) {
        if (typeof value !== 'number') return value

        var fixed = value.toFixed(accuracy)

        return keep ? fixed : +fixed
      },

      getMapName () {
        if (this.mapid.type.toLowerCase() === 'redhome') {
          return this.getWorldById(this.match.worlds.red).name + ' Borderlands'
        } else if (this.mapid.type.toLowerCase() === 'bluehome') {
          return this.getWorldById(this.match.worlds.blue).name + ' Borderlands'
        } else if (this.mapid.type.toLowerCase() === 'greenhome') {
          return this.getWorldById(this.match.worlds.green).name + ' Borderlands'
        } else {
          return 'Eternal Battlegrounds'
        }
      }
    }
  }
</script>
