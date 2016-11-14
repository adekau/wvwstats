<template>
  <div v-mdl class="mdl-layout__container">
    <div v-mdl class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
      <searchbar></searchbar>
      <sidebar></sidebar>
      <main class="mdl-layout__content mdl-color--grey-100" id="router_view">
        <div class="mdl-grid demo-content">

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

<style>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.view {
  transition: opacity .2s ease;
  box-sizing: border-box;
}
.view.v-enter, .view.v-leave {
    opacity: 0;
}
</style>

<style>


  html, body {
    font-family: 'Roboto', 'Helvetica', sans-serif;
  }

  .demo-layout .demo-header .mdl-textfield {
    padding: 0px;
    margin-top: 41px;
  }

  .demo-layout .demo-header .mdl-textfield .mdl-textfield__expandable-holder {
    bottom: 19px;
  }

  .demo-layout .mdl-layout__header .mdl-layout__drawer-button {
    color: rgba(0, 0, 0, 0.54);
  }

  .mdl-layout__drawer .avatar {
    margin-bottom: 16px;
  }

  .demo-drawer {
    border: none;
  }

  /* iOS Safari specific workaround */
  .demo-drawer .mdl-menu__container {
    z-index: -1;
  }

  .demo-drawer .demo-navigation {
    z-index: -2;
  }

  /* END iOS Safari specific workaround */
  .demo-drawer .mdl-menu .mdl-menu__item {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .demo-drawer-header {
    box-sizing: border-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-justify-content: flex-end;
        -ms-flex-pack: end;
            justify-content: flex-end;
    padding: 21px;
    height: 195px;
    font-weight: bold;
  }
  .demo-drawer-header span {
    padding-top: 4px;
    font-size: 30px;
  }

  .demo-avatar-dropdown {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;
  }

  .demo-navigation {
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
  }

  .demo-layout .demo-navigation .mdl-navigation__link {
    display: -webkit-flex !important;
    display: -ms-flexbox !important;
    display: flex !important;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    color: rgba(255, 255, 255, 0.56);
    font-weight: 500;
  }

  .demo-layout .demo-navigation .mdl-navigation__link:hover {
    color: #37474F;
  }

  .demo-navigation .mdl-navigation__link .material-icons {
    font-size: 24px;
    color: rgba(255, 255, 255, 0.56);
    margin-right: 32px;
  }

  .demo-content {
    max-width: 1080px;
  }

  @media only screen and (max-width: 575px) {

    .ratings table, .ratings thead,
    .ratings tbody, .ratings th,
    .ratings td, .ratings tr {
        display: block;
    }

    .ratings thead {
      display: none;
    }

    .ratings.mdl-data-table tbody tr {
      height: auto;
    }

    .ratings.mdl-data-table tbody tr:nth-child(even) {
      background-color: #eee;
    }

    .ratings.mdl-data-table td,
    .ratings.mdl-data-table td:first-of-type {
      padding-left: 50%;
    }

    .mdl-data-table__cell--non-numeric {
      text-align: right !important;
    }

    .ratings.mdl-data-table td:before {
      position: absolute;
      top: 6px;
      left: 6px;
      width: 45%;
      padding: 6px 18px 0;
      white-space: nowrap;
      content: attr(data-label);
      text-align: left;
      color: rgba(0, 0, 0, 0.541176);
      font-weight: bold;
      font-family: Helvetica, Arial, sans-serif;
      font-size: 12px;
    }

    .ratings.mdl-data-table td:last-of-type {
      padding-right: 18px;
    }
  }
</style>
