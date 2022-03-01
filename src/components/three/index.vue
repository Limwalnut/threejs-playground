<template></template>

<script setup lang="ts">
import ThreeJs from "./index";
import { onMounted } from "vue";
onMounted(() => {
    new ThreeJs();
});
</script>

<style scoped>
</style>
