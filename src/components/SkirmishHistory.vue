<template>
  <div class="skirmish_history">
    <div v-if="tier" class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid">
      <h4 class="mdl-color-text--blue-grey-600 mdl-cell--12-col" style="margin-left: 6px; border-bottom: 1px solid grey;">
        Skirmish History – Tier {{tier}} {{region}}
      </h4>
      <!-- Table -->
      <table class="ratings mdl-cell mdl-cell--12-col mdl-data-table mdl-shadow--2dp
      mdl-cell--4-col-phone mdl-cell--8-col-tablet">
        <thead>
          <tr>
            <th class="mdl-data-table__cell--non-numeric">Server</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'skirmish-history',
    data() {
      const data = {
        loading: false,
        match: ''
      }
      return data;
    },

    beforeMount() {
      this.match = this.$route.params.match || 'None'
    },

    computed: {
      matches() {
        return this.$store.state.matches
      },

      worldlist() {
        return this.$store.state.worlds
      },

      tier () {
        return this.match !== 'None' ? this.match.split("-")[1] : false
      },

      region () {
        let region = {
          "1": "NA",
          "2": "EU"
        }
        return this.match !== 'None' ? region[this.match.split("-")[0]] : false
      }
    }
  }

</script>

<style>
  .skirmish_history {
    width: 100%;
  }
</style>