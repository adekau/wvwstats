<template>
  <input id="dp" type="text"/>
</template>

<script>
  import Flatpickr from 'flatpickr'

  export default {
    name: 'flatpickr',

    data () {
      return {
        fp: null
      }
    },

    props: {
      clr: {
        required: false,
        type: Number
      },
      start: {
        required: true
      },
      end: {
        required: true
      }
    },

    mounted () {
      var start = new Date(this.start)
      start = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      var end = new Date(this.end)
      end = new Date(end.getFullYear(), end.getMonth(), end.getDate());

      this.fp = new Flatpickr(this.$el, {
        enableTime: true,
        minuteIncrement: 15,
        'static': true,
        altInput: true,
	      altFormat: "F j, Y h:i K",


        enable: [
          {
            from: start,
            to: end
          }
        ],

        onChange: (dateObj) => {
          this.$emit('crchange', dateObj)
        }

      })
    },

    watch: {
      clr: function (n, o) {
        this.fp.clear()
      }
    }
  }
</script>

<style>

</style>
