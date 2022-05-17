<template>
  <div id="app">
    <myHeader id="header" />
    <gallery id="gallery" :type="type" :isBebetopedie="bebetopedie" />
    <card
      class="myElement"
      id="view"
      :type="type"
      :isBebetopedie="bebetopedie"
    />
    <myFooter id="footer" />
  </div>
</template>

<script>
import card from "./components/card.vue";
import gallery from "./components/gallery.vue";
import myHeader from "./components/header.vue";
import myFooter from "./components/footer.vue";

export default {
  name: "App",
  components: {
    myHeader,
    myFooter,
    card,
    gallery,
  },
  data() {
    return {
      type: "poissons",
      bebetopedie: true,
    };
  },
  mounted() {
    this.$root.$on("selected-menu", (item) => {
      this.type = item;
      this.bebetopedie = this.isBebetopedie();
    });
  },
  methods: {
    isBebetopedie: function () {
      return (
        this.type == "poissons" ||
        this.type == "créatures marines" ||
        this.type == "insectes"
      );
    },
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
}
#app {
  display: grid;
  grid-template-columns: 0.7fr 1.3fr 1fr;
  grid-template-rows: 0.3fr 1.6fr 1fr 1.6fr 0.2fr;
  gap: 0px 0px;
  grid-template-areas:
    "header header header"
    "gallery gallery view"
    "gallery gallery view"
    "gallery gallery view"
    "footer footer footer";
}
#gallery {
  grid-area: gallery;
}

#view {
  grid-area: view;
  border: 1px dotted black;
  padding: 10px;
  margin: 5px;
}

#header {
  grid-area: header;
}
#footer {
  grid-area: footer;
}
</style>
