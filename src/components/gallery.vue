<template>
  <div>
    <h1>tous les {{ type }}</h1>
    <div class="trier">
      <label for="sort">Trier par : </label>
      <button @click="orderByName()">Nom</button>
    </div>
    <ul>
      <li
        class="dabutton"
        tabindex="0"
        v-for="fish in fishesData"
        :key="fish.id"
        @click="selectOnefish(fish.id)"
      >
        <img
          :src="fish.icon_uri"
          style="
            width: 40px;
            border: 1px solid;
            background: #fff;
            border-radius: 50%;
          "
        />
        <p>{{ fish.name["name-EUfr"] }}</p>
      </li>
    </ul>
  </div>
</template>

<script>

/*
A CODER :
- "Dernier mois !"
- Filtre "actuellement capturable" ==> ça va être cho patate
- Filtre "Localisation"
- Filtre "capturé / non capturé" 
*/

import { getFishesData } from "@/services/api/acnhAPI.js";

export default {
  name: "gallery",

  props: {
    type: String,
  },

  data() {
    return {
      fishesData: [],
    };
  },

  created: function () {
    this.getAllFishesData();
  },

  methods: {
    getAllFishesData: async function () {
      let ObjectData = await getFishesData();
      this.fishesData = Object.values(ObjectData);
    },

    selectOnefish: function (id) {
      this.$root.$emit("fish-to-render", id);
    },

    orderByName: function () {
      function compare(a, b) {
        if (a.name["name-EUfr"] < b.name["name-EUfr"]) return -1;
        else if (a.name["name-EUfr"] > b.name["name-EUfr"]) return 1;
        return 0;
      }
      return this.fishesData.sort(compare);
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
  border: 1px solid black;
  border-radius: 50px;
  margin: 10px 0;
  padding: 10px;
  list-style-type: none;
  transition: 0.3s ease-out;
  display: flex;
}

li:hover {
  background: #ffabbf;
  cursor: pointer;
}

li:focus {
  background: #ec849c;
}

li * {
  margin: auto 5px;
}
</style>
