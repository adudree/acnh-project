<template>
  <div>
    <tableMonth :availability="element.availability['month-array-northern']" />
    <!-- Availability (hour) -->
    <property
      v-if="element.availability['isAllDay']"
      prop="Heure"
      value="Toute la journée"
    />
    <property
      v-else
      prop="Heure"
      :value="generalTranslation.hour[element.availability['time']]"
    />

    <!-- Location  -->
    <property
      prop="Lieu"
      :value="translation.location[element.availability['location']]"
    />

    <!-- Rarity -->
    <property
      prop="Rareté"
      :value="generalTranslation.rarity[element.availability['rarity']]"
    />

    <!-- Price -->
    <property prop="Prix" :value="element.price + ' clo.'" />
    <property
      prop="Prix (Djason)"
      :value="element['price-flick'] + ' clo.'"
    />

    <tag tagName="available" :isDisplayable="isAvailable" />
    <tag tagName="lastMonth" :isDisplayable="isLastMonth" />
  </div>
</template>

<script>
// translation
import translation from "@/assets/translation.json";

// components
import tableMonth from "./element/tableMonth.vue";
import property from "./element/property.vue";
import tag from "./element/tag.vue";

export default {
  name: "insect",
  components: {
    tableMonth,
    property,
    tag,
  },
  props: {
    element: Object,
    isAvailable: Boolean,
    isLastMonth: Boolean,
  },
  data() {
    return {
      generalTranslation: translation.general,
      translation: translation.insect,
    };
  },
};
</script>

<style>
</style>