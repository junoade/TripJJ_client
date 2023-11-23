<script setup>
import { ref, computed } from "vue";


const props = defineProps({
    searchMap:Map
});

const backgroundImage = computed(() => {
    // const imageUrl = searchMap.value.attraction_info.firstImage;
    const imageUrl = props.searchMap.attraction_info.firstImage;
    return {
        'background-image': `url(${imageUrl})`,
        'background-size': 'cover',
        'background-position': 'center',
        'z-index': -1,
    }
})


</script>

<template>
    <div class="p-4 p-md-5 ">
        <div class="rounded" :style="backgroundImage">
            <div class="img-cover">
                <div class="col-md-4 px-0">
                    <h1 class="display-4">{{ props.searchMap.attraction_info.title }}</h1>
                    <p class="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and
                        efficiently
                        about what’s most interesting in this post’s contents.</p>
                    <p class="lead mb-0"><a href="#" class="text-white fw-bold">{{ props.searchMap.attraction_info.addr1 }}</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.img-cover {
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;

    color: whitesmoke;
}

.p-4.p-md-5.mb-4.rounded {
    position: relative;
}
</style>