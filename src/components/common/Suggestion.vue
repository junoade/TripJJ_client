<script setup>
import { ref, onMounted, watch, computed } from 'vue'

const props = defineProps({
    searchKeyword: String,
    max_search_length: Number,
    // hasUserClickedArea: Boolean,
})
const emit = defineEmits(["currentSelectedArea"]);
const suggestions = ref([]);
var kakaoPlaceSearch;

// let isClicked = false;

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


/**
 * 카카오맵 API의 검색 객체를 초기화하는 부분
 */
const initSearch = () => {
    console.log("initSearch 전", kakaoPlaceSearch);
    kakaoPlaceSearch = new kakao.maps.services.Places();
    console.log("initSearch 후", kakaoPlaceSearch);
}

/**
 * 부모 컴포넌트에서 양방향 모델링을 통해 입력하고 
 * 자식 컴포넌트로 passing prop한 searchKeyword를 바탕으로 
 * 추천 장소 목록을 검색할 수 있도록 관련 함수 호출
 */
watch(() => {
    const keyword = props.searchKeyword;
    console.log("현재 keyword : ", keyword);
    console.log("현재 검색 객체", kakaoPlaceSearch);

    if (kakaoPlaceSearch) {
        searchPlaces(keyword);
    }

    if (keyword === "") {
        initSuggestion();
    }

}, { immediate: true });

/**
 * 가장 적합한 추전 장소를 보여주기 위해
 * 최대 추천 개수에 맞춰 추천 장소 배열을 관리한다
 */
const mostSimilarPlace = computed(() => {
    const len = props.max_search_length;
    return suggestions.value.length > len ? suggestions.value.slice(0, len) : suggestions.value;
})


/**
 * 카카오맵 API를 활용해서 키워드 장소를 검색한다
 * 호출되면 현재 반응형 변수 suggestions 에 담게 됨
 * @param {*} keyword 
 */
function searchPlaces(keyword) {
    console.log("kakaoPlaceSearch", kakaoPlaceSearch);
    kakaoPlaceSearch.keywordSearch(keyword, placeSearchCallBack);
}

/**
 * 카카오 API에서 키워드 검색 이후 호출될 콜백 함수
 * @param {*} data 
 * @param {*} status 
 */
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

/**
 * kakao API 가 찾아온 데이터를 추천 장소 배열이 참조하여 반응형으로 동작하도록
 * @param {*} places 
 */
function displayPlaces(places) {
    suggestions.value = places;
    console.log("검색 결과", places);
    console.log("추천 장소 저장 완료 : ", suggestions);
}

/**
 * 현재 추천 장소를 초기화하고 부모 컴포넌트로 emit
 * @param {*} area 
 */
function sendAreaToParent(area) {
    console.log("자식 컴포넌트에서 선택한 주소", area.address_name);
    initSuggestion();
    emit('currentSelectedArea', area);
}

/**
 * 추천 장소 배열 초기화
 */
function initSuggestion() {
    suggestions.value = [];
}

</script>

<template>
    <!-- 카카오 맵 API를 사용해서 유사한 장소 검색 후 서버로 좌표값 보내도록 수행 -->
    <ul id="suggestions" class="list-group">
        <li class="list-group-item" v-for="area of mostSimilarPlace" @click="sendAreaToParent(area)">
            {{ area.address_name }} <span class="place_name">{{ area.place_name }}</span>
        </li>
    </ul>
</template>

<style scoped>
#suggestions {
    list-style-type: none;
    padding-left: 6px;
    margin: 0;
    border: 1px solid #ccc;
    border-top: none;
    text-align: left;

}

#suggestions li {
    cursor: pointer;
    padding: 3px;
    /* border-bottom: px solid #ccc; */
    font-size: 14px;
    border: none;
}

#suggestions li:hover {
    cursor: pointer;
    padding: 3px;
    /* border-bottom: px solid #ccc; */
    font-size: 14px;
    border: none;
    background-color: beige;
    background-clip: border-box;
}

.place_name {
    font-weight: 600;
}
</style>