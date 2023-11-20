<script setup>

const props = defineProps({
    images: Array,
});

console.log("부모 컴포넌트로부터 전달받은 이미지 파일 목록: ", props.images);

</script>

<template>
    <div class="modal-body">
        업로드 이미지, 메시지, 태그, 업로드!
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('clearStatus')">닫기</button>
        <button type="button" class="btn btn-primary" @click="$emit('submitUploadImages', false)">이전으로</button>
        <button type="button" class="btn btn-primary" @click="$emit('submitUploadImages', true)">글쓰기</button>
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

/* .modal-body button {
    outline: 0;
    border: 0;
    color: #fff;
    border-radius: 4px;
    font-weight: 400;
    padding: 8px 13px;
    width: 100%;
    background: #fe0000;
} */

.modal-body .drag-area {
    height: 300px;
    border-radius: 5px;
    border: 2px dashed #fe0000;
    background: #f4f3f9;
    justify-content: center;
    align-items: center;
    user-select: center;
    -webkit-user-select: none;
    margin-top: 10px;
    font-size: larger;
}

.modal-body .drag-area span {
    line-height: 12em;
}

.modal-body .drag-area .visibile {
    font-size: 18px;
}

.modal-body .select {
    color: #5256ad;
    margin-left: 5px;
    cursor: pointer;
    transition: 0.4s;
}

.modal-body .select:hover {
    opacity: 0.6;
}

.modal-body .container {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    max-height: 200px;
    position: relative;
    margin-bottom: 8px;
    padding-top: 20px;
}

.modal-body .container .image {
    width: 75px;
    margin-right: 5px;
    height: 75px;
    position: relative;
    margin-bottom: 8px;
}

.modal-body .container .image img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
}

.modal-body .container .image span {
    position: absolute;
    top: -2px;
    right: 9px;
    font-size: 20px;
    cursor: pointer;
}

.card input,
.card .drag-area .on-drop,
.card .drag-area.draover .visibile {
    display: none;
}

.delete {
    z-index: 999;
}

.btn-upload {
    width: 150px;
    height: 30px;
    background: rgb(100, 149, 237);
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: cornsilk;
}

.btn-upload:hover {
    background: rgb(59, 113, 211);
    color: #fff;
}

#file {
    display: none;
}
</style>