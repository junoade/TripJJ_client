<script setup>
import { RouterView } from "vue-router";
// import TheHeadingNavbar from "@/components/layout/TheHeadingNavbar.vue";
import NavbarDefault from "@/components/layout/NavbarDefault.vue";

</script>

<template>
  <NavbarDefault />
  <router-view></router-view>
</template>

<style>
@import "@/assets/css/font.css";
</style>
