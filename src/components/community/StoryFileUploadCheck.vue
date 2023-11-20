<script setup>

import { ref, onMounted } from 'vue';

import StoryFileItem from "./StoryFileItem.vue";

const props = defineProps({
    images: Array,
});

console.log("부모 컴포넌트로부터 전달받은 이미지 파일 목록: ", props.images);
const sampleUrl = ref("https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1391&q=80");

</script>

<template>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">사진 확인</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- carousel -->
                <div id='carouselExampleIndicators' class='carousel slide' data-ride='carousel'>
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                            class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                            aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                            aria-label="Slide 3"></button>
                    </div>
                    <div class='carousel-inner'>
                        <StoryFileItem
                            :active=true
                            :src="sampleUrl"
                            :alt="Firstslide"
                        />
                        <StoryFileItem
                            :active=false
                            :src="sampleUrl"
                            :alt="Secondslide"
                        />
                        <StoryFileItem
                            :active=false
                            :src="sampleUrl"
                            :alt="Thirdslide"
                        />
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                    @click="$emit('clearStatus')">닫기</button>
                <button type="button" class="btn btn-primary" @click="$emit('afterCheckUploadImages', false)">이전으로</button>
                <button type="button" class="btn btn-primary" @click="$emit('afterCheckUploadImages', true)">다음으로</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-body {
    width: 100%;
    padding: 10px;
    box-shadow: 0 0 5px #ffdfdf;
    border-radius: 5px;
    overflow: hidden;
    padding: 0;
}

.img-size {
    /* 	padding: 0;
	margin: 0; */
    height: 450px;
    width: 700px;
    background-size: cover;
    overflow: hidden;
}

.modal-content {
    width: 700px;
    border: none;
}

.carousel-indicators button {
    background-color: black;
}

/* .carousel-control-prev-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23009be1' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E");
    width: 30px;
    height: 48px;
}

.carousel-control-next-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23009be1' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E");
    width: 30px;
    height: 48px;
} */
</style>