<template>
  <div>
    <h1>tous les {{type}}</h1>
  <ul>
    <li>Poisson 1</li>
    <li>Poisson 2</li>
    <li>Poisson 3</li>
  </ul>
  </div>
</template>

<script>
export default {
  name: 'fish',
  props: {
    type: String,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
  border: 1px solid black;
  margin: 10px 0;
  padding: 10px;
  list-style-type: none;
}
</style>
