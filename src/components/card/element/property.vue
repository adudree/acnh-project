<template>
<div>
    {{ prop }} : {{ value }} 
</div>
</template>

<script>


export default {
    name:"property",
    props: {
        prop: String,
        value: String
    },
}
</script>

<style>

</style>