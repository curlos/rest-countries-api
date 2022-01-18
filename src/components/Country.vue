<template>
  <div className="countryContainer">
    <img v-bind:src="country.flags.svg || country.flags.png" className="imgFlag"/>
    {{ country.name.common }}
  </div>
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
  .imgFlag {
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
</style>