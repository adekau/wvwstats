<template>
  <div class="mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--12-col mdl-grid">

    <div v-if="!isValidMatch"
      class="mdl-shadow--2dp mdl-color--blue-grey-100 mdl-cell mdl-cell--12-col mdl-grid">
      Invalid match id
    </div>

    <matchheading v-if="isValidMatch"></matchheading>
    <scoredetails v-if="isValidMatch" :matchinfo="match" :worldlist="worldlist"
      :officialglicko="officialglicko"></scoredetails>

    <!-- Todo: Should change both of these to use computed properties for server name
               to prevent them from occasionally being blank on page load when
               it takes awhile to fetch worldlist -->
    <matchkd :match="match" :worldlist="worldlist"></matchkd>
    <matchpoints :match="match" :worldlist="worldlist"></matchpoints>
    <matchmapskd v-for="map in match.maps"
      :match="match" :worldlist="worldlist" :mapid="map"></matchmapskd>

    <div class="mdl-shadow--2dp mdl-color--blue-grey-100 mdl-cell mdl-cell--12-col mdl-grid">
      <div id="chart_div" style="width:100%; height: 360px;"></div>
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
  import store from '../store'
  import Scoredetails from './Scoredetails.vue'
  import Matchheading from './Matchheading.vue'
  import Matchkd from './Matchkd.vue'
  import Matchpoints from './Matchpoints.vue'
  import Matchmapskd from './Matchmapskd.vue'

  export default {
    data () {
      return {
        worldlist: [],
        matchId: 0,
        matches: [],
        match: {},
        officialglicko: {},
        data: null,
        options: [],
        raw: []
      }
    },

    ready () {
      window.google.charts.load('current', {
        'packages': ['corechart', 'line']
      });
      window.google.charts.setOnLoadCallback(this.drawChart);
      window.onresize = this.resizeChart;
    },

    route: {
      data ({ to }) {
        // TODO change this when updating the store...
        if (this.data) {
          setTimeout(() => {
            this.redrawChartData()
          }, 500)
        }
        return {
          worldlist: store.fetchWorlds(),
          matchId: this.$route.params.matchid,
          matches: store.fetchMatches(),
          officialglicko: store.fetchGlicko()
        }
      }
    },

    created () {
      store.on('matches-updated', this.updateMatches)
      store.on('matches-updated', this.updateWorlds)
      store.on('glicko-updated', this.updateGlicko)
    },

    destroyed () {
      store.destroyed('matches-updated', this.updateMatches)
      store.destroyed('matches-updated', this.updateWorlds)
      store.destroyed('glicko-updated', this.updateGlicko)
    },

    methods: {
      updateMatches () {
        this.matches = store.fetchMatches()
      },

      updateWorlds () {
        this.worldlist = store.fetchWorlds()
      },

      updateGlicko () {
        this.officialglicko = store.fetchGlicko()
      },

      getWorldById (id) {
        for (var i = 0; i < this.worldlist.length; i++) {
          let curWorld = this.worldlist[i]
          if(curWorld.id === id) {
            return curWorld
          }
        }
        return
      },

      drawChart () {
        store.fetchArchiveData(this.matchId, 'ppt', this.match.start_time, this.match.end_time)
          .then((response)=> {
            this.raw = response.data
            this.data = new window.google.visualization.DataTable();
            this.data.addColumn('datetime', 'Date')
            this.data.addColumn('number', this.getWorldById(this.match.worlds.green).name)
            this.data.addColumn('number', this.getWorldById(this.match.worlds.blue).name)
            this.data.addColumn('number', this.getWorldById(this.match.worlds.red).name)

            for (var i = 0; i < this.raw.length; i++) {
            	var date = new Date(this.raw[i].snapshot_time)
              var red = this.raw[i].ppt.red
              var blue = this.raw[i].ppt.blue
              var green = this.raw[i].ppt.green
            	this.data.addRow([date, green, blue, red])
            }

            this.options = {
              //title: 'Dragonbrand vs Tarnished Coast vs Blackgate PPT Evolution',
              chartArea: {width: '84%', backgroundColor: '#ECF1F5'},
              legend: 'top',
              backgroundColor: '#CFD8DC',
              hAxis: {
                title: 'Date',
                titleTextStyle: {
                  color: '#333'
                }
              },
              vAxis: {
                minValue: 0
              },
              explorer: {
              	//axis: 'horizontal',
                keepInBounds: true,
                actions: ['dragToZoom', 'rightClickToReset'],
                maxZoomOut: 0
               },
              focusTarget: 'category',
              colors: ['#59B65B','#595BB6','#B6595B'],
              lineWidth: 1
            };

            var chart = new window.google.visualization.LineChart(document.getElementById('chart_div'));
            chart.draw(this.data, this.options);
          })
      },

      resizeChart() {
        var chart = new window.google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(this.data, this.options);
      },

      redrawChartData() {
        store.fetchArchiveData(this.matchId, 'ppt', this.match.start_time, this.match.end_time)
          .then((response)=> {
            this.raw = response.data
            this.data = new window.google.visualization.DataTable();
            this.data.addColumn('datetime', 'Date')
            this.data.addColumn('number', this.getWorldById(this.match.worlds.green).name)
            this.data.addColumn('number', this.getWorldById(this.match.worlds.blue).name)
            this.data.addColumn('number', this.getWorldById(this.match.worlds.red).name)

            for (var i = 0; i < this.raw.length; i++) {
            	var date = new Date(this.raw[i].snapshot_time)
              var red = this.raw[i].ppt.red
              var blue = this.raw[i].ppt.blue
              var green = this.raw[i].ppt.green
            	this.data.addRow([date, green, blue, red])
            }

            var chart = new window.google.visualization.LineChart(document.getElementById('chart_div'));
            chart.draw(this.data, this.options);
          })
      }
    },

    computed: {
      isValidMatch () {
        var ret = false;
        if (this.matches !== [] && this.matches !== undefined) {
          for (var i = 0; i < this.matches.length; i++) {
            if (this.matches[i].id === this.matchId) {
              this.match = this.matches[i]
              ret = true
              return ret
            }
          }
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
      Matchmapskd
    }

  }
</script>
