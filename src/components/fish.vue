<template>
  <div v-if="isFishSelected">
    <img :src="fishData.image_uri" style="width:100%;"/>
    <h1>{{ fishData.name["name-EUfr"] }}</h1>
    <ul>
      <li> Période : 
        <span v-if="fishData.availability['isAllYear']">Toute l'année</span>
        <span v-else>{{fishData.availability['month-northern']}}</span>
      </li>
      <li>Heure : 
        <span v-if="fishData.availability['isAllDay']">Toute la journée</span>
        <span v-else>{{fishData.availability["time"]}}</span>
      </li>
      <li>Lieu : 
        {{fishLocation[fishData.availability["location"]]}}
      </li>
      <li>Taille : {{fishSize[fishData.shadow]}}</li>
      <li>Rareté : {{fishRarity[fishData.availability["rarity"]]}}</li>
      <li>Prix : {{fishData.price}} clochettes</li>
      <li>Prix (Pollux) : {{fishData["price-cj"]}} clochettes</li>
    </ul>
  </div>
  <div v-else>
    <h1>Pas de poisson sélectionné.</h1>
  </div>

</template>

<script>

import {getOneFishData} from "@/services/api/acnhAPI.js"
import translation from "@/assets/translation.json"

export default {
  name: 'fish',
  props: {
  },
  data() {
    return {
      fishID:null,
      fishData: [],
      fishLocation: translation.fishLocation,
      fishSize: translation.fishSize,
      fishRarity: translation.rarity,
      isFishSelected: false,
    }
  },
  mounted() {
    this.$root.$on('fish-to-render', (id) => {
      this.fishID = id
      this.isFishSelected = true

      if (this.fishID) {
        this.getAFish(this.fishID)
      }
    })
  },
	methods: {
    getAFish: async function() {
        this.fishData = await getOneFishData(this.fishID)
    },

	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
