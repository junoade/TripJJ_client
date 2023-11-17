<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { registReply, getModifyReply, modifyReply } from "@/api/qna";

const router = useRouter();
const route = useRoute();

const props = defineProps({ type: String });

const isUseId = ref(false);

const { articleNo, replyNo } = route.params;
console.log(route.params);

const reply = ref({
  replyNo: 0,
  articleNo: parseInt(articleNo),
  comment: "",
  userId: "",
  publishedDate: "",
});

if (props.type === "modify") {
  console.log(replyNo + "번 댓글 얻어와서 수정할거야");
  // API 호출
  getModifyReply(replyNo, ({data}) => {
    console.log(data);
    reply.value = data;
  }, (error) => {
    alert("조회 실패");
  });


  isUseId.value = true;
}

const contentErrMsg = ref("");
watch(
  () => reply.value.comment,
  (value) => {
    let len = value.length;
    if (len == 0 || len > 500) {
      contentErrMsg.value = "내용을 확인해 주세요!!!";
    } else contentErrMsg.value = "";
  },
  { immediate: true } // 감시 즉시 !
);

function onSubmit() {
  // event.preventDefault();
  if (contentErrMsg.value) {
    alert(contentErrMsg.value);
  } else {
    props.type === "regist" ? writeReply() : updateReply();
  }
}

function writeReply() {
  console.log("글등록하자!!", reply.value);
  // API 호출

  registReply(reply.value, () => {
    console.log("댓글 등록 성공");
    alert("댓글 등록 완료!");
    moveDetail(reply.value.articleNo);
  }, (error) => {
    console.log("댓글 등록 실패", error);
    alert("댓글 등록 실패! 다시 확인해주세요.");
  });
}

function updateReply() {
  console.log(reply.value.replyNo + "번글 수정하자!!", reply.value);
   // API 호출
   modifyReply(reply.value, ()=> {
    alert("댓글 수정 완료!");
    moveDetail(reply.value.articleNo);;
   }, (error) => {
    alert("댓글 수정 실패! 다시 확인해주세요.");
   });
}

function moveDetail(articleno) {
  router.push({name: "article-view", params: { articleno } })
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="userid" class="form-label">작성자 ID : </label>
      <input
        type="text" id="userid"
        class="form-control"
        v-model="reply.userId"
        :disabled="isUseId"
        placeholder="작성자ID..."
      />
    </div>
    
    <div class="mb-3">
      <label for="comment" class="form-label">내용 : </label>
      <textarea id="comment" class="form-control" v-model="reply.comment" rows="10"></textarea>
    </div>
    <div class="col-auto text-center">
      <button type="submit" class="btn btn-outline-primary mb-3" v-if="type === 'regist'">
        댓글작성
      </button>
      <button type="submit" class="btn btn-outline-success mb-3" v-else>댓글수정</button>
      <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="moveList">
        목록으로이동...
      </button>
    </div>
  </form>
</template>

<style scoped></style>
