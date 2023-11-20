<script setup>

const props = defineProps({
    active: Boolean,
    src: String,
    alt: String,
})
</script>

<template>
    <div class='carousel-item' :class="props.active ? 'active' : ''">
        <img :class=props.class
            :src=props.src
            />
    </div>
</template>

<style scoped></style>