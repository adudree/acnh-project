<template>
  <div class="property">
    <div class="propName">{{ prop }}</div>
    <div class="value">{{ value }}</div>
  </div>
</template>

<script>
export default {
  name: "property",
  props: {
    prop: String,
    value: String,
  },
};
</script>

<style scoped>
.property {
  display: flex;
  margin: 5px;
  align-items: stretch;
  justify-content: space-evenly;
}

.property * {
  padding: 5px 20px;
  flex-grow: 1;
  border-radius: 17px;
  max-width: 170px;
  margin: 5px;
  font-size: 1em;
}

.propName {
  background: #b18465;
  color: #f9f2d7;
  border: 2px solid #f9f2d7;
}

.value {
  background: #f9f2d7;
}
</style>