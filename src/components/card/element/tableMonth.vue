<template>
  <div class="months">
      <div id="jan">J</div>
      <div id="fev">F</div>
      <div id="mar">M</div>
      <div id="apr">A</div>
      <div id="may">M</div>
      <div id="jun">J</div>
      <div id="jul">J</div>
      <div id="aug">A</div>
      <div id="sep">S</div>
      <div id="oct">O</div>
      <div id="nov">N</div>
      <div id="dec">D</div>
    </div>
</template>

<script>
export default {
  name: "tableMonth",
  props: {
    availability: Array,
  },

  watch: {
    availability() {
      this.setAvailability();
    }
  },
  mounted() {
    this.setAvailability();
  },

  methods: {
    setAvailability: function () {
      let allMonth = {
        1: "jan",
        2: "fev",
        3: "mar",
        4: "apr",
        5: "may",
        6: "jun",
        7: "jul",
        8: "aug",
        9: "sep",
        10: "oct",
        11: "nov",
        12: "dec",
      };

      this.resetMonth();

      let tabMonth = Object.values(this.availability);


      for (let i = 1; i <= 12; i++) {
        if (tabMonth.includes(i) && document.getElementById(allMonth[i])) {
          document.getElementById(allMonth[i]).classList.add("available");
        }
      }
    },
    resetMonth: function () {
      let allMonth = {
        1: "jan",
        2: "fev",
        3: "mar",
        4: "apr",
        5: "may",
        6: "jun",
        7: "jul",
        8: "aug",
        9: "sep",
        10: "oct",
        11: "nov",
        12: "dec",
      };

      for (let i = 1; i <= 12; i++) {
        if (document.getElementById(allMonth[i])) {
          
          document.getElementById(allMonth[i]).classList.remove("available");
        }
      }
    },
  },
};
</script>

<style scoped>
.months {
  display: flex;
  width: 80%;
  margin: auto;
  border: 1px solid #B18465;
}

.months div {
  flex-grow: 1;
  flex-shrink: 3; 
  border: 1px solid #B18465;
  color: #B18465;
  text-align: center;
  font-weight: bold;
}

.available {
  background: #F9F2D7;
}
</style>