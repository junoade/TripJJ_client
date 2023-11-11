<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { deleteReply } from "@/api/qna";


const route = useRoute();
const router = useRouter();

const { replyno } = route.params;
console.log(replyno);

onMounted(() => {
    removeReply();
})

const removeReply = () => {
    console.log(replyno + "번 댓글 삭제하자");
    deleteReply(replyno, () =>{
        alert("삭제 성공");
        router.go(-1); // 이전 페이지로 돌아감
    }, (error) => {
        alert("삭제 실패");
        router.go(-1);
    })
} 

</script>

<template>

</template>

<style scoped></style>
