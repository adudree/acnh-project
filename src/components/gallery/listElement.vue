<template>
  <div class="dabutton">
    <img :src="icon" class="iconList" />
    <p>{{ name }}</p>
    <p v-if="lastMonth">dernier mois !</p>
    <p v-if="capturable">actuellement capturable</p>
  </div>
</template>

<script>
export default {
  name: "listElement",

  props: {
    name: String,
    icon: String,
    lastMonth: Boolean,
    capturable: Boolean,
    id: Number,
  },

};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.iconList {
  width: 40px;
  border: 1px solid;
  background: #fff;
  border-radius: 50%;
}
.dabutton {
  border: 1px solid black;
  border-radius: 50px;
  margin: 10px 0;
  padding: 10px;
  list-style-type: none;
  transition: 0.3s ease-out;
  display: flex;
}

.dabutton:hover {
  background: #ffabbf;
  cursor: pointer;
}

.dabutton:focus {
  background: #ec849c;
}

.dabutton * {
  margin: auto 5px;
}
</style>
