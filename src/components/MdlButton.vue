<template>
  <button class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect">
    {{text}}
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        required: false
      }
    },

    mounted () {
      componentHandler.upgradeElement(this.$el)
    }
  }
</script>
