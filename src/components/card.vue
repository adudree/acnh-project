<template>
  <div v-if="isElementSelected" :class="['card', border]">
    <h2 :class="background">{{ elementData.name["name-EUfr"] }}</h2>
    <img :src="elementData.image_uri" class="imgCard" style="" />

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

    <fossil v-else-if="type == 'fossiles'" :element="elementData" />

    <art
      v-else-if="type == `oeuvres d'art`"
      :element="elementData"
      :hasFake="elementData.hasFake"
    />

    <div :class="['state', background]">{{msgState}}</div>
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
      border: "borderGrey",
      background: "bgGrey",
      msgState: "A récupérer"
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
    this.$root.$on("state", (state) => {
      this.setState(state)
    });
  },

  methods: {
    setState : function(state) {
      switch(state) 
      {
        case "museum": 
          this.border = "borderGreen";
          this.background = "bgGreen";
          this.msgState = "Au musée";
          break; 
        case "captured":
          this.border = "borderBlue"; 
          this.background = "bgBlue";
          this.msgState = "Capturé";
          break; 
        default: 
          this.border = "borderGrey"; 
          this.background = "bgGrey";
          this.msgState = "A récupérer";
          break; 
      }
    },
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
.card {
  margin: 30px;
  padding: 30px 0;
  width: 25vw;
  border: 5px solid;
  border-radius: 33px;
  background: #e8c7b1;
  position: relative;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
}

.card * {
  margin-top: 20px;
}
.imgCard {
  max-height: 40%;
  max-width: 100%;
  display: block;
  margin: auto;
  background: #f9f2d7;
  border-radius: 35px;
}

h2 {
  position: absolute;
  top: -40px;
  background: red;
  color: #fff;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  font-size: 1.3em;
  text-align: center;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
}

.state {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 10px 0;
  color: #fff;
  border-radius: 0 0 25px 25px;
}

.borderGrey {border-color: #bababa;}
.borderBlue {border-color: #61cac6;}
.borderGreen {border-color:  #4ec78c;}
.bgGrey {background: #bababa;}
.bgBlue {background: #61cac6;}
.bgGreen {background: #4ec78c;}
</style>
