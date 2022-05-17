<template>
  <div v-if="isElementSelected">
    <img :src="elementData.image_uri" class="imgCard" style="" />
    <h1>{{ elementData.name["name-EUfr"] }}</h1>

    <fish
      v-if="type == 'poissons'"
      :element="elementData"
      :isAvailable="isAvailable"
      :isLastMonth="isLastMonth"
    />

    <insect
      v-else-if="type == 'insectes'"
      :element="elementData"
      :isAvailable="isAvailable"
      :isLastMonth="isLastMonth"
    />

    <creature
      v-else-if="type == 'créatures marines'"
      :element="elementData"
      :isAvailable="isAvailable"
      :isLastMonth="isLastMonth"
    />

    <fossil v-else-if="type == 'fossiles'" />

    <art
      v-else-if="type == `oeuvres d'art`"
      :element="elementData"
      :hasFake="elementData.hasFake"
    />
  </div>
  <div v-else>
    <p>Veuillez sélectionner un élément.</p>
  </div>
</template>

<script>
import {
  getOneFishData,
  getOneBugData,
  getOneCreatureData,
  getOneFossilData,
  getOneArtData,
} from "@/services/api/acnhAPI.js";

import fish from "./card/fish.vue";
import insect from "./card/insect.vue";
import creature from "./card/creature.vue";
import fossil from "./card/fossil.vue";
import art from "./card/art.vue";

export default {
  name: "card",
  components: {
    fish,
    insect,
    creature,
    fossil,
    art,
  },
  props: {
    type: String,
  },
  data() {
    return {
      elementData: [],
      isAvailable: false,
      isLastMonth: false,
      isElementSelected: false,
    };
  },

  watch: {
    type: function () {
      this.isElementSelected = false;
    },
  },

  beforeMount() {
    this.$root.$on("element-to-render", (id) => {
      this.getAData(id);
    });
    this.$root.$on("available", (bool) => {
      this.isAvailable = bool;
    });
    this.$root.$on("last-month", (bool) => {
      this.isLastMonth = bool;
    });
  },

  methods: {
    getAData: async function (id) {
      switch (this.type) {
        case "poissons":
          this.elementData = await getOneFishData(id);
          break;
        case "insectes":
          this.elementData = await getOneBugData(id);
          break;
        case "créatures marines":
          this.elementData = await getOneCreatureData(id);
          break;
        case "fossiles":
          this.elementData = await getOneFossilData(id);
          break;
        case "oeuvres d'art":
          this.elementData = await getOneArtData(id);
          break;
        default:
          break;
      }
      this.isElementSelected = true;
    },
  },
};
</script>

<style scoped>
.imgCard {
  max-height: 40%;
  max-width: 100%;
  display: block;
  margin: auto;
  border: 1px solid black;
}
</style>
