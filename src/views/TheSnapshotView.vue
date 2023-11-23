<script setup>

import { ref, onMounted } from 'vue';
import { findStories, getImage } from "@/api/snapshot.js";
// import { useImagePlace } from "@/stores/images.js";

import StoryUploadModal from '@/components/snapshot/StoryUploadModal.vue';
import SnapshotItem from "@/components/snapshot/SnapshotItem.vue";

const snapshots = ref([]);
// const imageStore = useImagePlace();
// const imageMap = imageStore.imageMap;

onMounted(async () => {
    await findStories((response) => {
        console.log(response.data);
        snapshots.value = response.data;
    }, (error) => {
        console.log(error);
    })

    // 성능, 로딩 측면에서 이미지 렌더링이 원할하지 않아 주석처리함
    // for(const snap of snapshots.value) {
    //     console.log("내 이미지 내놔!", snap.id);
    //     await requestImage(snap.id);
    // }

    // console.log("갖고왔다!", imageMap);
});

// 성능, 로딩 측면에서 이미지 렌더링이 원할하지 않아 이용하지 않는다
async function requestImage(id){
    await getImage(id, 
    (response)=>{
        console.log(response);
        const image = `data:${response.headers['content-type']};base64,${arrayBufferToBase64(response.data)}`;
        imageMap.set(id, image);
    }, (error) => {
        console.error("안돼잉 ㅠ");
    }
    )
}

function arrayBufferToBase64( buffer ) {
	var binary = '';
	var bytes = new Uint8Array( buffer );
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode( bytes[ i ] );
	}
	return window.btoa( binary );
}


</script>

<template>
    <section class="py-5 text-center container">
        <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto">
                <h1 class="fw-light">한국 여행 기록을 공유해보세요!</h1>
                <p class="lead text-muted">여행은 새로운 문화와 경험을 만날 수 있는 창입니다! <br>한국의 아름다운 곳곳을 여행하며 인상 깊었던<br> 당신의 여행 기록을 나누어
                    주세요.</p>
                <p>
                    <a href="#" class="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#exampleModal">기록 공유하기</a>
                <!-- <a href="#" class="btn btn-secondary m-2">Secondary action</a> -->
                </p>
                <StoryUploadModal/>
            </div>
        </div>
    </section>


    <div class="masonry px-5">
        <template v-for="snapshot of snapshots">
            <SnapshotItem
                :snapshot="snapshot"
                :snapshotImages="snapshotImages"
            />
        </template>
        <!-- <div class="grid">
            <img src="https://source.unsplash.com/random/1">
            <div class="grid__body">
                <div class="relative">
                    <a class="grid__link" target="_blank" href="/"></a>
                    <h1 class="grid__title">Title 1</h1>
                    <p class="grid__author">Mario Rossi</p>
                </div>
                <div class="mt-auto">
                    <span class="grid__tag">#tag1</span>
                </div>
            </div>
        </div>
        <div class="grid">
            <img src="https://source.unsplash.com/random/2">
            <div class="grid__body">
                <div class="relative">
                    <a class="grid__link" target="_blank" href="/"></a>
                    <h1 class="grid__title">Title 1</h1>
                    <p class="grid__author">Mario Rossi</p>
                </div>
                <div class="mt-auto">
                    <span class="grid__tag">#tag1</span>
                </div>
            </div>
        </div>
        <div class="grid">
            <img src="https://source.unsplash.com/random/3">
            <div class="grid__body">
                <div class="relative">
                    <a class="grid__link" target="_blank" href="/"></a>
                    <h1 class="grid__title">Title 1</h1>
                    <p class="grid__author">Mario Rossi</p>
                </div>
                <div class="mt-auto">
                    <span class="grid__tag">#tag1</span>
                </div>
            </div>
        </div>
        <div class="grid">
            <img src="https://source.unsplash.com/random/4">
            <div class="grid__body">
                <div class="relative">
                    <a class="grid__link" target="_blank" href="/"></a>
                    <h1 class="grid__title">Title 1</h1>
                    <p class="grid__author">Mario Rossi</p>
                </div>
                <div class="mt-auto">
                    <span class="grid__tag">#tag1</span>
                </div>
            </div>
        </div>
        <div class="grid">
            <img src="https://source.unsplash.com/random/5">
            <div class="grid__body">
                <div class="relative">
                    <a class="grid__link" target="_blank" href="/"></a>
                    <h1 class="grid__title">Title 1</h1>
                    <p class="grid__author">Mario Rossi</p>
                </div>
                <div class="mt-auto">
                    <span class="grid__tag">#tag1</span>
                </div>
            </div>
        </div>
        <div class="grid">
            <img src="https://source.unsplash.com/random/6">
            <div class="grid__body">
                <div class="relative">
                    <a class="grid__link" target="_blank" href="/"></a>
                    <h1 class="grid__title">Title 1</h1>
                    <p class="grid__author">Mario Rossi</p>
                </div>
                <div class="mt-auto">
                    <span class="grid__tag">#tag1</span>
                </div>
            </div>
        </div>
        <div class="grid">
            <img src="https://source.unsplash.com/random/7">
            <div class="grid__body">
                <div class="relative">
                    <a class="grid__link" target="_blank" href="/"></a>
                    <h1 class="grid__title">Title 1</h1>
                    <p class="grid__author">Mario Rossi</p>
                </div>
                <div class="mt-auto">
                    <span class="grid__tag">#tag1</span>
                </div>
            </div>
        </div>
        <div class="grid">
            <img src="https://source.unsplash.com/random/8">
            <div class="grid__body">
                <div class="relative">
                    <a class="grid__link" target="_blank" href="/"></a>
                    <h1 class="grid__title">Title 1</h1>
                    <p class="grid__author">Mario Rossi</p>
                </div>
                <div class="mt-auto">
                    <span class="grid__tag">#tag1</span>
                </div>
            </div>
        </div>
        <div class="grid">
            <img src="https://source.unsplash.com/random/9">
            <div class="grid__body">
                <div class="relative">
                    <a class="grid__link" target="_blank" href="/"></a>
                    <h1 class="grid__title">Title 1</h1>
                    <p class="grid__author">Mario Rossi</p>
                </div>
                <div class="mt-auto">
                    <span class="grid__tag">#tag1</span>
                </div>
            </div>
        </div>
        <div class="grid">
            <img src="https://source.unsplash.com/random/10">
            <div class="grid__body">
                <div class="relative">
                    <a class="grid__link" target="_blank" href="/"></a>
                    <h1 class="grid__title">Title 1</h1>
                    <p class="grid__author">Mario Rossi</p>
                </div>
                <div class="mt-auto">
                    <span class="grid__tag">#tag1</span>
                </div>
            </div>
        </div>
        <div class="grid">
            <img src="https://source.unsplash.com/random/11">
            <div class="grid__body">
                <div class="relative">
                    <a class="grid__link" target="_blank" href="/"></a>
                    <h1 class="grid__title">Title 1</h1>
                    <p class="grid__author">Mario Rossi</p>
                </div>
                <div class="mt-auto">
                    <span class="grid__tag">#tag1</span>
                </div>
            </div>
        </div>
        <div class="grid">
            <img src="https://source.unsplash.com/random/12">
            <div class="grid__body">
                <div class="relative">
                    <a class="grid__link" target="_blank" href="/"></a>
                    <h1 class="grid__title">Title 1</h1>
                    <p class="grid__author">Mario Rossi</p>
                </div>
                <div class="mt-auto">
                    <span class="grid__tag">#tag1</span>
                </div>
            </div>
        </div>
        <div class="grid">
            <img src="https://source.unsplash.com/random/19">
            <div class="grid__body">
                <div class="relative">
                    <a class="grid__link" target="_blank" href="/"></a>
                    <h1 class="grid__title">Title 1</h1>
                    <p class="grid__author">Mario Rossi</p>
                </div>
                <div class="mt-auto">
                    <span class="grid__tag">#tag1</span>
                </div>
            </div>
        </div>
        <div class="grid">
            <img src="https://source.unsplash.com/random/20">
            <div class="grid__body">
                <div class="relative">
                    <a class="grid__link" target="_blank" href="/"></a>
                    <h1 class="grid__title">Title 1</h1>
                    <p class="grid__author">Mario Rossi</p>
                </div>
                <div class="mt-auto">
                    <span class="grid__tag">#tag1</span>
                </div>
            </div>
        </div>
        <div class="grid">
            <img src="https://source.unsplash.com/random/13">
            <div class="grid__body">
                <div class="relative">
                    <a class="grid__link" target="_blank" href="/"></a>
                    <h1 class="grid__title">Title 1</h1>
                    <p class="grid__author">Mario Rossi</p>
                </div>
                <div class="mt-auto">
                    <span class="grid__tag">#tag1</span>
                </div>
            </div>
        </div>
        <div class="grid">
            <img src="https://source.unsplash.com/random/14">
            <div class="grid__body">
                <div class="relative">
                    <a class="grid__link" target="_blank" href="/"></a>
                    <h1 class="grid__title">Title 1</h1>
                    <p class="grid__author">Mario Rossi</p>
                </div>
                <div class="mt-auto">
                    <span class="grid__tag">#tag1</span>
                </div>
            </div>
        </div>
        <div class="grid">
            <img src="https://source.unsplash.com/random/15">
            <div class="grid__body">
                <div class="relative">
                    <a class="grid__link" target="_blank" href="/"></a>
                    <h1 class="grid__title">Title 1</h1>
                    <p class="grid__author">Mario Rossi</p>
                </div>
                <div class="mt-auto">
                    <span class="grid__tag">#tag1</span>
                </div>
            </div>
        </div>
        <div class="grid">
            <img src="https://source.unsplash.com/random/16">
            <div class="grid__body">
                <div class="relative">
                    <a class="grid__link" target="_blank" href="/"></a>
                    <h1 class="grid__title">Title 1</h1>
                    <p class="grid__author">Mario Rossi</p>
                </div>
                <div class="mt-auto">
                    <span class="grid__tag">#tag1</span>
                </div>
            </div>
        </div>
        <div class="grid">
            <img src="https://source.unsplash.com/random/17">
            <div class="grid__body">
                <div class="relative">
                    <a class="grid__link" target="_blank" href="/"></a>
                    <h1 class="grid__title">Title 1</h1>
                    <p class="grid__author">Mario Rossi</p>
                </div>
                <div class="mt-auto">
                    <span class="grid__tag">#tag1</span>
                </div>
            </div>
        </div>
        <div class="grid">
            <img src="https://source.unsplash.com/random/18">
            <div class="grid__body">
                <div class="relative">
                    <a class="grid__link" target="_blank" href="/"></a>
                    <h1 class="grid__title">Title 1</h1>
                    <p class="grid__author">Mario Rossi</p>
                </div>
                <div class="mt-auto">
                    <span class="grid__tag">#tag1</span>
                </div>
            </div>
        </div> -->
    </div>
</template>

<style lang="scss">
.masonry {
    columns: 3;
    column-gap: 16px;

    @media (max-width: 1200px) {
        columns: 3;
    }

    @media (max-width: 992px) {
        columns: 2;
    }

    
}
</style>