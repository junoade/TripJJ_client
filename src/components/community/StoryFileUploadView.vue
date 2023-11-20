<script setup>

import { ref } from 'vue';

const images = ref([]);
const isDragging = ref(false);


/**
 * 파일 업로드를 위해 업로드한 사진의 개수를 반영한다
 * @param {*} event 
 */
function onFileSelect(event) {
    console.log("뀨")
    const files = event.target.files;
    if (files.length === 0) return;
    let index = 0;
    for (let i = 0; i < files.length; i++) {
        if (files[i].type.split("/")[0] != "image") continue;

        if (!images.value.some((e) => e.name === files[i].name)) {
            images.value.push({ name: files[i].name, url: URL.createObjectURL(files[i]), index: index++ });
        }
    }

    console.log(images.value);
}

/**
 * 특정 인덱스 위치의 이미지를 제거한다
 * @param {*} index 
 */
function deleteImage(index) {
    images.value.splice(index, 1);
}

function onDragOver(event) {
    event.preventDefault();
    isDragging.value = true;
    event.dataTransfer.dropEffect = "copy";

}

function onDragLeave(event) {
    event.preventDefault();
    isDragging.value = false;
}

function onDrop(event) {
    event.preventDefault();
    isDragging.value = false;
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
        if (files[i].type.split("/")[0] != "image") continue;

        if (!images.value.some((e) => e.name === files[i].name)) {
            images.value.push({ name: files[i].name, url: URL.createObjectURL(files[i]) });
        }
    }
}

</script>

<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">여행 기록 공유</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="drag-area" @dragover.prevent="onDragOver" @dragleaver.prevent="onDragLeave"
                    @drop.prevent="onDrop">
                    <span v-if="!isDragging">사진과 동영상을 여기에 끌어다 놓으세요</span>
                    <div v-else class="select">여기에 끌어다 놓으세요</div>
                    <label for="file">
                        <div class="btn-upload">컴퓨터에서 선택</div>
                    </label>
                    <input type="file" id="file" class="file" multiple accept="image/jpeg, image/png"
                        @change="onFileSelect">

                </div>
                <div class="container">
                    <div class="image" v-for="(image, index) in images" :key="index">
                        <span class="delete" @click="deleteImage(index)">&times;</span>
                        <img :src="image.url" />
                    </div>
                    <!-- <button type="button"  class="btn btn-primary">Upload</button> -->
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                    @click="$emit('clearStatus')">닫기</button>
                <button type="button" class="btn btn-primary" @click="$emit('afterUploadImages', images)">다음으로</button>
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
}</style>