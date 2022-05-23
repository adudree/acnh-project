<template>
  <div :id="'element' + id" class="dabutton">
    <img :src="icon" class="iconList" />

    <p>{{ name }}</p>

    <tagElement v-if="lastMonth" :lastMonth="lastMonth" class="tag" />
    <tagElement v-else-if="test" :capturable="capturable" class="tag" />

    <tagElement
      :id="'capture' + id"
      @click.native="switchCapture"
      :state="state"
      class="state"
    />
  </div>
</template>

<script>
import tagElement from "./tagElement.vue";

export default {
  name: "listElement",
  components: {
    tagElement,
  },

  props: {
    name: String,
    state: String,
    icon: String,
    lastMonth: {
      type: Boolean,
      default: false
    },
    capturable: {
      type: Boolean,
      default: false
    },
    id: Number,
  },
  data() {
    return {
      test: this.capturable,
    }
  },
  watch: {
    name: function() {
      this.test = this.capturable
    }
  },

  methods: {
    switchCapture: function () {
      let stateToEmit = "";

      if (this.state == "noCaptured") stateToEmit = "captured";
      else if (this.state == "captured") stateToEmit = "museum";
      else stateToEmit = "noCaptured";

      this.$emit("changeState", {
        id: this.id,
        newState: stateToEmit,
      });
    },
  },
};
</script>

<style scoped>
.iconList {
  width: 40px;
  border: 2px solid #ba9173;
  background: #fff;
  border-radius: 50%;
  grid-area: 1 / 1 / 2 / 2;
}
.dabutton {
  display: grid;
  grid-template-columns: 0.3fr repeat(3, 1fr);
  grid-template-rows: 100% repeat(4, 1fr);
  grid-column-gap: 10px;

  background: #e8c7b1;
  border: 2px solid #ba9173;
  
  border-radius: 30px;
  font-weight: 600;
  font-size: 18px;
  width: 50vw;
  margin:  22px auto;
  padding: 5px;
  list-style-type: none;
  transition: 0.3s ease-out;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
}

p {
  grid-area: 1 / 2 / 2 / 3;
}

.tag {
  grid-area: 1 / 3 / 2 / 4;
}

.dabutton:hover {
  background: #997055;
  cursor: pointer;
}

.dabutton:focus {
  background: #997055;
}

.dabutton * {
  margin: auto 5px;
}

.state {
  grid-area: 1 / 4 / 2 / 5;
}


</style>
