<template>
  <div id="gallery">
    <h1>tous les {{ type }}</h1>
    {{isBebetopedie}}
    <div class="trier">
      <label>Trier par : </label>

      <input
        type="radio"
        id="identifiant"
        value="identifiant"
        v-model="sortBy"
      />
      <label for="identifiant">Identifiant</label>

      <input type="radio" id="name" value="name" v-model="sortBy" />
      <label for="name">Nom</label>

      <input type="radio" id="price" value="price" v-model="sortBy" />
      <label for="price">Prix</label>

      <br />
      <div v-if="isBebetopedie">

      <label>Sélectionner :</label>
      <input type="radio" id="all" value="all" v-model="selectBy" />
      <label for="all">Tous</label>

      <input
        type="radio"
        id="capturable"
        value="capturable"
        v-model="selectBy"
      />
      <label for="capturable">Actuellement capturable</label>

      <input type="radio" id="lastMonth" value="lastMonth" v-model="selectBy" />
      <label for="lastMonth">Dernier mois !</label>
      </div>

      <input type="text" v-model="search" placeholder="Rechercher..." />
    </div>

    <div id="liste">
      <listElement
        v-for="element in sortedList"
        :key="element.id"
        :id="element.id"
        :name="element.name['name-EUfr']"
        :icon="element.icon_uri"
        :lastMonth="isLastMonth[element.id]"
        :capturable="isAvailable[element.id]"
        @click.native="selectOneElement(element.id)"
      />
    </div>

    <p v-if="!sortedList.length">Pas de résultat.</p>
  </div>
</template>

<script>
/*
- Filtre "capturé / non capturé" [plus tard]
*/

import {
  getFishesData,
  getBugsData,
  getCreaturesData,
  getFossilsData,
  getArtsData,
} from "@/services/api/acnhAPI.js";
import listElement from "./gallery/listElement.vue";

export default {
  name: "gallery",
  components: {
    listElement,
  },

  props: {
    type: String,
    isBebetopedie: Boolean
  },

  data() {
    return {
      listData: [],
      search: "",
      sortBy: "identifiant",
      selectBy: "all",
      isAvailable: [],
      isLastMonth: [],
    };
  },

  computed: {
    sortedList: function () {
      const searchBar = (a) =>
        a.name["name-EUfr"].toLowerCase().includes(this.search.toLowerCase());

      return this.listData
        .filter(this.filterBy(this.selectBy))
        .filter(searchBar)
        .sort(this.compareBy(this.sortBy));
    },
  },

  created() {
    this.getAllData(this.type);
  },

  watch: {
    type: function () {
      this.getAllData(this.type);
      this.resetFilters();
      this.isAvailable = []
      this.isLastMonth = []
    },
  },

  methods: {
    filterBy: function (parameter) {
      switch (parameter) {
        case "lastMonth":
          return (a) => this.isLastMonth[a.id];

        case "capturable":
          return (a) => this.isAvailable[a.id];

        default:
          return (a) => a;
      }
    },

    compareBy: function (parameter) {
      switch (parameter) {
        case "identifiant":
          return (a, b) => a.id - b.id;

        case "name":
          return (a, b) =>
            a.name["name-EUfr"].localeCompare(b.name["name-EUfr"]);

        case "price":
          return (a, b) => a.price - b.price;

        default:
          break;
      }
    },

    getAllData: async function (newType) {
      let ObjectData = null;

      switch (newType) {
        case "poissons":
          ObjectData = await getFishesData();
          break;
        case "insectes":
          ObjectData = await getBugsData();
          break;
        case "créatures marines":
          ObjectData = await getCreaturesData();
          break;
        case "fossiles":
          ObjectData = await getFossilsData();
          break;
        case "oeuvres d'art":
          ObjectData = await getArtsData();
          break;
      }

      this.listData = Object.values(ObjectData);

      if (this.type == "fossiles") {
        this.listData.map((x, i) => (x.id = i + 1));
      }

      if (this.isBebetopedie)
        this.setAvailability();
      else 
        this.listData.map((x) => (x.icon_uri = x.image_uri));

    },

    resetFilters: function () {
      this.search = "";
      this.sortBy = "identifiant";
      this.selectBy = "all";
    },

    setAvailability: function () {
      const d = new Date();
      const m = d.getMonth() + 1; // décalage d'indice
      const h = d.getHours();

      this.listData.forEach((element) => {
        if (element.availability["month-array-northern"].includes(m)) {
          if (element.availability["time-array"].includes(h)) {
            this.isAvailable[element.id] = true;    // actuellement capturable (heure)
          }

          if (!element.availability["month-array-northern"].includes(m + 1)) {
            this.isLastMonth[element.id] = true;    // dernier mois (mois) 
          } else {
            this.isLastMonth[element.id] = false;   // pas dernier mois
          }
        } else {
          this.isAvailable[element.id] = false;     // pas actuellement capturable (mois)
        }
      });
    },

    selectOneElement: function (id) {
      if (this.type != "fossiles") {
        this.$root.$emit("element-to-render", id);
        if (this.isBebetopedie) {
          this.$root.$emit("available", this.isAvailable[id]);
          this.$root.$emit("last-month", this.isLastMonth[id]);
        }
      }
      else {
        const elemToRender = this.sortedList[id]
        this.$root.$emit("element-to-render", elemToRender["file-name"]);
      }
    },
  },
};
</script>

<style scoped>
#gallery {
  display: flex;
  flex-direction: column;
}
#liste {
  max-height: 100%;
  overflow-y: scroll;
}
</style>
