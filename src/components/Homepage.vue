<template>
  <!-- North America Matches -->
  <div class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid"
    :class="{ loading: !matches.length }">
    <!-- <h3>NA Matches</h3> -->
    <matchheading></matchheading>
    <scoredetails v-for="match in page_matches"
      :matchinfo="match"
      :worldlist="worldlist" :predictedglicko="formattedglicko"
      useSkirmish="true"></scoredetails>

      <h4 class="mdl-color-text--blue-grey-600 mdl-cell--12-col"
        style="margin-left: 6px; border-bottom: 1px solid grey;">
        Ratings
      </h4>

      <table class="ratings mdl-cell mdl-cell--12-col mdl-data-table mdl-shadow--2dp
        mdl-cell--4-col-phone mdl-cell--8-col-tablet">
        <thead>
          <tr>
            <th>Rank</th>
            <th class="mdl-data-table__cell--non-numeric">Server</th>
            <th>Old Rating</th>
            <th>New Rating</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(server, index) in servers_oPredicted">
            <td data-label="Rank">
              {{index + 1}}&nbsp;
              <span v-bind:class="positionChange[server.name].textclass">
                {{positionChange[server.name].change | absolute}}
              </span>
            </td>
            <td class="mdl-data-table__cell--non-numeric" data-label="Server">
              {{server.name}}
            </td>
            <td data-label="Old Rating">
              {{server.official | round(3, true)}}
            </td>
            <td data-label="New Rating">
              {{server.predicted | round(3, true)}}
            </td>
            <td data-label="Change" v-bind:class="server.textclass">
              {{server.predicted - server.official | round(3, true)}}
            </td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
  import Scoredetails from './Scoredetails.vue'
  import Matchheading from './Matchheading.vue'

  export default {
    name: 'Homepage',
    data() {
      return {
        region: '1-'
      }
    },

    route: {
      data ({ to }) {
        const region = to.region
        return {
          region: region
        }
      }
    },

    computed: {
      matches () {
        return this.$store.state.matches
      },

      worldlist () {
        return this.$store.state.worlds
      },

      officialglicko () {
        return this.$store.state.glicko
      },

      predictedglicko () {
        return this.$store.state.predictedglicko
      },

      page_matches () {
        return this.matches
          .filter(obj => obj.id.includes(this.region))
          .sort((a, b) => {
            return (a.id.split("-")[1] - b.id.split("-")[1])
          })
      },

      worldsById () {
        let ret = {}
        for (let i = 0; i < this.worldlist.length; i++) {
          let id = this.worldlist[i].id
          ret[id] = this.worldlist[i]
        }
        return ret
      },

      formattedglicko () {
        var glicko = this.predictedglicko
        var ret = {}

        if (glicko === null || glicko === undefined) {
          return
        }

        for (var i = 0; i < this.predictedglicko.length; i++) {
          var cg = this.predictedglicko[i]
          ret[cg.id] = cg.glicko
        }

        return ret
      },

      servers () {
        let glicko = this.officialglicko
        let pglicko = this.formattedglicko
        let ret = []

        if (!this.worldlist[0]) {
          return ret;
        }

        Object.keys(glicko).forEach( (key) => {
          if (key < 2000 && pglicko[key]) {
            let startGlicko = glicko[key].rating
            let curGlicko = pglicko[key].rating
            let textclass = (curGlicko - startGlicko) >= 0 ?
              'glicko-up' : 'glicko-down'
            ret.push({
              name: this.worldsById[key].name,
              official: startGlicko,
              predicted: curGlicko,
              textclass: textclass
            })
          }
        })
        return ret
      },

      servers_oPredicted () {
        return this.servers.sort((a, b) => {
          return b.predicted - a.predicted
        })
      },

      positionChange () {
        var ret = {}
        var posInOfficial = {}
        var posInPredicted = {}
        var servers = this.servers

        var sortedByOfficial = servers.slice().sort((a,b) => {
          return parseFloat(b.official) - parseFloat(a.official)
        })

        var sortedByPredicted = servers.slice().sort((a,b) => {
          return parseFloat(b.predicted) - parseFloat(a.predicted)
        })

        for (var i = 0; i < sortedByOfficial.length; i++) {
          posInOfficial[sortedByOfficial[i].name] = i
        }

        for (var i = 0; i < sortedByPredicted.length; i++) {
          posInPredicted[sortedByPredicted[i].name] = i
        }

        Object.keys(posInOfficial).forEach((key) => {
          var change = posInOfficial[key] - posInPredicted[key]
          ret[key] = {
            change: change,
            textclass: ''
          }

          if (change > 0) {
            ret[key].textclass = 'pos-up'
          } else if (change < 0) {
            ret[key].textclass = 'pos-down'
          } else {
            ret[key].textclass = 'pos-same'
          }

        })

        return ret
      }
    },

    filters: {
      round: function (value, accuracy, keep) {
        if (typeof value !== 'number') return value

        var fixed = value.toFixed(accuracy)

        return keep ? fixed : +fixed
      },

      absolute: function (value) {
        return value < 0 ? value * -1 : value === 0 ? '' : value
      }
    },

    components: {
      Matchheading,
      Scoredetails
    }
  }
</script>

<style>
  .loading:after {
    content: "Loading...";
    padding-top: 12px;
    padding-bottom: 12px;
    display: inline-block;
    margin: auto;
    text-align: center;
    position: relative;
    left: 10px;
    font-size: 20px;
  }

  .glicko-up {
    color: rgb(89,170,91);
    font-weight: bold;
  }
  .glicko-down {
    color: rgb(182, 89, 91);
    font-weight: bold;
  }

  .pos-up, .pos-down, .pos-same {
    width: 25px;
    margin-left: 0px;
  }

  .pos-up {
    display:inline-block;
    color: rgb(89,170,91);
    font-weight: bold;
  }

  .pos-up:before {
    content: '⬆';
  }

  .pos-down {
    display:inline-block;
    color: rgb(182, 89, 91);
    font-weight: bold;
  }

  .pos-down:before {
    content: '⬇';
  }

  .pos-same {
    display: inline-block;
    color: rgb(182,182,182);
    font-weight: bold;
  }

  .pos-same:before {
    content: '–';
  }

  tbody tr:nth-child(even) {
    background-color: rgb(248,248,248);
  }
</style>
