<template></template>

<script setup lang="ts">
import ThreeJs from "./index";
import { onMounted } from "vue";
import WebGL from "../../utils/webgl"
onMounted(() => {
    if (WebGL.isWebGLAvailable()) {
        // Initiate function or other initializations here
        new ThreeJs();
    } else {
        const warning = WebGL.getWebGLErrorMessage();
        document.getElementById('container')?.appendChild(warning);
    }

});
</script>

<style scoped>
</style>
