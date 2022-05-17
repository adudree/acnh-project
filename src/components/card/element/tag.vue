<template>
  <div v-if="isDisplayable">{{ text }}</div>
</template>

<script>
export default {
    name: "tag", 
    props: {
        tagName: String,
        isDisplayable: Boolean
    },
    data() {
        return {
            text: "",
        }
    },
    mounted() {
        this.setTag();
    },
    methods: {
        setTag: function() {
            switch(this.tagName) {
                case "available": 
                    this.text = "Actuellement capturable";
                    break; 
                case "lastMonth": 
                    this.text = "Dernier mois !"
                    break;
                case "contrefacon": 
                    this.text = "Contrefaçon"; 
                    break;
                default: 
                    this.text = "";
                    break;
            }
        }
    }
}
</script>

<style>
</style>