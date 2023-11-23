<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
    snapshot: Object,
})
const imgUrl = ref("");


onMounted(() => {
    imgUrl.value = `https://source.unsplash.com/random/${props.snapshot.id}`;
});
</script>

<template>
    <div class="border border-light p-2 mb-3">
        <div class="card shadow-sm">
            <img :src="imgUrl">
            
            <div class="card-body">
                <div class="d-flex justify-content-end align-items-center">
                    <span>{{props.snapshot.attractionInfo.title}}<i class="bi bi-geo-alt-fill"></i></span>
                </div>
                <div class="d-flex justify-content-end">
                    <p>{{ props.snapshot.attractionInfo.addr1}}</p>
                </div>

                <p class="card-text">{{ props.snapshot.content }}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="pb-2">
                        <i class="bi bi-person-circle pe-lg-2"></i>
                        <span class="grid__author">{{ props.snapshot.userId }}</span>
                    </div>
                    <small class="text-body-secondary">9 mins</small>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="grid__tag">{{ props.snapshot.tag }}</span>
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary">수정하기</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">삭제하기</button>
                    </div>
                </div>

            </div>
            
        </div>
    </div>
</template>

<style scoped></style>