
<template>
  <div class="container">
    <Navbar />

    <div v-if="!loading" class="mainPage">
      <router-link :to="'/'">
        <button class="backButton">
          <i class="fas fa-arrow-left"></i> Back
        </button>    
      </router-link>

      <div class="countryInfo">
        <img v-bind:src="this.country.flags.svg" alt="" className="countryFlag" />

        <div className="countryTextInfo">
          <div className="countryName">
            {{ this.country.name.common }}
            <img v-bind:src="country.coatOfArms.svg" alt="" className="coatOfArms"/>
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

          <div className="borderCountries">
            <div>Border Countries: </div>

            <router-link :to="'/country/' + country.name.common" :key="country.name.common" v-for="country in this.borderCountries" className="borderCountry">
              {{ country.name.common }}
            </router-link>
          </div>

        </div>
      </div>

      <div style="height: 75vh; width: 50vw;">
        <l-map
          v-model="zoom"
          v-model:zoom="zoom"
          :center="[country.capitalInfo.latlng[0], country.capitalInfo.latlng[1]]"
          @move="log('move')"
        >
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ></l-tile-layer>
          <l-control-layers />
          <l-marker :lat-lng="[country.capitalInfo.latlng[0], country.capitalInfo.latlng[1]]" draggable @moveend="log('moveend')">
            <l-tooltip>
              {{ country.capital[0]}}
            </l-tooltip>
          </l-marker>
        </l-map>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import axios from 'axios'
import {
  LMap,
  LTileLayer,
  LMarker,
  LControlLayers,
  LTooltip
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: 'CountriesPage',
  components: {
    Navbar,
    LMap,
    LTileLayer,
    LMarker,
    LControlLayers,
    LTooltip
  },
  data() {
    return {
      country: Object,
      borderCountries: [],
      loading: false,
      API_BASE_URL: 'https://restcountries.com/v3.1',
      zoom: 3,
      iconWidth: 25,
      iconHeight: 40,
    }
  },
  computed: {
    iconUrl() {
      return `https://placekitten.com/${this.iconWidth}/${this.iconHeight}`;
    },
    iconSize() {
      return [this.iconWidth, this.iconHeight];
    },
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
    async setInitialState() {
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
  },
  watch: {
    $route() {
      console.log(this.$route.params)
      this.setInitialState()
    },
  },
  async created() {
    this.setInitialState()
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
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .coatOfArms {
    height: 50px;
  }

  .countryDetails {
    font-weight: 600;
    display: flex;
    gap: 30px;
    width: 100%;
  }

  .countrySection {
    margin-bottom: 6px;
  }

  .bold {
    font-weight: 800;
    margin-right: 5px;
  }

  .thin {
    font-weight: 300;
  }

  .borderCountries {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
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

  @media only screen and (max-width: 1024px) {
    .countryInfo {
      display: block;
    }

    .countryFlag {
      width: 100%;
    }

    .countryTextInfo {
      width: 100%;
      padding: 20px;
    }
  }

</style>