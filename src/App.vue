<template>
  <div id="app">
    <gallery id="gallery" :type="type"/>
    <fish id="view" class="myElement" />
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
  },
  data() {
    return {
      type: "poissons",
    }
  }
}
</script>

<style>

html, body {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
}
#app {
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr; 
  grid-template-rows: 1fr 1fr 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "gallery gallery view"
    "gallery gallery view"
    "gallery gallery view";   
}
#gallery {     
  grid-area: gallery; 
  overflow-y:scroll;
}

#view {
  grid-area: view;
  border: 1px dotted black;
  padding: 10px;
  margin: 5px;
}

</style>
