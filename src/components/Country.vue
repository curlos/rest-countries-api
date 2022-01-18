<template>
  <router-link :to="'/country/' + country.name.common" exact>
    <div class="countryCard">
      <div class="flag">
        <img v-bind:src="country.flags.svg || country.flags.png" class="imgFlag"/>
      </div>

      <div class="cardDetails">
        <div class="countryName">{{ country.name.common }}</div>

        <div class="smallLabel">
          <span class="boldLabel">Population:</span>
          <span>{{ Number(country.population).toLocaleString() }}</span>
        </div>

        <div class="smallLabel">
          <span class="boldLabel">Region:</span>
          <span>{{ country.region }}</span>
        </div>

        <div class="smallLabel">
            <span class="boldLabel">Capital:</span>
            <span v-if="country.capital">{{ country.capital[0] }}</span>
            <span v-if="!country.capital">N/A</span>
          </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'Country',
  props: {
    country: Object,
  }
}
</script>

<style scoped>
  .countryCard {
    color: white;
    text-decoration: none;
  }
  .imgFlag {
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .cardDetails {
    margin-top: -6px;
    padding: 25px;
    background-color: var(--darkBlue);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .countryName {
    font-weight: 800;
    font-size: 18px;
    margin-bottom: 16px;
  }

  .countryName:hover {
    text-decoration: underline;
  }

  .smallLabel {
    font-size: 14px;
    margin-bottom: 5px;
  }

  .boldLabel {
    font-weight: 600;
    margin-right: 5px;
  }
</style>