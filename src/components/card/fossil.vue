<template>
  <div>
    <!-- Price -->
    <property prop="Prix" :value="element.price + ' clochettes'" />
  </div>
</template>

<script>

// components
import property from "./element/property.vue";

export default {
  name: "fossil",
  components: {
      property
  },
  props: {
    element: Object,
  }
};
</script>

<style>
</style>