<script setup>
import { RouterView } from "vue-router";
import TheHeadingNavbar from "@/components/layout/TheHeadingNavbar.vue";
// import NavbarDefault from "@/components/layout/NavbarDefault.vue";

</script>

<template>
  <!-- d-flex h-100 text-center text-white bg-dark -->
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <TheHeadingNavbar/>
      </div>
    </div>
  </div>
  <router-view></router-view>
  
</template>

<style scoped></style>
