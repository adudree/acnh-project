<template>
  <div :class="[state, tagClass]" :id="id">
    <p >{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "tagElement",
  props: {
    lastMonth: {
      type: Boolean,
      default: false,
    },
    capturable: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: null,
    },
    state: {
        type: String,
        default: null
    }
  },
  data() {
    return {
      tagClass: "",
      msg: "",
      stateCaptured: {
        noCaptured: "-",
        captured: "Inventaire",
        museum: "Au musée",
      },

    };
  },
  watch: {
    state: function () {
      this.msg = this.stateCaptured[this.state];
    },
  },
  mounted() {
    if (this.state != null) this.msg = this.stateCaptured[this.state];

    if (this.lastMonth) {
      this.tagClass = "lastMonthClass";
      this.msg = "dernier mois";
    } else if (this.capturable && !this.lastMonth) {
      this.tagClass = "capturableClass";
      this.msg = "capturable";
    }
  },

};
</script>

<style scoped>
div {
  padding: 5px;
  width: 130px;
  text-align: center;
  color: #fff;
  border-radius: 21px;
  margin: auto;
  transition: 0.3s;
}

p {
  text-align: center;
  margin: auto;
  padding: 5px;
  border-radius: 21px;
}

.lastMonthClass {
  background: #ff9892;
  color: #be3b34;
}

.capturableClass {
  background: #f9f2d7;
  color: #baac77;
}

.noCaptured {
  background: #bababa;
  border: 2px solid #fff;
}

.noCaptured:hover {
  background: #9b9b9b;
}

.museum {
  background: #4ec78c;
  border: 2px solid #fff;
}

.museum:hover {
  background: #3ba06f;
}

.captured {
  background: #61cac6;
  border: 2px solid #fff;
}

.captured:hover {
  background: #45a5a2;
}
</style>