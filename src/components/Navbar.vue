<template>
  <div>
    <div class="navbarContainer">
      <router-link to="/" class="homeLink">
        Where in the world?
      </router-link>

      <div class="modeTheme">
        <div>
          <i class="fas fa-moon"></i>
        </div>
        <div>Dark Mode</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Country',
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
    font-weight: 600;
  }

  .modeTheme {
    display: flex;
    align-items: center;
    gap: 5px;
  }
</style>