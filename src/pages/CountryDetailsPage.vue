
<template>
  <div class="container">
    <Navbar />

    <div class="mainPage">
      <router-link :to="'/'">
        <button class="backButton">
          <i class="fas fa-arrow-left"></i> Back
        </button>    
      </router-link>

      <div v-if="!loading" class="countryInfo">
        <img v-bind:src="this.country.flags.svg" alt="" className="countryFlag" />

        <div className="countryTextInfo">
          <div className="countryName">
            {{ this.country.name.common }}
          </div>

          <div className="countryDetails">
            <div>
              <div className="countrySection">
                <span className="bold">Native Name:</span>
                <span className="thin">{{ this.country.name.nativeName[Object.keys(this.country.name.nativeName)[0]].official }}</span>
              </div>

              <div className="countrySection">
                <span className="bold">Population:</span>
                <span className="thin">{{ Number(this.country.population).toLocaleString() }}</span>
              </div>

              <div className="countrySection">
                <span className="bold">Region:</span>
                <span className="thin">{{ this.country.region }}</span>
              </div>

              <div className="countrySection">
                <span className="bold">Sub Region:</span>
                <span className="thin">{{ this.country.subregion }}</span>
              </div>

              <div className="countrySection">
                <span className="bold">Capital:</span>
                <span className="thin">{{ this.country.capital[0] }}</span>
              </div>
            </div>

            <div>
              <div className="countrySection">
                <span className="bold">Top Level Domain:</span>
                <span className="thin">{{ this.country.tld[0] }}</span>
              </div>

              <div className="countrySection">
                <span className="bold">Currencies:</span>
                
                <span className="thin" :key="currency" v-for="currency in this.country.currencies">
                  {{ currency.name }}
                </span>
              </div>

              <div className="countrySection">
                <span className="bold">Languages:</span>
                
                <span className="thin">
                  {{ Object.values(this.country.languages).join(', ') }}
                </span>
              </div>
            </div>
          </div>

          <div :key="country.name.common" v-for="country in this.countries">
        <Country :country="country" />
      </div>

          <div className="borderCountries">
            <div>Border Countries: </div>

            <router-link :to="'/country/' + country.name.common" :key="country.name.common" v-for="country in this.borderCountries" className="borderCountry">
              {{ country.name.common }}
            </router-link>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import axios from 'axios'

export default {
  name: 'CountriesPage',
  components: {
    Navbar,
  },
  data() {
    return {
      country: Object,
      borderCountries: [],
      loading: false,
      API_BASE_URL: 'https://restcountries.com/v3.1'
    }
  },
  methods: {
    async fetchCountry(name) {
      const response = await axios.get(`${this.API_BASE_URL}/name/${name}`)
      console.log(response.data[0])
      return response.data[0]
    },
    async fetchBorderCountries(borders) {
      if (borders) {
        console.log(borders)
        let newBorderCountries = []
        // this pushes all the countries correctly but return skips past for loop, need to wait for loop to finish first before returning
        for (let border of borders) {
          try {
            const country = await this.fetchCountry(border)
            console.log(country)
            newBorderCountries.push(country)
          } catch (err) {
            console.error(err)
          }
        }

        console.log(newBorderCountries)

        return newBorderCountries
      } else {
        return []
      }
    },
  },
  async created() {
    if(this.$route.params.name) {
      this.loading = true
      const name = this.$route.params.name
      const newCountry = await this.fetchCountry(name)
      const newBorderCountries = await this.fetchBorderCountries(newCountry.borders)
      this.country = newCountry
      this.borderCountries = newBorderCountries
      this.loading = false
    }
  }
  
}
</script>

<style scoped>
  .container {
    min-height: 100vh;
    background-color: var(--veryDarkBlue);
  }

  .mainPage {
    color: var(--white);
    background-color: var(--veryDarkBlue);
    padding: 50px;
  }

  .backButton {
    display: flex;
    align-items: center;
    gap: 10px;
    border: none;
    border-radius: 10px;
    background-color: var(--darkBlue);
    color: var(--white);
    padding: 10px 30px;
    cursor: pointer;
  }
  

  .countryInfo {
    display: flex;
    gap: 50px;
    justify-content: space-between;
    margin-top: 25px;
  }

  .countryFlag {
    width: 45%;
  }

  .countryTextInfo {
    width: 55%;
    padding: 20px;
  }

  .countryName {
    font-weight: 800;
    font-size: 24px;
    margin-bottom: 20px;
  }

  .countryDetails {
    font-weight: 600;
    display: flex;
    justify-content: space-between;
  }

  .countrySection {
    margin-bottom: 6px;
  }

  .bold {
    font-weight: 600;
    margin-right: 5px;
  }

  .thin {
    font-weight: 300;
  }

  .borderCountries {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }

  .borderCountry {
    background-color: var(--darkBlue);
    padding: 5px 20px;
    border-radius: 7px;
  }

  .borderCountry:hover {
    background-color: var(--lightDarkBlue);
  }

</style>