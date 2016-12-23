<template>
  <div class="mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--12-col mdl-grid">
    <h4 class="mdl-color-text--blue-grey-600 mdl-cell--12-col"
      style="margin-left: 6px; border-bottom: 1px solid grey;">
      Embed Options
    </h4>

    <p class="form_holder">
      <legend><b>Server Selection</b></legend>
    </p>
    <br>
    <p class="form_holder">
      <label for='worldSelect'>Server: &nbsp;</label>
      <select id='worldSelect' v-model="selectedWorld" :disabled="worldlist.length === 0">
        <option v-for="world in sorted_worldlist">
          {{world.name}}
        </option>
      </select>
    </p>
    <br>
    <p class="form_holder">
      <legend><b>Size</b></legend>
    </p>
    <br>
    <p class="form_holder">
      Height: <input type="text" v-model="height">px
    </p>
    <br>
    <p class="form_holder">
      <legend><b>Orientation</b></legend>
    </p>
    <br>
    <p class="form_holder">
      <input type="radio" id="horizontal-rb" value="Horizontal" v-model="orientation">
      <label for="horizontal-rb">Horizontal</label>
    </p>
    <br>
    <p class="form_holder">
      <input type="radio" id="vertical-rb" value="Vertical" v-model="orientation">
      <label for="vertical-rb">Vertical</label>
    </p>
    <br>
    <p class="form_holder">
      <input type="radio" id="auto-rb" value="Auto" v-model="orientation">
      <label for="auto-rb">Auto (Automatically switch between horizontal and vertical based on width)</label>
    </p>
    <br>
    <p class="form_holder">
      <legend><b>Background Color</b></legend>
    </p>
    <br>
    <p class="form_holder">
      <input id="cpicker" @change="colorSwap">

    </p>
    <br>
    <p class="form_holder">
      <legend><b>Misc.</b></legend>
    </p>
    <br>
    <p class="form_holder">
      <input type="checkbox" id="header-cb" v-model="header">
      <label for="header-cb">Hide Match Header (Legend)</label>
    </p>

    <h4 class="mdl-color-text--blue-grey-600 mdl-cell--12-col"
      style="margin-left: 6px; border-bottom: 1px solid grey;">
      Output Code
    </h4>

    <textarea id="output" rows=10 cols=162 style="width: 100%; height: 200px;">
      {{src.trim()}}
    </textarea>

  </div>
</template>

<style>
  .form_holder {
    width: 100%;
    margin-bottom: 11px;
    display: inline-block;
  }

  .form_holder legend {
    margin-left: 0px;
    font-weight: bolder;
    font-size: 15px;
    text-decoration: underline;
  }
</style>

<script>
  export default {
    name: 'Embed',

    data () {
      return {
        sorted_worldlist: [],
        orientation: 'Horizontal',
        color: 'CFD8DC',
        selectedWorld: '',
        header: false,
        height: 400
      }
    },

    mounted () {
      var input = document.getElementById('cpicker')
      var picker = new jscolor(input)
      picker.fromString('CFD8DC')
      if (!this.sorted_worldlist[0]) {
        this.sortWorlds(this.worldlist)
      }
    },

    updated () {
      if (!this.sorted_worldlist[0]) {
        this.sortWorlds(this.worldlist)
      }
    },

    methods: {
      colorSwap () {
        var el = document.getElementById('cpicker')
        this.color = el.value
      },

      sortWorlds (list) {
        this.sorted_worldlist =  list.sort((a, b) => {
          return a.name - b.name
        })
      }
    },

    computed: {
      worldlist () {
        return this.$store.state.worlds
      },

      src () {
        if (this.selectedWorld === "") {
          return "Select a server."
        }
        let orientation = this.orientation.toLowerCase()
        let color = this.color
        let header = this.header
        let world;
        for (var i = 0; i < this.worldlist.length; i++) {
          let curWorld = this.worldlist[i]
          if(curWorld.name === this.selectedWorld) {
            world = curWorld.id
          }
        }
        let height = this.height

        var ret = "<iframe frameborder=\"0\" src='http://wvwstats.com/embed#/?world="
        ret += world + "&color=" + color + "&" + orientation
        if (header) {
          ret += "&noheader"
        }
        ret += "' style='width: 100%; min-width: 243px; height: " + height + "px;'>"

        return ret
      }

    }
  }

</script>
