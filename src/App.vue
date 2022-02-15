<template>
  <div id="app">
    <gallery type="poissons"/>
    <fish id="1" class="myElement" />
  </div>
</template>

<script>
import fish from './components/fish.vue'
import gallery from './components/gallery.vue'

export default {
  name: 'App',
  components: {
    fish,
    gallery
  }
}
</script>

<style>
.myElement {
  border: 1px dotted black;
  padding: 10px;
}
</style>
