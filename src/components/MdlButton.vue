<template>
  <button class="mdl-button mdl-js-button mdl-color--blue-grey-100 mdl-js-ripple-effect"
    v-on:click="clickHandler()">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    mounted () {
      componentHandler.upgradeElement(this.$el)
    },

    methods: {
      clickHandler () {
        this.$emit('click')
      }
    }
  }
</script>
