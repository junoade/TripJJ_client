<script setup>
import { onMounted } from "vue";
import { useMemberStore } from "@/stores/member";
const memberStore = useMemberStore();

onMounted(() => {
    memberStore.userLogout(memberStore.userInfo.userId);
});

</script>

<template>
    <div>
        
    </div>
</template>

<style scoped>

</style>