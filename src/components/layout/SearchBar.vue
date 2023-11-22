<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { searchByArea } from "@/api/search.js";

import Suggestion from '../common/Suggestion.vue';

const router = useRouter();
const searchKeyword = ref("");
const max_search_length = ref(6);
const selectedArea = ref({});

/**
 * 검색 컴포넌트(자식 컴포넌트)에서 클릭이벤트의 발생 이후
 * 전달(emit)받은 지역을 바탕으로 
 * areaDto에 객체 저장
 * @param {*} area 
 */
const currentSelectedArea = async (area) => {
    if (area === undefined || area === null) {
        return;
    }

    selectedArea.value = area;
    // hasUserClickedArea.value = true;
    console.log("부모 컴포넌트 선택된 주소 확인", area.address_name);

    // get요청 후 페이징 이동
    await searchByArea(selectedArea.value,
        ((response) => {
            console.log("요청 응답 성공", response);
            // 라우터 이동
            // response에서 관광지 정보 pk인 content_id로 검색
            console.log(response.data.contentId);
            const contentId = response.data.contentId;
            router.replace({ name: "location", params: { contentId } });

         }),
        (error) => {
            console.error(error);
         });    
}


</script>

<template>
    <div class="d-flex justify-content-center p-2">
        <h2>지금 검색해볼까요?</h2><br />
    </div>
    <div class="d-flex justify-content-center p-2">
        <div class="search-box">
            <button class="btn-search"><i class="bi bi-search" id="searchIcon"></i></button>
            <input type="text" class="input-search" placeholder="검색해주세요 :D" v-model="searchKeyword">
            <Suggestion :search-keyword="searchKeyword" :max_search_length="max_search_length"
                @currentSelectedArea="currentSelectedArea" />

        </div>
    </div>
</template>

<style scoped>
/* 버튼 관련 */
.search-box {
    width: fit-content;
    height: fit-content;
    position: relative;
}

.input-search {
    height: 50px;
    width: 50px;
    border-style: none;
    padding: 10px;
    font-size: 18px;
    letter-spacing: 2px;
    outline: none;
    border-radius: 25px;
    transition: all .5s ease-in-out;
    background-color: #000000;
    padding-right: 40px;
    color: #000000;
}

.input-search::placeholder {
    color: rgba(0, 0, 0, 0.5);
    font-size: 18px;
    letter-spacing: 2px;
    font-weight: 100;
}

.btn-search {
    width: 50px;
    height: 50px;
    border-style: none;
    font-size: 20px;
    font-weight: bold;
    outline: none;
    cursor: pointer;
    border-radius: 50%;
    position: absolute;
    right: 0px;
    color: black;
    background-color: transparent;
    pointer-events: painted;
}

.btn-search i {
    color: aliceblue;
    -webkit-animation: blink 0.5s ease-in-out infinite alternate;
    -moz-animation: blink 0.5s ease-in-out infinite alternate;
    animation: blink 0.5s ease-in-out infinite alternate;
}

@-webkit-keyframes blink {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@-moz-keyframes blink {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes blink {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.btn-search:hover~.input-search {
    width: 300px;
    border-radius: 0px;
    background-color: transparent;
    border-bottom: 1px solid rgba(7, 0, 0, 0.5);
    transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
}

.input-search:hover,
.input-search:focus {
    width: 300px;
    border-radius: 0px;
    background-color: transparent;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
}

.input-search:hover~.btn-search i,
.input-search:focus~.btn-search i {
    color: #000000;
}
</style>