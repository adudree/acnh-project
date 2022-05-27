<template>
  <div v-if="isDisplayable" :class="tagName">{{ text }}</div>
</template>

<script>
export default {
  name: "tag",
  props: {
    tagName: String,
    isDisplayable: Boolean,
  },
  data() {
    return {
      text: "",
    };
  },
  mounted() {
    this.setTag();
  },
  methods: {
    setTag: function () {
      switch (this.tagName) {
        case "available":
          this.text = "Capturable";
          break;
        case "lastMonth":
          this.text = "Dernier mois !";
          break;
        case "contrefacon":
          this.text = "Contrefaçon";
          break;
        default:
          this.text = "";
          break;
      }
    },
  },
};
</script>

<style scoped>
div {
  display: inline-block;
  padding: 10px;
  border-radius: 17px;
  margin: 5px;
}

.available {
  background: #f9f2d7;
  color: #baac77;
}
.lastMonth {
  background: #ff9892;
  color: #be3b34;
}
</style>