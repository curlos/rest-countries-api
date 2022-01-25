<template>
  <div class="container">
    <Navbar />  
    <div class="searchAndFilter">
      <div class="searchContainer">
        <div>
          <i class="fas fa-search"></i>
        </div>

        <input type="text" placeholder="Search for a country..." v-model="searchText" />
      </div>

      <div class="dropdown">
        <div @click="handleDropdownClick" class="filterButton">
          Filter by region <i class="fas fa-chevron-down"></i>
        </div>

        <div v-if="showDropdown" class="dropdown-content">
          <div :key="region" v-for="region in regions" @click="() => handleFilterByRegion(region)" class="dropdown-item">
            {{ region }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loaderContainer">
      <div class="loader" />
    </div>

    <div v-if="!loading" class="countriesContainer">
      <div :key="country.name.common" v-for="country in this.countries">
        <Country :country="country" />
      </div>
    </div>
    
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Country from '../components/Country'
import axios from 'axios'
import _ from 'lodash'

export default {
  name: 'CountriesPage',
  components: {
    Navbar,
    Country
  },
  mounted() {
    let localTheme = localStorage.getItem('theme'); //gets stored theme value if any
    document.documentElement.setAttribute('data-theme', localTheme); // updates the data-theme attribute
  },
  data() {
    return {
      countries: [],
      filteredCountries: [],
      regions: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
      searchText: '',
      loading: false,
      showDropdown: false,
      API_BASE_URL: 'https://restcountries.com/v3.1',
      theme: ''
    }
  },
  methods: {
    async fetchCountries() {
      this.loading = true
      const response = await axios.get(`${this.API_BASE_URL}/all`)
      this.loading = false
      console.log(response.data)
      return response.data
    },
    async fetchCountriesQuery() {
      if (this.searchText) {
        try {
          console.log('fetching')
          this.loading = true
          const response = await axios.get(`${this.API_BASE_URL}/name/${this.searchText}`)
          this.loading = false
          this.countries = response.data
        } catch (err) {
          this.countries = []
          this.loading = false
        }
        window.scrollTo(0,0)
      } else {
        this.countries = await this.fetchCountries()
      }
    },
    async handleFilterByRegion(region) {
      console.log('fetching')
      this.showDropdown = false
      this.loading = true
      const response = await axios.get(`${this.API_BASE_URL}/region/${region}`)
      this.loading = false
      this.countries = response.data
      window.scrollTo(0,0)
    },
    handleDropdownClick() {
      console.log('click')
      this.showDropdown = !this.showDropdown
    }
  },
  async created() {
    const newCountries = await this.fetchCountries()
    this.countries = newCountries
  },
  watch: {
    searchText: _.debounce(function() {
      this.fetchCountriesQuery()
    }, 1000)
  }
  
}
</script>

<style scoped>
  :root {
    --background-color: var(--lightGray);
  }

  [data-theme="darkMode"] {
    --background-color: var(--veryDarkBlue);
  }

  .container {
    color: var(--white);
    background-color: var(--backgroundColor);
    min-height: 100vh;
    width: 100vw;
    max-width: 100%;
  }

  .searchAndFilter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }

  .searchContainer {
    display: flex;
    align-items: center;
    gap: 15px;
    color: var(--textColor);
    background-color: var(--navbarBgColor);
    padding: 15px 25px;
    border-radius: 10px;
    width: 40%;
  }

  .searchContainer input {
    background-color: transparent;
    border: none;
    color: var(--textColor);
    outline: none;
    width: 100%;
  }

  .countriesContainer {
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .filterButton {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    padding: 15px;
    padding-left: 20px;
    padding-right: 20px;
    color: var(--textColor);
    background-color: var(--navbarBgColor);
    border-radius: 10px;
    cursor: pointer;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: block;
    position: absolute;
    color: var(--textColor);
    background-color: var(--navbarBgColor);
    width: 100%;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    margin-top: 5px;
    border-radius: 10px;
    z-index: 1;
  }

  .dropdown-item:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .dropdown-item:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .dropdown-item {
    cursor: pointer;
    padding: 12px 20px;
  }

  .dropdown-item:hover {
    background-color: var(--hoverColor);
  }
  
  .loaderContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    max-width: 100%;
    height: 60vh;
  }

  .loader {
    border: 8px solid var(--lightDarkBlue); /* Light grey */
    border-top: 8px solid #ffffff; /* Blue */
    border-radius: 50%;
    width: 100px;
    height: 100px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    .searchAndFilter {
      flex-direction: column;
      gap: 20px;
      position: sticky;
      top: 0;
      background-color: var(--backgroundColor);
    }

    .searchContainer, .searchContainer input {
      width: 100%;
    }

    .dropdown, .filterButton {
      width: 100%;
    }

    .countriesContainer {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 20px 40px;
    }
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (max-width: 768px) {
    .countriesContainer {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    .countriesContainer {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    .countriesContainer {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media only screen and (min-width: 1480px) {
    .countriesContainer {
      grid-template-columns: repeat(5, 1fr);
    }
  }

</style>