<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { registQna, modifyQna, getModifyQna } from "@/api/qna";
import { useMemberStore } from "@/stores/member";

const router = useRouter();
const route = useRoute();
const props = defineProps({ type: String });
const isUseId = ref(false);
const memberStore = useMemberStore();

const article = ref({
  articleNo: 0,
  title: "",
  content: "",
  userId: "",
  // userName: "",
  hit: 0,
  registerTime: "",
});

if (props.type === "modify") {
  let { articleNo } = route.params;
  console.log(articleNo + "번글 얻어와서 수정할거야");
  // API 호출
  getModifyQna(articleNo, ({ data }) => {
    if (!data) {
      alert("해당 게시글은 존재하지 않습니다!");
      router.push({name: "article-list"})
    } else if (data.userId != memberStore.userInfo.userId) {
      alert("해당 게시글을 수정할 권한이 없습니다!");
      router.push({name: "article-list"})
    } else {
      console.log("글 정보: ", data); 
      article.value = data; 
    }
  }, (error) => {
    alert("조회 실패");
    router.push({name: "article-list"})
  });
  isUseId.value = true;
}

const titleErrMsg = ref("");
const contentErrMsg = ref("");
watch(
  () => article.value.title,
  (value) => {
    let len = value.length;
    if (len == 0 || len > 30) {
      titleErrMsg.value = "제목을 확인해 주세요!!!";
    } else titleErrMsg.value = "";
  },
  { immediate: true } // 유효성 검사
);
watch(
  () => article.value.content,
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

  if (titleErrMsg.value) {
    alert(titleErrMsg.value);
  } else if (contentErrMsg.value) {
    alert(contentErrMsg.value);
  } else {
    props.type === "regist" ? writeArticle() : updateArticle();
  }
}

function writeArticle() {
  console.log("글등록하자!!", article.value);
  // API 호출

  registQna(article.value, (data) => {
    console.log(data.data);
    alert("게시글 등록 완료!");
    moveDetail(data.data); // redirect
  }, (error) => {
    console.log("게시글 등록 실패", error);
    alert("게시글 등록 실패! 다시 확인해주세요.");
  });

}

function updateArticle() {
  console.log(article.value.articleNo + "번글 수정하자!!", article.value);
   // API 호출
   modifyQna(article.value, ()=> {
    alert("게시글 수정 완료!");
    moveDetail(article.value.articleNo);
   }, (error) => {
    alert("게시글 수정 실패! 다시 확인해주세요.");
   });
}

function moveList() {
  router.push({ name: "article-list" });
}

function moveDetail(articleNo) {
  router.push({name: "article-view", params: { articleNo } })
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="userid" class="form-label">작성자 ID : </label>
      <input
        type="text" id="userid" class="form-control"
        v-model="article.userId"
        :disabled="isUseId"
        placeholder="작성자ID..."
      />
    </div>
    <div class="mb-3">
      <label for="title" class="form-label">제목 : </label>
      <input type="text" id="title" class="form-control" v-model="article.title" placeholder="제목..." />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용 : </label>
      <textarea id="content" class="form-control" v-model="article.content" rows="10"></textarea>
    </div>
    <div class="col-auto text-center">
      <button type="submit" class="btn btn-outline-primary mb-3" v-if="type === 'regist'">
        글작성
      </button>
      <button type="submit" class="btn btn-outline-success mb-3" v-else>글수정</button>
      <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="moveList">
        목록으로이동...
      </button>
    </div>
  </form>
</template>

<style scoped></style>
