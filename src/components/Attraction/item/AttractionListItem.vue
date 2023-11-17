<script setup>
defineProps({
  attraction: Object
})
</script>

<template>
  <!-- 관광지 검색 결과 아이템 => 가로에 3개-4개씩 뿌리면 될 듯...? -->
  <div class="col-lg-4 col-md-6 mt-4 mb-4">
    <div class="card z-index-2 ">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
        <div class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
          <div class="chart">
            <img :src="attraction.firstImage" onerror="this.src='src/assets/not_found.png'" class="chart-canvas" 
            style="width: 100%;">
          </div>
        </div>
      </div>
      <div class="card-body">
        <h6 class="mb-0 ">{{ attraction.title }}</h6>
        <hr class="dark horizontal">
          <p class="mb-0 text-sm">{{ attraction.addr1 }} {{ attraction.addr2 }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>