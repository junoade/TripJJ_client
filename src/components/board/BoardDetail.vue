<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { deleteQna, detailQna } from '@/api/qna'
import TheRepliesView from '@/components/board/ReplieList.vue';

const route = useRoute();
const router = useRouter();

// const articleno = ref(route.params.articleno);
const { articleno } = route.params;

const article = ref({});
const replies = ref([]);

onMounted(() => {
  getArticle();
});

const getArticle = () => {
  // const { articleno } = route.params;
  console.log(articleno + "번글 얻으러 가자!!!");
  // API 호출
  detailQna(articleno, ({ data }) => {
    article.value = data.article;
    replies.value = data.replies;
    console.log(data);
  }, (error) => {
    console.log(error);
  })

};

function moveList() {
  router.push({ name: "article-list" });
}

function moveModify() {
  router.push({ name: "article-modify", params: { articleno } });
}

function moveReply() {
  router.push({ name: "article-reply", params: { articleno } });
}

function onDeleteArticle() {
  // const { articleno } = route.params;
  console.log(articleno + "번글 삭제하러 가자!!!");
  // API 호출
  deleteQna(articleno, () => {
    alert("게시글이 삭제되었습니다.");
    moveList();
  }, (error) => {
    console.log(error);
    alert("서버 오류로 인해 삭제되지 않았습니다.");
  });
}

const getRepliesLength = computed(() => {
  return replies.value.length;
})
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="sky">글보기</mark>
        </h2>
      </div>
      <div class="col-lg-10 text-start">
        <div class="row my-2">
          <h2 class="text-secondary px-5">{{ article.articleNo }}. {{ article.title }}</h2>
        </div>
        <div class="row">
          <div class="col-md-8">
            <div class="clearfix align-content-center">
              <img class="avatar me-2 float-md-start bg-light p-2"
                src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg" />
              <p>
                <span class="fw-bold">{{ article.userId }}</span> <br />
                <span class="text-secondary fw-light">조회수 : {{ article.hit }}</span>
              </p>
            </div>
          </div>
          <div class="col-md-4 align-self-center text-end">댓글수 : {{ getRepliesLength }}</div>
          <div class="divider mb-3"></div>
          <div class="text-secondary">
            {{ article.content }}
          </div>
          <div class="divider mt-3 mb-3"></div>
          <div class="d-flex justify-content-end">
            <button class="btn btn-outline-primary mb-3" @click="moveReply">댓글 작성</button>
            <button type="button" class="btn btn-outline-primary mb-3" @click="moveList">
              글목록
            </button>
            <button type="button" class="btn btn-outline-success mb-3 ms-1" @click="moveModify">
              글수정
            </button>
            <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="onDeleteArticle">
              글삭제
            </button>
          </div>

          <!-- 답글 -->
          <TheRepliesView
            :replies="replies"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
