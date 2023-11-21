<script setup>
import { ref, watch } from 'vue';
import { useMemberStore } from "@/stores/member";
// import { uploadStory } from '@/api/snapshot.js'

import StoryFileItem from './StoryFileItem.vue';

const memberStore = useMemberStore();
const userInfo = memberStore.userInfo;
const props = defineProps({
    images: Array,
});

console.log("부모 컴포넌트로부터 전달받은 이미지 파일 목록: ", props.images);
console.log("현재 로그인한 유저", userInfo);

const dto = ref({
    userId: userInfo.userId,
    location: "",
    startDate: "",
    endDate: "",
    tag: "",
    content: ""
});

const max_textarea = ref(250);

watch(() => {
    const textArea = dto.value.content;

    if (textArea.length >= max_textarea.value) {
        alert(`${max_textarea.value}자로 제한됩니다!`);
        dto.value.content = textArea.slice(0, max_textarea.value);
    }
});

const checkEndDate = () => {
    if(!isStartDateBeforeEndDate(dto.value.startDate, dto.value.endDate)) {
        alert("여행 종료 날짜를 확인해주세요!");
        dto.value.endDate = dto.value.startDate;
    }
}

function isStartDateBeforeEndDate(startDate, endDate) {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    return startDateObj < endDateObj
}

const upload = async () => {
    console.log("서버로 전송한다~", dto.value);
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
                <p class="catchPhrase">"여행의 감동을 {{max_textarea}}자로<br> 당신만의 여행이야기를 캡처하세요!"</p>
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
                                    <input type="text" class="form-control" id="userId" placeholder="" v-model="dto.userId" readonly>
                                    <label for="userId">아이디</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="location" v-model="dto.location">
                                    <label for="location">어디를 다녀오셨나요?</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="date" class="form-control" id="startDate" v-model="dto.startDate">
                                    <label for="startDate">시작날짜</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="date" class="form-control" id="endDate" v-model="dto.endDate" @input="checkEndDate">
                                    <label for="startDate">종료날짜</label>
                                </div>

                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="tag" v-model="dto.tag">
                                    <label for="tag">태그</label>
                                </div>

                                <div class="form-floating mb-3">
                                    <textarea class="form-control" id="content" :maxlength="max_textarea" required
                                        v-model="dto.content"></textarea>
                                    <label for="content">추억 기록하기 {{ dto.content.length }} / {{ max_textarea }}</label>
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