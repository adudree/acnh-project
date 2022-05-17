<template>
  <div :id="'element' + id" class="dabutton">
    <img :src="icon" class="iconList" />
    <div>
      <p>{{ name }}</p>
    </div>
    <div><p v-if="lastMonth">dernier mois !</p></div>
    <div><p v-if="capturable">capturable</p></div>
    <div :id="'capture' + id" :class="['state', state]" @click="switchCapture">
      {{stateCaptured[state]}}
    </div>
  </div>
</template>

<script>
export default {
  name: "listElement",

  props: {
    name: String,
    state: String,
    icon: String,
    lastMonth: Boolean,
    capturable: Boolean,
    id: Number,
  },
  data() {
    return {
      stateCaptured: {
        noCaptured: "-",
        captured: "Inventaire",
        museum: "Au musée",
      },
    };
  },

  methods: {
    switchCapture: function () {
      let stateToEmit = "";

      if (this.state == "noCaptured")     stateToEmit = "captured";
      else if (this.state == "captured")  stateToEmit = "museum";
      else                                stateToEmit = "noCaptured";
      
      this.$emit("changeState", {
        id: this.id,
        newState: stateToEmit
      });
    },
  },
};
</script>

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
  justify-content: space-between;
}

.dabutton:hover {
  background: #ffabbf;
  cursor: pointer;
}

.dabutton:focus {
  background: #ec849c;
}

.dabutton div,
.dabutton img {
  margin: auto 5px;
  padding: 5px;
}

.dabutton div {
  width: 20%;
}

.test {
  background: red;
}

.state {
  padding: 5px;
  width: 100px;
  text-align: center;
  color: #fff;
  border-radius: 50px;
}

.noCaptured {
  background: grey;
  border: 1px solid grey;
}

.museum {
  background: rgb(45, 194, 45);
  border: 1px solid rgb(45, 194, 45);
}

.captured {
  background: blue;
  border: 1px solid blue;
}
</style>
