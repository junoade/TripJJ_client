<script setup>
import { useInterestStore } from "@/stores/interest";
import { storeToRefs } from "pinia";

const interestStore = useInterestStore();
const { interestMap } = storeToRefs(interestStore);

defineEmits(["viewAttraction", "updateInterests"]);
defineProps({
    attraction: Object,
})
</script>

<template>
  <!-- 관광지 검색 결과 아이템 => 가로에 3개-4개씩 뿌리면 될 듯...? -->
  <div class="mb-md-3">
    <div class="card text-center text-dark bg-light mb-3">
      <div class="card-img-top">
        <img 
            :src="attraction.firstImage" 
            onerror="this.src='src/assets/not_found.png'" 
            @click="$emit('viewAttraction', attraction)" 
            style="max-width: 100%;">
      </div>
      <div class="card-body">
        <h5 class="card-title fw-bold">{{ attraction.title }}</h5>
        <hr class="dark horizontal">
        
        <p class="card-text text-sm">{{ attraction.addr1 }} {{ attraction.addr2 }}</p>
        <hr class="dark horizontal">

        <button class="favorite-icon" @click="$emit('updateInterests', attraction)">
            <span v-if="interestMap.has(attraction.contentId)" role="img" style="color:red">❤</span>
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

.interest {
    color: red;
}
</style>