<template>
  <div id="gallery">
    <h1>{{ type }} [{{ museumCounter }}/{{ listData.length }}]</h1>

    <div class="trier">
      <label>Trier par : </label>

      <filters nameFilter="identifier" msg="Identifiant" v-model="sortBy" />
      <filters nameFilter="name" msg="Nom" v-model="sortBy" />
      <filters nameFilter="price" msg="Prix" v-model="sortBy" />
      <input type="text" v-model="search" placeholder="Rechercher..." class="searchBar" />

      <br />
      <label>Sélectionner :</label>

      <filters nameFilter="all" msg="Tous" v-model="selectBy" />
      <filters nameFilter="captured" msg="Récupérés" v-model="selectBy" />
      <filters nameFilter="noCaptured" msg="A récupérer" v-model="selectBy" />

      <filters
        nameFilter="capturable"
        msg="Capturable"
        v-model="selectBy"
        v-if="isBebetopedie"
      />

      <filters
        nameFilter="lastMonth"
        msg="Dernier mois !"
        v-model="selectBy"
        v-if="isBebetopedie"
      />

    </div>

    <div v-if="sortedList.length" id="liste">
      <listElement
        v-for="element in sortedList"
        :key="element.id"
        :id="element.id"
        :name="element.name['name-EUfr']"
        :icon="element.icon_uri"
        :lastMonth="isLastMonth[type][element.id]"
        :capturable="isAvailable[type][element.id]"
        :state="state[type][element.id]"
        @click.native="selectOneElement(element.id)"
        @changeState="onChangeState"
      />
    </div>
    <p v-else>Pas de résultat.</p>
  </div>
</template>

<script>
import {
  getFishesData,
  getBugsData,
  getCreaturesData,
  getFossilsData,
  getArtsData,
} from "@/services/api/acnhAPI.js";

import listElement from "./gallery/listElement.vue";
import filters from "./gallery/filters.vue";

export default {
  name: "gallery",
  components: {
    listElement,
    filters,
  },

  props: {
    type: String,
    isBebetopedie: Boolean,
  },

  data() {
    return {
      listData: [],
      search: "",
      sortBy: "identifier",
      selectBy: "all",
      state: {
        poissons: [],
        insectes: [],
        "créatures marines": [],
        fossiles: [],
        "oeuvres d'art": [],
      },
      isLastMonth: {
        poissons: [],
        insectes: [],
        "créatures marines": [],
        fossiles: [],
        "oeuvres d'art": [],
      },
      isAvailable: {
        poissons: [],
        insectes: [],
        "créatures marines": [],
        fossiles: [],
        "oeuvres d'art": [],
      },
      museumCounter: 0,
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

  mounted() {
    this.getAllData(this.type);
  },

  watch: {
    type: function (newt, oldt) {
      console.log(newt, oldt);
      this.getAllData(newt);
      this.resetFilters();
      this.museumCounter = 0;
    },
    state: function () {
      this.counterInMuseum();
    },
    deep: true,
  },

  methods: {
    // =============== SORT & FILTERS =============== //

    filterBy: function (parameter) {
      switch (parameter) {
        case "lastMonth":
          return (a) => this.isLastMonth[this.type][a.id];

        case "capturable":
          return (a) => this.isAvailable[this.type][a.id];

        case "captured":
          return (a) => this.state[this.type][a.id] != "noCaptured";

        case "noCaptured":
          return (a) => this.state[this.type][a.id] == "noCaptured";

        default:
          return (a) => a;
      }
    },

    compareBy: function (parameter) {
      switch (parameter) {
        case "identifier":
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

      this.setInformation();
    },

    resetFilters: function () {
      this.search = "";
      this.sortBy = "identifier";
      this.selectBy = "all";
    },

    // ================ AVAILABILITY ================ //

    setAvailability: function () {
      const d = new Date();
      const m = d.getMonth() + 1; // décalage d'indice
      const h = d.getHours();

      this.listData.forEach((element) => {
        if (element.availability["month-array-northern"].includes(m)) {
          if (element.availability["time-array"].includes(h)) {
            this.isAvailable[this.type][element.id] = true; // actuellement capturable (heure)
          }

          if (!element.availability["month-array-northern"].includes(m + 1)) {
            this.isLastMonth[this.type][element.id] = true; // dernier mois (mois)
          } else {
            this.isLastMonth[this.type][element.id] = false; // pas dernier mois
          }
        } else {
          this.isAvailable[this.type][element.id] = false; // pas actuellement capturable (mois)
        }
      });
    },

    selectOneElement: function (id) {
      this.$root.$emit("state", this.state[this.type][id]);
      if (this.type != "fossiles") {
        this.$root.$emit("element-to-render", id);
        if (this.isBebetopedie) {
          this.$root.$emit("available", this.isAvailable[this.type][id]);
          this.$root.$emit("last-month", this.isLastMonth[this.type][id]);
        }
      } else {
        const elemToRender = this.sortedList[id];
        this.$root.$emit("element-to-render", elemToRender["file-name"]);
      }
    },

    // =============== STATE OF CAPTURE ============== //

    setInformation: function () {
      if (this.type == "fossiles") {
        // set id des fossiles (absents de l'API)
        this.listData.map((x, i) => (x.id = i + 1));
      }

      if (this.isBebetopedie) {
        // actuellement capturable & dernier mois

        this.setAvailability();
      }
      // seulement pour fossiles & art
      else this.listData.map((x) => (x.icon_uri = x.image_uri));

      this.setState();
      this.initCounter();
    },

    setState: function () {
      this.listData.forEach((element) => {
        if (
          this.$cookies.get("this.state[" + this.type + "][" + element.id + "]")
        ) {
          this.state[this.type][element.id] = this.$cookies.get(
            "this.state[" + this.type + "][" + element.id + "]"
          );
        }
        if (!this.state[this.type][element.id]) {
          this.state[this.type][element.id] = "noCaptured";
        }
      });
    },

    onChangeState: function (value) {
      this.state[this.type].splice(value.id, 1, value.newState);
      this.$cookies.set(
        "this.state[" + this.type + "][" + value.id + "]",
        value.newState,
        "30d"
      );
      if (value.newState == "museum") this.museumCounter++;
      else if (value.newState == "noCaptured") this.museumCounter--;
    },

    initCounter: function () {
      this.state[this.type].forEach((element) => {
        if (element == "museum") {
          this.museumCounter++;
        }
      });
    },
  },
};
</script>

<style scoped>
h1 {
  color: #b18465;
  font-weight: bold;
}
#gallery {
  display: flex;
  flex-direction: column;
}
#liste {
  max-height: 100%;
  overflow-y: scroll;
  width: 100%;
}

::-webkit-scrollbar {
  width: 2em; /* Total width including `border-width` of scrollbar thumb */
  height: 0;
}
::-webkit-scrollbar-thumb {
  height: 1em;
  border: 0.5em solid rgba(0, 0, 0, 0); /* Transparent border together with `background-clip: padding-box` does the trick */
  background-clip: padding-box;
  -webkit-border-radius: 1em;
  background-color: rgba(0, 0, 0, 0.15);
  -webkit-box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.025);
}
::-webkit-scrollbar-button {
  width: 0;
  height: 0;
  display: none;
}
::-webkit-scrollbar-corner {
  background-color: transparent;
}

.searchBar {
  border: none;
  border-radius: 33px;
  font-family: "Mali", cursive;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
  padding: 5px 10px;
  margin: 0 30px ;
}
</style>