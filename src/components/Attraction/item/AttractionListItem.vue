<script setup>
defineProps({
  attraction: Object
})
</script>

<template>
  <!-- 관광지 검색 결과 아이템 => 가로에 3개-4개씩 뿌리면 될 듯...? -->
  <div class="mb-md-3">
    <div class="card">
      <div class="card-header p-0 mx-3 bg-transparent">
        <div class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
            <img :src="attraction.firstImage" onerror="this.src='src/assets/not_found.png'" 
                  style="max-width: 80px; max-height:60px">
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