<script setup>
defineEmits(["viewAttraction", "updateNewInterests"]);
defineProps({
    attraction: Object,
    interests: Array,
})
</script>

<template>
    <div class="mb-3">
        <div class="card text-center text-dark bg-light mb-3">
            <div class="card-img-top">
                <img 
                    :src="attraction.firstImage" 
                    onerror="this.src='src/assets/not_found.png'" 
                    @click="$emit('viewAttraction', attraction)" 
                    style="max-width: 100%;">
                <button class="favorite-icon position-absolute top-0 end-0" @click="$emit('updateNewInterests', attraction)">
                    <span v-if="interests.some((contentId) => contentId===attraction.contentId)" 
                            role="img" style="color:red">❤</span>
                    <span v-else role="img">🤍</span>
                </button>
            </div>
            <div class="card-body">
              <h5 class="card-title fw-bold">{{ attraction.title }}</h5>
              <hr class="dark horizontal">

              <p class="card-text text-sm">{{ attraction.addr1 }} {{ attraction.addr2 }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.favorite-icon {
    cursor: pointer;
    font-size: 24px;
    background-color: transparent;
    border: 0;
}
</style>