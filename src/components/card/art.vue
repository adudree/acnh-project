<template>
  <div>
    <!-- Price -->
    <property prop="Prix de vente" :value="element['sell-price'] + ' clochettes'" />
    <tag tagName="contrefacon" :isDisplayable="hasFake" />

  </div>
</template>

<script>
// components
import property from "./element/property.vue";
import tag from "./element/tag.vue";

export default {
  name: "art",
  components: {
      property,
      tag
  },
  props: {
    element: Object,
    hasFake: Boolean
  }
};
</script>

<style>

</style>