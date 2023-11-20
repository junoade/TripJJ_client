<script setup>

const props = defineProps({
    images: Array,
});

console.log("부모 컴포넌트로부터 전달받은 이미지 파일 목록: ", props.images);

</script>

<template>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">여행 기록 공유</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                업로드 이미지, 메시지, 태그, 업로드!
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                    @click="$emit('clearStatus')">닫기</button>
                <button type="button" class="btn btn-primary" @click="$emit('submitUploadImages', false)">이전으로</button>
                <button type="button" class="btn btn-primary" @click="$emit('submitUploadImages', true)">글쓰기</button>
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
}

</style>