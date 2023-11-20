import { ref } from 'vue'
import { useRouter } from "vue-router";
import { defineStore } from 'pinia'
import { getModifyQna, detailQna, getModifyReply } from "@/api/qna";
import { useMemberStore } from "@/stores/member";

// URL 이동 시 이동하려는 페이지의 정보를 저장한다.
// Q&A 게시글 정보, 댓글 정보
export const useTargetStore = defineStore('targetStore', () => {

    const targetArticle = ref({});
    const targetReply = ref({});
    const targetReplies = ref([]);
    const memberStore = useMemberStore();

    const setTargetArticle = (articleNo) => {
        getModifyQna(articleNo, ({ data }) => {
            console.log("getModifyQna", data, memberStore.userInfo.userId);
            if (!data) {
                alert("해당 게시글이 존재하지 않습니다.");
                targetArticle.value = null;
            } else if (data.userId != memberStore.userInfo.userId) {
                alert("해당 게시글을 수정할 권한이 없습니다.");
                targetArticle.value = null;
            } else {
                targetArticle.value = data;
            } 
        }, (error) => {
            alert("해당 게시글이 존재하지 않습니다. error");
            console.log(error);
            targetArticle.value = null;
        })
    }

    return {
        targetArticle, targetReply, targetReplies,
        setTargetArticle,
    };
})