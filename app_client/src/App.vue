<template id="app">
  <v-app>
    <v-navigation-drawer app v-model="sideNav" v-if="loggedIn">
      <navbar :usuario="usuario"></navbar>
    </v-navigation-drawer>
    <v-toolbar app color="orange darken-1" v-if="loggedIn">
      <v-toolbar-side-icon dark @click="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">Fundación Procare</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  computed: {
    loggedIn () {
      return this.$store.getters.loggedIn
    },
    usuario () {
      return this.$store.getters.usuario
    }
  },
  data () {
    return {
      sideNav: false
    }
  },
  name: 'App'
}
</script>

<style>
  p, h1, h2, h3, h4, h5, h6, label, a, div {
    font-family: Avenir;
  }
  .btn-continuar {
    background-color: #21378A !important;
    color: white !important;
    width: 150px !important;
  }
  .btn-cancelar {
    background-color: #FF5252 !important;
    color: white !important;
    width: 150px !important;
  }
  #app {
    background-color: #d3dbdb;
  }
  .display-1 {
    color: #21378A !important;
    font-size: 2.2rem !important;
    font-weight: bold;
  }
  .tabs__div a {
    color: #fb8c00!important;
  }
  .card-avatar {
    background-color: rgba(184, 188, 196, 0.2);
  }
</style>