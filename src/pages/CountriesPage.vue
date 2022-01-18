<template>
  <div class="container">
    <Navbar />  
    <div className="searchAndFilter">
      <div className="searchContainer">
        <div>
          <i class="fas fa-search"></i>
        </div>

        <input placeholder="Search for a country..."/>
      </div>

      <div>
        Filter by region
      </div>
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

export default {
  name: 'CountriesPage',
  components: {
    Navbar,
    Country
  },
  data() {
    return {
      countries: [],
      filteredCountries: [],
      searchText: '',
      loading: false,
      API_BASE_URL: 'https://restcountries.com/v3.1'
    }
  },
  methods: {
    async fetchCountries() {
      this.loading = true
      const response = await axios.get(`${this.API_BASE_URL}/all`)
      console.log(response)
      console.log(response.data)
      this.loading = false
      return response.data
    },
  },
  async created() {
    const newCountries = await this.fetchCountries()
    this.countries = newCountries
  }
  
}
</script>

<style scoped>
  .container {
    color: var(--white);
    background-color: var(--veryDarkBlue);
    min-height: 100vh;
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
    background-color: var(--darkBlue);
    padding: 15px 25px;
    border-radius: 10px;
    width: 40%;
  }

  .searchContainer input {
    background-color: transparent;
    border: none;
    color: var(--white);
    outline: none;
    width: 100%;
  }

  .countriesContainer {
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    grid-auto-rows: minmax(100px, auto);
  }

</style>