<template>
  <table>
    <tr>
      <td id="jan">Janv.</td>
      <td id="fev">Fev.</td>
      <td id="mar">Mars</td>
      <td id="apr">Avril</td>
    </tr>
    <tr>
      <td id="may">Mai</td>
      <td id="jun">Juin</td>
      <td id="jul">Juil.</td>
      <td id="aug">Août</td>
    </tr>
    <tr>
      <td id="sep">Sept.</td>
      <td id="oct">Oct.</td>
      <td id="nov">Nov.</td>
      <td id="dec">Déc.</td>
    </tr>
  </table>
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

<style>
.available {
  background: red;
}
</style>