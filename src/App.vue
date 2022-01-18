<template>
  <Navbar />
  <router-view></router-view>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
@import './assets/styles/variables.css';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  min-height: 100%;
}

</style>
