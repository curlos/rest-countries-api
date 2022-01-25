<template>
  <div>
    <div class="navbarContainer">
      <router-link to="/" class="homeLink">
        Where in the world?
      </router-link>

      <div @click="toggleTheme" class="modeTheme">
        <div>
          <i v-if="theme === ''" class="fas fa-moon"></i>
          <i v-if="theme === 'darkMode'" class="fas fa-sun"></i>
        </div>
        <div>{{ theme === 'darkMode' ? 'Light Mode' : 'Dark Mode' }} </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Country',
  mounted() {
    let localTheme = localStorage.getItem('theme'); //gets stored theme value if any
    document.documentElement.setAttribute('data-theme', localTheme); // updates the data-theme attribute
  },
  data() {
    return {
      theme: ''
    };
  },
  methods: {
    toggleTheme() {
      this.theme = (this.theme === 'darkMode' ? '' : 'darkMode')
      document.documentElement.setAttribute('data-theme', this.theme)
      localStorage.setItem('theme', this.theme)
    }
  }
}
</script>

<style scoped>
  .navbarContainer {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    color: var(--textColor);
    background-color: var(--navbarBgColor);
    color: var(--white);
  }

  .homeLink {
    color: var(--textColor);
    text-decoration: none;
    font-size: 20px;
    font-weight: 600;
  }

  .modeTheme {
    color: var(--textColor);
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }
</style>