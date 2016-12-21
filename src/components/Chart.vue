<template>
  <div v-bind:id="chartname + '_chart'"
    v-bind:style="'width:100%; height: ' + chartheight + ';'"
    :data-chartloaded="chartsLoaded">
  </div>
</template>

<script>
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

    mounted () {
      if (this.chartsLoaded) {
        this.drawChart()
      }
      window.addEventListener('resize', this.handleResize)
    },

    computed: {
      chartsLoaded () {
        return this.$store.state.chartsLoaded
      }
    },

    methods: {
      drawChart () {
        if (!this.match || !this.chartdata) {
          return
        }

        if (this.chartdata === 'k/d') {
          this.$store.dispatch('FETCH_ARCHIVEDATA', {
            matchid: this.match.id,
            data: 'kills,deaths',
            start_time: this.match.start_time,
            end_time: this.match.end_time
          }).then((response)=> {
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
          this.$store.dispatch('FETCH_ARCHIVEDATA', {
            matchid: this.match.id,
            data: 'kills,deaths',
            start_time: this.match.start_time,
            end_time: this.match.end_time
          }).then((response)=> {
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
          this.$store.dispatch('FETCH_ARCHIVEDATA', {
            matchid: this.match.id,
            data: 'kills,scores',
            start_time: this.match.start_time,
            end_time: this.match.end_time
          }).then((response)=> {
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
          this.$store.dispatch('FETCH_ARCHIVEDATA', {
            matchid: this.match.id,
            data: 'kills,scores',
            start_time: this.match.start_time,
            end_tme: this.match.end_time
          }).then((response)=> {
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
          this.$store.dispatch('FETCH_ARCHIVEDATA', {
            matchid: this.match.id,
            data: 'kills,scores',
            start_time: this.match.start_time,
            end_time: this.match.end_time
          }).then((response)=> {
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
          this.$store.dispatch('FETCH_ARCHIVEDATA', {
            matchid: this.match.id,
            data: 'glicko',
            start_time: this.match.start_time,
            end_time: this.match.end_time
          }).then((response)=> {
              for (var i = 0; i < response.data.length; i++) {
                var obj = response.data[i]
                obj.rating = {}
                Object.keys(obj.glicko).forEach((key) => {
                  obj.rating[key] = obj.glicko[key].rating
                })
              }
              this.finishDrawChart(response, 'rating')
            })
        } else if (this.chartdata === 'glicko change') {
          this.$store.dispatch('FETCH_ARCHIVEDATA', {
            matchid: this.match.id,
            data: 'glicko',
            start_time: this.match.start_time,
            end_time: this.match.end_time
          }).then((response)=> {
              for (var i = 0; i < response.data.length; i++) {
                var obj = response.data[i]
                obj.delta = {}
                Object.keys(obj.glicko).forEach((key) => {
                  obj.delta[key] = obj.glicko[key].delta
                })
              }
              this.finishDrawChart(response, 'delta')
            })
        } else {
          this.$store.dispatch('FETCH_ARCHIVEDATA', {
            matchid: this.match.id,
            data: this.chartdata,
            start_time: this.match.start_time,
            end_time: this.match.end_time
          }).then((response) => {
              this.waitForDiv(() => {
                return document.getElementById(this.chartname + '_chart') !== null
              }, () => {
                this.finishDrawChart(response, this.chartdata)
              }, function () {
                console.err('Unable to find element', this.chartname + '_chart')
              })
            }, (response) => {
              console.err(response)
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
        if (this.chartdata && this.match) {
          var chart = new window.google.visualization.LineChart(document.getElementById(this.chartname + '_chart'));
          chart.draw(this.data, this.options);
        }
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

      waitForDiv (isready, success, error, count, interval) {
        if (count === undefined) {
                count = 300;
            }
            if (interval === undefined) {
                interval = 20;
            }
            if (isready()) {
                success();
                return;
            }
            // The call back isn't ready. We need to wait for it
            setTimeout(() => {
                if (!count) {
                    // We have run out of retries
                    if (error !== undefined) {
                        error();
                    }
                } else {
                    // Try again
                    this.waitForDiv(isready, success, error, count -1, interval);
                }
            }, interval);
      }

    },

    watch: {
      match (val, oldVal) {
        if (this.redraw === undefined) {
          this.drawChart()
        }
      },

      chartdata () {
        this.drawChart()
      },

      chartsLoaded (val, oldVal) {
        if (val === true) {
          this.drawChart()
        }
      }
    }
  }

</script>
