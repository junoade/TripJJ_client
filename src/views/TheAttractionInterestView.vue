<!-- 관심 관광지 정보 템플릿 -->
<script setup>
import AttractionListItem from "@/components/Attraction/item/AttractionListItem.vue";
import { onMounted, onBeforeUnmount } from "vue";
</script>

<template>
    <div>
        <h1>관심 관광지</h1>
        <div class="interest-card-list">
            <!-- 여기에 DB에서 데이터를 받는다 -->
            <!-- <AttractionListItem
                v-for="interest in interestAttractionMap.values"
                :key="interest.key"
                :attraction="interest.value"
            /> -->
         </div>
    </div>
</template>

<style scoped>
.interest-card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>