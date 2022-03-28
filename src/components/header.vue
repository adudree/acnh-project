<template>
  <div class="head">
    <div
      v-for="item in items"
      :key="item"
      v-bind:class="{ selectedMenu: type == item }"
      class="btnMenu"
      @click="selectItem(item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: "myHeader",
  data() {
    return {
      type: "poissons",
      items: ["poissons", "insectes", "créatures marines", "fossiles", 'oeuvres d\'art'],
    };
  },
  mounted() {
  },
  methods: {
    selectItem: function (item) {
      this.type = item;
      this.$root.$emit("selected-menu", item)
    },
  },
};
</script>

<style scoped>
.head {
  display: flex;
}

.head * {
    flex-grow: 1;
  text-align: center;
  padding: 20px;
  transition: 0.2s;
  border-bottom: 3px solid #fff;
}

.head *:hover {
  border-bottom: 3px solid rgb(204, 204, 204);
  cursor: pointer;
}

.selectedMenu {
  color: salmon;
  border-bottom: 3px solid salmon;
}
</style>