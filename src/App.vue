<template>
  <div id="app">
    <nav-bar v-if='this.$route.path != "/"' />
    <router-view />  
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
  name: 'App',
  components: {
    NavBar
  }
};
</script>
