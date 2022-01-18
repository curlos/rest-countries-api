<template>
  <div>
    <div class="navbarContainer">
      <router-link to="/" class="homeLink">
        Where in the world?
      </router-link>

      <button class="modeButton">Dark Mode</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped>
  .navbarContainer {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background-color: var(--darkBlue);
    color: var(--white);
  }

  .homeLink {
    color: var(--white);
    text-decoration: none;
    font-size: 20px;
    font-family: 
  }

  .modeButton {

  }
</style>