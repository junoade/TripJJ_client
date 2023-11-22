<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { deleteReply } from "@/api/qna";
import { useMemberStore } from "@/stores/member";

const route = useRoute();
const router = useRouter();
const memberStore = useMemberStore();
const { replyNo } = route.params;
console.log(replyNo);

onMounted(() => {
    removeReply();
})

const removeReply = () => {
    console.log(replyNo + "번 댓글 삭제하자");
    deleteReply(replyNo, () =>{
        alert("삭제 성공");
        router.go(-1); // 이전 페이지로 돌아감
        // router.push("attraction")
    }, (error) => {
        alert("삭제 실패");
        router.go(-1);
    })
} 

</script>

<template>

</template>

<style scoped></style>
