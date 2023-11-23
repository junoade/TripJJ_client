<script setup>

const props = defineProps({
    place: Object
})

</script>

<template>
    <div class="card text-center text-dark bg-light m-3" style="min-width: 200px; max-height: 300px;">
        <div class="card-img-top">
            <img 
                :src="props.place.firstImage" 
                onerror="this.src='src/assets/not_found.png'" 
                style="max-height: 150px; max-width: 200px;">
        </div>
        <div class="card-body">
          <h5 class="card-title fw-bold">{{ props.place.title }}</h5>
          <hr class="dark horizontal">
          <p class="card-text text-sm">{{ props.place.addr1 }} {{ props.place.addr2 }}</p>
        </div>
    </div>
</template>

<style scoped>

</style>