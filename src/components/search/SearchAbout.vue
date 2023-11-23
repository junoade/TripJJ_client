<script setup>
const props = defineProps({
    searchMap:Map,
});

</script>

<template>
    <div class="p-4 mb-3 bg-light rounded">
        <h4 class="introduction">장소 설명</h4>
        <p class="mb-0">한국의 명소입니다요! <br> {{ props.searchMap.attraction_info.addr1 }}</p>
    </div>
</template>

<style scoped></style>