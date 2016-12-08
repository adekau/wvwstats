<template>
  <div
    class="mdl-shadow--2dp mdl-color--blue-grey-100 mdl-cell mdl-cell--6-col
    mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-grid">

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
          {{ match.kills.green }}
        </li>
        <li>
          {{ match.kills.blue }}
        </li>
        <li>
          {{ match.kills.red }}
        </li>
      </ul>
    </div>

    <div class="mdl-cell--2-col mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-grid">
      <ul class="mdl-list" style="width: 100%;">
        <li class="list_header">
          Deaths
        </li>
        <li>
          {{ match.deaths.green }}
        </li>
        <li>
          {{ match.deaths.blue }}
        </li>
        <li>
          {{ match.deaths.red }}
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
          {{ match.deaths.green + match.kills.green }}
        </li>
        <li>
          {{ match.deaths.blue + match.kills.blue }}
        </li>
        <li>
          {{ match.deaths.red + match.kills.red }}
        </li>
      </ul>
    </div>

    <div class="mdl-cell--2-col mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-grid">
      <ul class="mdl-list" style="width: 100%;">
        <li class="list_header">
          K/D
        </li>
        <li>
          {{ match.kills.green / match.deaths.green }}
        </li>
        <li>
          {{ match.kills.blue / match.deaths.blue }}
        </li>
        <li>
          {{ match.kills.red / match.deaths.red }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style></style>

<script>
  export default {
    props: ['match', 'worldlist'],
    methods: {
      getWorldById (id) {
        for (var i = 0; i < this.worldlist.length; i++) {
          let curWorld = this.worldlist[i]
          if(curWorld.id === id) {
            return curWorld
          }
        }
        return
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
