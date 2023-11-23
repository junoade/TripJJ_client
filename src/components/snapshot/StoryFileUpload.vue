<script setup>
import { ref, watch } from 'vue';
import { useMemberStore } from "@/stores/member";
import { uploadStory } from '@/api/snapshot.js'
import { httpStatusCode } from "@/util/http-status";
import { useRouter } from "vue-router";

const router = useRouter();
import StoryFileItem from './StoryFileItem.vue';
import Suggestion from "@/components/common/Suggestion.vue";

const memberStore = useMemberStore();
const userInfo = memberStore.userInfo;
const props = defineProps({
    images: Array,
    fileList: Array,
});

console.log("부모 컴포넌트로부터 전달받은 이미지 파일 목록: ", props.images);
console.log("현재 로그인한 유저", userInfo);

/**
 * 스냅샷 게시판의 작성하는 스토리 게시글과 관련된 DTO
 */
const snapshotDto = ref({
    userId: userInfo.userId,
    location: "",
    startDate: "",
    endDate: "",
    tag: "",
    content: ""
});

/**
 * 사용자가 방문한 지역과 관련된 DTO
 */
const areaDto = ref({});

// const hasUserClickedArea = ref(false);

const max_textarea = ref(250);
const max_search_length = ref(4);
const param_name_snapshotDto = "snapshot";
const param_name_areaDto = "area";
const param_name_fileDto = "multipartFile"; 

/**
 * textArea를 감시하면서 유효성 검증 로직 수행
 */
watch(() => {
    const textArea = snapshotDto.value.content;

    if (textArea.length >= max_textarea.value) {
        alert(`${max_textarea.value}자로 제한됩니다!`);
        snapshotDto.value.content = textArea.slice(0, max_textarea.value);
    }
});

/**
 * 종료 날짜 관련 유효성 검증 수행
 */
const checkEndDate = () => {
    if (!isStartDateBeforeEndDate(snapshotDto.value.startDate, snapshotDto.value.endDate)) {
        alert("여행 종료 날짜는 시작 날짜보다 빠를 수 없습니다!");
        snapshotDto.value.endDate = snapshotDto.value.startDate;
        return;
    }

    const today = new Date();
    console.log(today);
    if (!isStartDateBeforeEndDate(snapshotDto.value.endDate, today)) {
        alert("이미 다녀온 여행 종료 날짜를 입력해주세요!");
        snapshotDto.value.endDate = dateToStr(today);
        return;
    }
}

/**
 * 시작 날짜 관련 유효성 검증 수행
 */
const checkStartDate = () => {
    const today = new Date();
    console.log(today);
    if (!isStartDateBeforeEndDate(snapshotDto.value.startDate, today)) {
        alert("여행 시작 날짜를 확인해주세요!");
        snapshotDto.value.startDate = dateToStr(today);
    }
}

/**
 * Date 객체를 'YYYY-MM-DD' 형식으로 문자열 반환
 * @param {*} date 
 */
function dateToStr(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
}

/**
 * 날짜 비교와 관련된 유효성 검증을 위한 공통 함수
 * YYYY-MM-DD로만 비교하도록
 * @param {*} startDate 
 * @param {*} endDate 
 */
function isStartDateBeforeEndDate(startDate, endDate) {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    startDateObj.setHours(0, 0, 0, 0);
    endDateObj.setHours(0, 0, 0, 0);
    return startDateObj <= endDateObj
}

/**
 * 검색 컴포넌트(자식 컴포넌트)로부터 전달(emit)받은 지역을 바탕으로 
 * areaDto에 객체 저장
 * @param {*} area 
 */
const currentSelectedArea = (area) => {

    if(area === undefined || area === null) {
        return;
    }

    areaDto.value = area;
    snapshotDto.value.location = formatOnSearchKeyword(area);
    // hasUserClickedArea.value = true;
    console.log("부모 컴포넌트 선택된 주소 확인", area.address_name);
}

function formatOnSearchKeyword(area) {
    return area.address_name + " " + area.place_name;
}

/**
 * 서버로 전송 담당
 */
const upload = async () => {
    console.log("서버로 전송하기 위해 formData를 생성합니다.");
    const formData = new FormData();
    // formData.append('snapshot', JSON.stringify(dto.value));
    formData.append(param_name_snapshotDto,
        new Blob([JSON.stringify(snapshotDto.value)], { type: 'application/json' }));

    formData.append(param_name_areaDto,
        new Blob([JSON.stringify(areaDto.value)], {type:'application/json'}));

    for (let item of props.fileList) {
        console.log(item.file);
        formData.append(param_name_fileDto, item.file);
    }

    await uploadStory(formData,
        (response) => {

            if (response.status === httpStatusCode.OK) {
                console.log("요청 응답 성공", response.status);
                alert("성공적으로 등록되었습니다.");
            } else if (response.status === httpStatusCode.NOTFOUND) {
                console.log("없는 장소는 등록할 수 없습니다 :(");
            }

        }, (error) => {
            console.log("요청 응답 실패", error);
            alert("서버 에러로 인하여 등록이 실패했습니다 :(");
    });

    // 새로고침 수행
    router.replace({ name: "snapshot" });
}


</script>

<template>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">여행 기록 공유</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p class="catchPhrase">"여행의 감동을 {{ max_textarea }}자로<br> 당신만의 여행이야기를 캡처하세요!"</p>
                <div class="container mt-4">
                    <div class="row">
                        <!-- Left side (Image) -->
                        <div class="col-md-6">
                            <!-- carousel -->
                            <div id='carouselExampleIndicators' class='carousel slide' data-ride='carousel'>
                                <div class="carousel-indicators">
                                    <button type="button" v-for="(image, index) in images" :key="index"
                                        data-bs-target="#carouselExampleIndicators" :data-bs-slide-to="index"
                                        :class="{ 'active': index === 0 }">
                                    </button>
                                </div>
                                <div class='carousel-inner'>
                                    <template v-for="(image, index) in images" :key="index">
                                        <StoryFileItem :active="index === 0" :src="image.url" />
                                    </template>
                                </div>
                                <button class="carousel-control-prev" type="button"
                                    data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button"
                                    data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>

                        <!-- Right side (Form) -->
                        <div class="col-md-6">
                            <form>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="userId" placeholder="" v-model="snapshotDto.userId"
                                        readonly>
                                    <label for="userId">아이디</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="location" v-model="snapshotDto.location">
                                    <label for="location">어디를 다녀오셨나요?</label>
                                    <!-- 카카오 맵 API를 사용해서 유사한 장소 검색 후 서버로 좌표값 보내도록 수행 -->
                                    <Suggestion 
                                        :searchKeyword="snapshotDto.location" 
                                        :max_search_length="max_search_length"
                                        :hasUserClickedArea="hasUserClickedArea"
                                        @currentSelectedArea="currentSelectedArea" />

                                </div>
                                <div class="form-floating mb-3">
                                    <input type="date" class="form-control" id="startDate" v-model="snapshotDto.startDate"
                                        @input="checkStartDate">
                                    <label for="startDate">시작날짜</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="date" class="form-control" id="endDate" v-model="snapshotDto.endDate"
                                        @input="checkEndDate">
                                    <label for="startDate">종료날짜</label>
                                </div>

                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="tag" v-model="snapshotDto.tag">
                                    <label for="tag">태그</label>
                                </div>

                                <div class="form-floating mb-3">
                                    <textarea class="form-control" id="content" :maxlength="max_textarea" required
                                        v-model="snapshotDto.content"></textarea>
                                    <label for="content">추억 기록하기 {{ snapshotDto.content.length }} / {{ max_textarea }}</label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                    @click="$emit('clearStatus')">닫기</button>
                <button type="button" class="btn btn-primary" @click="$emit('checkUploadImages')">이전으로</button>
                <button type="button" class="btn btn-primary" @click="upload">글쓰기</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&family=Noto+Serif+KR:wght@500;600&display=swap'); */
@import url('https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=Noto+Sans+KR&family=Noto+Serif+KR:wght@500;600&display=swap');



.catchPhrase {
    font-family: 'Gowun Batang', serif;
    font-size: 20px;
    font-weight: 700;
}

.modal-body {
    width: 100%;
    padding: 10px;
    box-shadow: 0 0 5px #ffdfdf;
    border-radius: 5px;
    overflow: hidden;
}

.form-floating label {
    font-size: 14px;
    /* 원하는 폰트 크기로 조정 */
}

#content {
    resize: none;
    width: 100%;
    height: 150px;
    /* 원하는 세로 크기로 조정 */
    font-size: 14px;
}

/* 자동완성 파란색 배경 없애기*/
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 1000px white inset;
    box-shadow: 0 0 0 1000px white inset;
    -webkit-text-fill-color: black;
}

.carousel-indicators button {
    background-color: black;
}

.carousel-control-prev-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23009be1' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E");
    width: 30px;
    height: 48px;
}

.carousel-control-next-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23009be1' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E");
    width: 30px;
    height: 48px;
}
</style>