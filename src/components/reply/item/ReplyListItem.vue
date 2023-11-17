<script setup>
import { useRouter } from "vue-router";
import { deleteReply } from "@/api/qna";

// const reply = defineProps({ reply: Object });
defineProps({ reply: Object });

const router = useRouter();

// 이건 아직 잘 모르겠다.
function deleteEvent(replyNo) {
  console.log("답글 삭제");
  if (confirm("정말로 답글을 삭제하시겠습니까?")===true) {
    deleteReply(replyNo, () => {
      alert("삭제 성공");
    }, (error) => {
      alert("삭제 실패");
    });
  }

  // alert("정말로 답글을 삭제하시겠습니까?");
  // deleteReply(reply.value.replyNo, () => {
  //   alert("삭제 성공");
  // }, (error) => {
  //   alert("삭제 실패");
  // });
}

</script>

<template>
  <div class="card-body p-4">
    <div class="d-flex flex-start">
      <!-- user_profile img -->
      <img class="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp"
        alt="avatar" width="60" height="60" />
      <div>
        <h6 class="fw-bold mb-1">{{ reply.userId }}</h6>
        <div class="d-flex align-items-center mb-3">
          <p class="mb-0">
            {{reply.publishedDate}}
          </p>
          <router-link
            :to="{name: 'article-reply-modify', params: {articleNo : reply.articleNo, replyNo : reply.replyNo}}"
            class="link-muted"
            type="modify"
          >
            <i class="bi bi-pencil-square p-2"></i>
          </router-link>

          <router-link :to="{name:'article-reply-delete', params: {replyNo : reply.replyNo}}">
            <i class="bi bi-trash3"></i>
          </router-link>
        </div>
        <p class="mb-0">
          {{ reply.comment }}
        </p>
      </div>
    </div>
  </div>
  <hr>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
