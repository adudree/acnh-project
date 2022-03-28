<template>
  <div>
    <input type="checkbox" :id="type" :name="type" />
    <label :for="type">{{ msg }}</label>
  </div>
</template>

<script>
export default {
  name: "checkboxFilter",

  props: {
    type: String,
    msg: String,
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
