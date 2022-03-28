<template>
  <div v-if="isElementSelected">
    {{elementData.shadow}}
    <img :src="elementData.image_uri" style="width: 100%" />
    <h1>{{ elementData.name["name-EUfr"] }}</h1>
    <ul v-if="isBebetopedie">
      <li>
        Période :
        <span v-if="elementData.availability['isAllYear']">Toute l'année</span>
        <span v-else>{{ elementData.availability["month-northern"] }}</span>
      </li>
      <li>
        Heure :
        <span v-if="elementData.availability['isAllDay']"
          >Toute la journée</span
        >
        <span v-else>{{
          generalTranslation.hour[elementData.availability["time"]]
        }}</span>
      </li>
      <li v-if="type != 'créatures marines'">
        Lieu :
        {{ elementTranslation.location[elementData.availability["location"]] }}
      </li>
      <li v-if="type != 'insectes'">
        Taille :
        {{ elementTranslation.size[elementData.shadow] }}
      </li>
      <li v-if="type == 'créatures marines'">
        Vitesse : {{ elementTranslation.speed[elementData.speed] }}
      </li>
      <li v-if="type != 'créatures marines'">
        Rareté :
        {{ generalTranslation.rarity[elementData.availability["rarity"]] }}
      </li>
      <li>Prix : {{ elementData.price }} clochettes</li>
      <li v-if="type == 'poissons'">
        Prix (Pollux) : {{ elementData["price-cj"] }} clochettes
      </li>
      <li v-else-if="type == 'insectes'">
        Prix (Djason) : {{ elementData["price-flick"] }} clochettes
      </li>
      <li v-if="isAvailable">Actuellement capturable</li>
      <li v-if="isLastMonth">Dernier mois !</li>
    </ul>
    <ul v-else-if="type == 'fossiles'">
      <li>Prix : {{ elementData["price"] }} clochettes</li>
    </ul>
    <ul v-else>
      <li>Prix de vente : {{ elementData["sell-price"] }} clochettes</li>
      <li v-if="elementData.hasFake">! Contrefaçon !</li>
      <li v-else>Pas de contrefaçon.</li>
    </ul>
  </div>
  <div v-else>
    <p>Veuillez sélectionner un élément.</p>
  </div>
</template>

<script>
/*
A CODER :
- Calendrier joli 
- Heures jolies + heures parsées et traduites
*/

import {
  getOneFishData,
  getOneBugData,
  getOneCreatureData,
  getOneFossilData,
  getOneArtData,
} from "@/services/api/acnhAPI.js";
import translation from "@/assets/translation.json";

export default {
  name: "card",
  props: {
    type: String,
  },
  data() {
    return {
      elementID: null,
      elementData: [],
      isAvailable: false,
      isLastMonth: false,
      isElementSelected: false,
      generalTranslation: translation.general,
      fishTranslation: translation.fish,
      creatureTranslation: translation.creature,
      insectTranslation: translation.insect,
      elementTranslation: null,
      isBebetopedie: true,
    };
  },

  watch: {
    type: function () {
      this.isElementSelected = false;
    },
  },

  beforeMount() {
    this.$root.$on("element-to-render", (id) => {
      this.elementID = id;
      if (this.elementID) {
        this.getAData(this.elementID);
      }
    });
    this.$root.$on("available", (bool) => {
      this.isAvailable = bool;
    });
    this.$root.$on("last-month", (bool) => {
      this.isLastMonth = bool;
    });
  },

  methods: {
    getAData: async function () {
      switch (this.type) {
        case "poissons":
          this.elementData = await getOneFishData(this.elementID);
          this.elementTranslation = this.fishTranslation;
          this.isBebetopedie = true;
          break;
        case "insectes":
          this.elementData = await getOneBugData(this.elementID);
          this.elementTranslation = this.insectTranslation;
          this.isBebetopedie = true;
          break;
        case "créatures marines":
          this.elementData = await getOneCreatureData(this.elementID);
          this.elementTranslation = this.creatureTranslation;
          this.isBebetopedie = true;
          break;
        case "fossiles":
          this.elementData = await getOneFossilData(this.elementID);
          this.isBebetopedie = false;
          break;
        case "oeuvres d'art":
          this.elementData = await getOneArtData(this.elementID);
          this.isBebetopedie = false;
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
</style>
