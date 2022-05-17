<template>
  <div>
    <input type="radio" :id="nameFilter" :value="value" @input="handleSelect" />
    <label :for="nameFilter">{{ msg }}</label>
  </div>
</template>

<script>
export default {
  name: "filters",

  props: {
    nameFilter: String,
    msg: String,
    value: String,
  },
  mounted() {
    this.checkInput();
  },
  watch: {
    value: function () {
      this.checkInput();
    },
  },
  methods: {
    handleSelect: function () {
      this.$emit("input", this.nameFilter);
    },
    checkInput: function () {
      if (this.value == this.nameFilter)
        document.getElementById(this.nameFilter).checked = true;
      else document.getElementById(this.nameFilter).checked = false;
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
