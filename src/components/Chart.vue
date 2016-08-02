<template>
  <div id="{{chartname}}_chart" style="width:100%; height: {{chartheight}};"></div>
</template>

<script>
  import store from '../store'
  export default {
    data () {
      return {
        raw: [],
        data: null,
        options: {}
      }
    },

    props: ['match', 'worldlist', 'chartname', 'chartdata', 'chartheight',
      'charttitle', 'redraw'],

    ready () {
      if (store.fetchGoogleChartsLoaded()) {
        this.drawChart()
      }
      window.addEventListener('resize', this.handleResize)
    },

    created () {
      store.on('charts-loaded', this.drawChart)
    },

    destroyed () {
      store.removeListener('charts-loaded', this.drawChart)
    },

    methods: {
      drawChart () {
        if (!this.match || !this.chartdata) {
          return
        }

        if (this.chartdata === 'k/d') {
          store.fetchArchiveData(this.match.id, 'kills,deaths', this.match.start_time, this.match.end_time)
            .then((response)=> {
              for (var i = 0; i < response.data.length; i++) {
                var obj = response.data[i]
                obj.kd = {}
                Object.keys(obj.kills).forEach((key) => {
                  obj.kd[key] = obj.kills[key] / obj.deaths[key]
                })
              }
              this.finishDrawChart(response, 'kd')
            })
        } else if (this.chartdata === 'activity (k+d)') {
          store.fetchArchiveData(this.match.id, 'kills,deaths', this.match.start_time, this.match.end_time)
            .then((response)=> {
              for (var i = 0; i < response.data.length; i++) {
                var obj = response.data[i]
                obj.activity = {}
                Object.keys(obj.kills).forEach((key) => {
                  obj.activity[key] = obj.kills[key] + obj.deaths[key]
                })
              }
              this.finishDrawChart(response, 'activity')
            })
        } else if (this.chartdata === 'Score from PPK (as percent)') {
          store.fetchArchiveData(this.match.id, 'kills,scores', this.match.start_time, this.match.end_time)
            .then((response)=> {
              for (var i = 0; i < response.data.length; i++) {
                var obj = response.data[i]
                obj.pppk = {}
                Object.keys(obj.kills).forEach((key) => {
                  obj.pppk[key] = (obj.kills[key] * 2) / obj.scores[key]
                })
              }
              this.finishDrawChart(response, 'pppk')
            })
        } else if (this.chartdata === 'Score from PPT (as percent)') {
          store.fetchArchiveData(this.match.id, 'kills,scores', this.match.start_time, this.match.end_time)
            .then((response)=> {
              for (var i = 0; i < response.data.length; i++) {
                var obj = response.data[i]
                obj.pppt = {}
                Object.keys(obj.kills).forEach((key) => {
                  obj.pppt[key] = (obj.scores[key] - (obj.kills[key] * 2)) / obj.scores[key]
                })
              }
              this.finishDrawChart(response, 'pppt')
            })
        } else if (this.chartdata === 'Score from PPT') {
          store.fetchArchiveData(this.match.id, 'kills,scores', this.match.start_time, this.match.end_time)
            .then((response)=> {
              for (var i = 0; i < response.data.length; i++) {
                var obj = response.data[i]
                obj.sppt = {}
                Object.keys(obj.kills).forEach((key) => {
                  obj.sppt[key] = (obj.scores[key] - (obj.kills[key] * 2))
                })
              }
              this.finishDrawChart(response, 'sppt')
            })
        } else if (this.chartdata === 'glicko') {
          store.fetchArchiveData(this.match.id, 'glicko', this.match.start_time, this.match.end_time)
            .then((response)=> {
              for (var i = 0; i < response.data.length; i++) {
                var obj = response.data[i]
                obj.rating = {}
                Object.keys(obj.glicko).forEach((key) => {
                  obj.rating[key] = obj.glicko[key].rating
                })
              }
              console.log(response.data)
              this.finishDrawChart(response, 'rating')
            })
        } else {
          store.fetchArchiveData(this.match.id, this.chartdata, this.match.start_time, this.match.end_time)
            .then((response)=> {
              this.finishDrawChart(response, this.chartdata)
            })
        }
      },

      finishDrawChart (response, dataKey) {
        this.raw = response.data
        this.data = new window.google.visualization.DataTable();
        this.data.addColumn('datetime', 'Date')
        this.data.addColumn('number', this.getWorldById(this.match.worlds.green).name)
        this.data.addColumn('number', this.getWorldById(this.match.worlds.blue).name)
        this.data.addColumn('number', this.getWorldById(this.match.worlds.red).name)

        for (var i = 0; i < this.raw.length; i++) {
          var date = new Date(this.raw[i].snapshot_time)
          var red = this.raw[i][dataKey].red
          var blue = this.raw[i][dataKey].blue
          var green = this.raw[i][dataKey].green
          this.data.addRow([date, green, blue, red])
        }

        this.options = {
          // title: 'Dragonbrand vs Tarnished Coast vs Blackgate PPT Evolution',
          chartArea: {width: '84%', backgroundColor: '#ECF1F5'},
          legend: 'top',
          backgroundColor: '#CFD8DC',
          hAxis: {
            title: 'Date',
            titleTextStyle: {
              color: '#333'
            }
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

        if (this.charttitle) {
          this.options.title = this.charttitle
        }

        var chart = new window.google.visualization.LineChart(document.getElementById(this.chartname + '_chart'));
        chart.draw(this.data, this.options);
      },

      handleResize () {
        var chart = new window.google.visualization.LineChart(document.getElementById(this.chartname + '_chart'));
        chart.draw(this.data, this.options);
      },

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

    watch: {
      match () {
        if (this.redraw === undefined) {
          this.drawChart()
        }
      },

      chartdata () {
        this.drawChart()
      }
    }
  }

</script>
