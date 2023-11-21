<script setup>
import { useInterestAttractionStore, } from "@/stores/interested";
import { storeToRefs } from "pinia";

const interestAttractionStore = useInterestAttractionStore();
const { interestAttractionMap } = storeToRefs(interestAttractionStore);

defineProps({
    attraction: Object
})
</script>

<template>
    <div class="mb-md-3">
        <div class="card text-center text-dark bg-light mb-3">
            <div class="card-img-top">
                <img :src="attraction.firstImage" onerror="this.src='src/assets/not_found.png'"
                        style="max-width: 100%;">
            </div>
            <div class="card-body">
                <h5 class="card-title fw-bold">{{ attraction.title }}</h5>
                <hr class="dark horizontal">

                <p class="card-text text-sm">{{ attraction.addr1 }} {{ attraction.addr2 }}</p>
                <hr class="dark horizontal">
                
                <button class="favorite-icon" @click="interestAttractionStore.updateInterest(attraction)">
                    <span v-if="interestAttractionMap.has(attraction.contentId)" role="img"  style="color:red">❤</span>
                    <span v-else role="img">🤍</span>
                </button>
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