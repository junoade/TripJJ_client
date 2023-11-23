<script setup>

import { ref, computed, onBeforeUnmount } from "vue";
import { useSearchedPlace } from "@/stores/searchedPlace.js";

import SearchHeader from '@/components/search/SearchHeader.vue';
import SearchAbout from "@/components/search/SearchAbout.vue";
import AttractionInterestListItemVue from "@/components/Attraction/item/AttractionInterestListItem.vue";
import SearchNearListVue from '@/components/search/SearchNearList.vue';

const searchPlace = useSearchedPlace();
const searchMap = ref(searchPlace.searchMap);
const nearPlaces = ref(searchMap.value.nearPlaces);

onBeforeUnmount(() => {
    console.log("안녕")
    searchPlace.searchMap.clear;
});


</script>

<template>
    <main class="container">
        <SearchHeader :searchMap="searchMap" />
        
        <div class="row g-5">
            <div class="col-md-4">
                <div class="position-sticky" style="top: 2rem;">
                    <SearchAbout
                        :searchMap="searchMap"/>
                    <div class="p-4">
                        <h4 class="fst-italic">가까운 장소</h4>
                        <div class="overflow-y-auto" style="max-height: 400px;">
                            <AttractionInterestListItemVue
                                v-for="attraction in nearPlaces"
                                :key="attraction.title"
                                :attraction="attraction"        
                                >
                            </AttractionInterestListItemVue>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <SearchNearListVue
                    :nearPlaces="nearPlaces">         
                </SearchNearListVue>
            </div>

        </div>

    </main>
</template>

<style scoped></style>