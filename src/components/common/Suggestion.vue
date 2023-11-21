<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
    searchKeyword: "서울"
})

const suggestions = ref([]);
var kakaoPlaceSearch;

onMounted(() => {
    if (window.kakao && window.kakao.maps) {
        initSearch();
    } else {
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
            }&libraries=services,clusterer`;

        /* global kakao */
        script.onload = () => kakao.maps.load(() => initSearch());
        document.head.appendChild(script);
    }
});



const initSearch = () => {
    console.log("initSearch 전", kakaoPlaceSearch);
    kakaoPlaceSearch = new kakao.maps.services.Places();
    console.log("initSearch 후", kakaoPlaceSearch);
}

watch(() => {
    const keyword = props.searchKeyword;
    console.log("현재 keyword : ", keyword);
    console.log("현재 검색 객체", kakaoPlaceSearch);
    // searchPlaces(keyword);
}, { immediate: true });

function searchPlaces(keyword) {
    console.log("kakaoPlaceSearch", kakaoPlaceSearch);
    kakaoPlaceSearch.keywordSearch(keyword, placeSearchCallBack);
}

const placeSearchCallBack = function (data, status) {
    if (status === kakao.maps.services.Status.OK) {
        console.log("검색 OK");
        displayPlaces(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        console.log("검색 결과가 존재하지 않습니다.");
        return; //
    } else if (status === kakao.maps.services.Status.ERROR) {
        console.log("검색 결과 중 오류가 발생했습니다.");
        return;
    }
}

function displayPlaces(places) {
    for (let i = 0; i < places.legnth; i++) {
        console.log(places[i]);
    }
}

</script>

<template>
    <!-- 카카오 맵 API를 사용해서 유사한 장소 검색 후 서버로 좌표값 보내도록 수행 -->
    <ul id="suggestions" class="list-group">
        <li class="list-group-item">뀨뀨</li>
        <li class="list-group-item">뀨뀨</li>
        <li class="list-group-item">뀨뀨</li>
        <li class="list-group-item">뀨뀨</li>
    </ul>
</template>

<style scoped>
#suggestions {
    list-style-type: none;
    padding: 0;
    margin: 0;
    /* border: 1px solid #ccc; */
    border-top: none;

}

#suggestions li {
    cursor: help;
    padding: 5px;
    /* border-bottom: px solid #ccc; */
    font-size: 14px;
}
</style>