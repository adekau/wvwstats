<template>
  <div v-bind:for="target" v-bind:class="{'mdl-tooltip--large': large}" class="mdl-tooltip">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MdlTooltip',

  props: {
    target: {
      required: true,
      type: String
    },
    large: Boolean
  },

  mounted () {
    componentHandler.upgradeElement(this.$el, 'MaterialTooltip')
  }
}
</script>
