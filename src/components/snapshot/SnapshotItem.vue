<script setup>
import { ref, onMounted , onUpdated } from "vue";
// import { useImagePlace } from "@/stores/images.js";

const props = defineProps({
    snapshot: Object,
})

const imgUrl = ref("");

// 성능, 로딩 측면에서 이미지 렌더링이 원할하지 않아 주석처리함
// const imageStore = useImagePlace();
// const imageMap = imageStore.imageMap;

onMounted(() => {
    // console.log(snapshotId);
    // console.log(snapshotImage);
    imgUrl.value = `https://source.unsplash.com/random/${props.snapshot.id}`;
    //const id = props.snapshot.id;
    //imgUrl.value = imageMap.get(id);
});

</script>

<template>
    <div class="grid">
        <img :src="imgUrl">
        <div class="grid__body">
            <div class="relative">
                <a class="grid__link" target="_blank" href="/"></a>
                <h1 class="grid__title">{{ props.snapshot.attractionInfo.title }}</h1>
                <p class="grid__addr">{{ props.snapshot.attractionInfo.addr1 }}</p>
            </div>
            <div class="mt-auto">   
                <span class="grid__content">{{  props.snapshot.content }}</span><br>
                <div class="pb-2">
                    <i class="bi bi-person-circle pe-lg-2"></i>
                    <span class="grid__author">{{ props.snapshot.userId }}</span><br>
                </div>
                <span class="grid__tag">{{ props.snapshot.tag }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
//@media (max-width: 768px) {columns: 1;}
.grid {
    display: inline-block;
    margin-bottom: 16px;
    position: relative;

    &:before {
        border-radius: 5px;
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .2);
    }

    img {
        width: 100%;
        border-radius: 5px;
    }

    &__title {
        font-size: 48px;
        font-weight: bold;
        margin: 0px 0px 10px 0px;
    }

    &__addr {
        font-size: 24px;
        font-weight: 300;
    }

    &__link {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    &__body {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        padding: 30px 30px;
        color: #fff;
        display: flex;
        flex-direction: column
    }

    &__tag {
        background-color: rgba(255, 255, 255, .8);
        color: #333;
        border-radius: 5px;
        padding: 5px 15px;
        margin-bottom: 5px;
    }

    &__content {
        font-size: 30px;
        font-weight: bold;
        margin: 0px 0px 10px 0px;
    }

    &__author {
        font-size: 20px;
        font-weight: bold;
        margin: 0px 0px 10px 0px;
    }
}

// .wrapper {
//     // display: flex;
//     justify-content: space-between;
// }

.mt-auto {
    margin-top: auto;
}
</style>