<template>
  <div class="myElement">
    <h1>Poisson n°{{ id }}</h1>
    <ul>
      <li>Info 1</li>
      <li>Info 2</li>
      <li>Info 3</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'fish',
  props: {
    id: Number,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
