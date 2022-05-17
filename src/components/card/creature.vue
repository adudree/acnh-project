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

    <!-- Size -->
    <property prop="Taille" :value="translation.size[element.shadow]" />

    <!-- Speed -->
    <property prop="Vitesse" :value="translation.speed[element.speed]" />

    <!-- Price -->
    <property prop="Prix" :value="element.price + ' clochettes'" />

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
  name: "creature",
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
      translation: translation.creature,
    };
  },
};
</script>
