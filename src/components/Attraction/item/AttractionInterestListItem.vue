<script setup>
defineEmits(["viewAttraction", "updateNewInterests"]);
defineProps({
    attraction: Object,
})
</script>

<template>
    <div class="d-flex align-items-center pb-1" id="tooltips-container">
        <img :src="attraction.firstImage"
            class="rounded-circle img-fluid avatar-md img-thumbnail bg-transparent"
            onerror="this.src='src/assets/not_found.png'"
            @click="$emit('viewAttraction', attraction)" >
        <div class="w-100 ms-3">
            <h5 class="mb-1">{{ attraction.title }}</h5>
            <p class="mb-0 font-13">{{ attraction.addr1 }} {{ attraction.addr2 }}</p>
        </div>
    </div>
    <hr class="dark horizontal">
</template>

<style scoped>
.favorite-icon {
  cursor: pointer;
  font-size: 24px;
  background-color: transparent;
  border: 0;
}
.rounded-circle {
    border-radius: 50% !important;
}
.avatar-md {
    height: 3.5rem;
    width: 3.5rem;
}
.img-thumbnail {
    padding: .25rem;
    background-color: #ecf2f5;
    border: 1px solid #dee2e6;
    border-radius: .25rem;
    max-width: 100%;
    height: auto;
}
.font-13 {
    font-size: 13px !important;
}



</style>