<script setup>
import { ref } from "vue";
import SearchNearListItem from '@/components/search/item/SearchNearListItem.vue';

const props = defineProps({
    nearPlaces: Array,
})
console.log(props.nearPlaces);
const cultures = ref(props.nearPlaces.filter(
    culture => culture.contentTypeId === 14 || culture.contentTypeId === 28));
const attractions = ref(props.nearPlaces.filter(
    attraction => attraction.contentTypeId === 12 || attraction.contentTypeId === 15));
const facilities = ref(props.nearPlaces.filter(
    facility => facility.contentTypeId === 32 || facility.contentTypeId === 38 || facility.contentTypeId === 39));
</script>

<template>
    <h3 class="pb-2 mb-4 border-bottom"
        v-if="cultures.length>0">
        인근에 문화 시설이 있어요!
    </h3>
    <SearchNearListItem
        v-for="culture in cultures"
        :key="culture.contentId"
        :place="culture"/>

    <h3 class="pb-2 mb-4 border-bottom"
        v-if="attractions.length>0">
        인근에 관광지가 있어요!
    </h3>
    <div style="display: flex; flex-direction: row; overflow-x: scroll; ">
        <SearchNearListItem
        v-for="attraction in attractions"
        :key="attraction.contentId"
        :place="attraction"/>
    </div>

    <h3 class="pb-2 mb-4 border-bottom"
        v-if="facilities.length>0">
        인근에 편의 시설이 있어요!
    </h3>
    <SearchNearListItem
        v-for="facility in facilities"
        :key="facility"
        :place="facility"/>
</template>

<style scoped>

</style>