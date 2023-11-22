<script setup>

import AltImg from "@/assets/city/busan.jpg";

const props = defineProps({
    active: Boolean,
    imgSize: String,
    src: String,
})
</script>

<template>
    <div class='carousel-item' :class="props.active ? 'active' : ''">
        <img class="img-size"
            :src=props.src
            @error="AltImg"/>
    </div>
</template>

<style scoped>
.img-size {
    /* 	padding: 0;
	margin: 0; */
    height: 450px;
    width: 700px;
    background-size: cover;
    overflow: hidden;
}
</style>