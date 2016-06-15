<template>
  <div v-mdl class="mdl-layout__container">
    <div v-mdl class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
      <searchbar></searchbar>
      <sidebar></sidebar>
      <main class="mdl-layout__content mdl-color--grey-100">
        <div class="mdl-grid demo-content">
          <router-view
            class="view"
            keep-alive
            transition
            transition-mode="out-in">
          </router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
  import Sidebar from './Sidebar.vue'
  import Searchbar from './Searchbar.vue'

  export default {
    components: {
      Sidebar,
      Searchbar
    }
  }
</script>

<style lang="stylus">
ul
  list-style-type none
  padding 0
  margin 0

.view
  transition opacity .2s ease
  box-sizing border-box
  &.v-enter, &.v-leave
    opacity 0
</style>
