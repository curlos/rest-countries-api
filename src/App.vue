<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
@import './assets/styles/variables.css';
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Nunito Sans;
}

a {
  text-decoration: none;
  color: white;
}
</style>
