<template>
  <div>
    <h1>tous les {{type}}</h1>
  <ul>
    <li v-for='fish in fishesData' :key='fish.id' @click="selectOnefish(fish.id)" >
      <img :src="fish.icon_uri" style="width:40px;border:1px solid;" />
      {{fish.name["name-EUfr"]}}
    </li>
  </ul>
  </div>
</template>

<script>
import {getFishesData} from "@/services/api/acnhAPI.js"

export default {
  name: 'gallery',

  props: {
    type: String,
  },

	data() {
    return {
      fishesData: []
    }
  },

  created: function() {
		this.getAllFishesData()
	},

	methods: {
			getAllFishesData: async function() {
					this.fishesData = await getFishesData()
			},
      selectOnefish: function(id) {
        this.$root.$emit('fish-to-render', id)
      }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
  border: 1px solid black;
  margin: 10px 0;
  padding: 10px;
  list-style-type: none;
  transition: 0.3s ease-out;
}
li:hover {
  background: #f45a7f;
  cursor: pointer;
}

</style>
