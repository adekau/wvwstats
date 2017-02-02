<template>
  <div class="mdl-progress mdl-js-progress">
    <!-- Empty -->
  </div>
</template>

<script>
  export default {
    props: {
      progress: {
        required: false
      },
      buffer: {
        required: false
      }
    },

    mounted () {
      componentHandler.upgradeElement(this.$el, "MaterialProgress")

      if (this.progress != null) {
        this.$el.MaterialProgress.setProgress(this.progress)
        this.$watch('progress', val => this.$el.MaterialProgress.setProgress(val))
      }
      if (this.buffer != null) {
        this.$el.MaterialProgress.setBuffer(this.buffer)
        this.$watch('buffer', val => this.$el.MaterialProgress.setBuffer(val))
      }
    }
  }


</script>
