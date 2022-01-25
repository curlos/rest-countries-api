<template>
  <router-link :to="'/country/' + country.cca2" exact>
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
    display: flex;
    flex-direction: column;
    color: white;
    text-decoration: none;
    height: 100%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, .1);
  }
  .imgFlag {
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .cardDetails {
    flex: 2;
    margin-top: -6px;
    padding: 25px;
    color: var(--textColor);
    background-color: var(--navbarBgColor);
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