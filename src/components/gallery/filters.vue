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
div {
  display: inline-block; 
  margin: 5px;
  height: 35px;
}

input {
  visibility: hidden;
}

label {
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 33px;
  transition: 0.3s;
  background: #F9F2D7;
  color: #B18465;
  border: 2px solid #B18465;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
}

label:hover {
  background: #d8c997;
}

input:checked + label {
  background: #B18465;
  color: #F9F2D7;
  border: 2px solid #F9F2D7;
}

input:checked + label:hover {
  background: #997055;
}
</style>
