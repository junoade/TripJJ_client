<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { deleteQna, detailQna } from '@/api/qna';
import TheRepliesView from "@/components/reply/ReplieList.vue";
import { useMemberStore } from "@/stores/member";

const route = useRoute();
const router = useRouter();
const memberInfo = useMemberStore();
// const articleno = ref(route.params.articleno);
const { articleNo } = route.params;

const article = ref({});
const replies = ref([]);

onMounted(() => {
  getArticle();
});

const getArticle = () => {
  // const { articleno } = route.params;
  console.log(articleNo + "번글 얻으러 가자!!!");

  // API 호출
  detailQna(articleNo, ({ data }) => {
    if (!data) {
      alert("해당 게시글은 존재하지 않습니다!");
      router.push({name: "article-list"})
    }
    article.value = data.article;
    replies.value = data.article.replies;
    console.log(data);
  }, (error) => {
    alert("게시글 조회 실패!");
    router.push({name: "article-list"})
  })

};

function moveList() {
  router.push({ name: "article-list" });
}

function moveModify() {
  router.push({ name: "article-modify", params: { articleNo } });
}

function moveReply() {
  router.push({ name: "article-reply", params: { articleNo } });
}

async function onDeleteArticle() {
  // const { articleno } = route.params;
  console.log(articleNo + "번글 삭제하러 가자!!!");
  // API 호출
  await deleteQna(articleNo, () => {
    alert("게시글이 삭제되었습니다.");
    moveList();
  }, (error) => {
    console.log(error);
    alert("서버 오류로 인해 삭제되지 않았습니다.");
  });
}

const getRepliesLength = computed(() => {
  return replies.value.length;
  // return article.replies.length;
})

</script>

<template>
  <div class="d-flex">
    <button type="button" class="btn mb-3 me-auto" @click="moveList" style="background-color: rgb(230, 230, 230);">
      글목록
    </button>
    <button class="btn mb-3 ms-1" @click="moveReply" style="background-color: rgb(230, 230, 230);">
      댓글등록
    </button>
    <button class="btn mb-3 ms-1" @click="moveModify" style="background-color: rgb(230, 230, 230);" 
            v-if="article && article.userId === memberInfo.userInfo.userId">
      글수정
    </button>
    <button class="btn mb-3 ms-1" @click="onDeleteArticle" style="background-color: rgb(230, 230, 230);"
            v-if="article.userId === memberInfo.userInfo.userId">
      글삭제
    </button>
  </div>

  <div class="card container-fluid">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <!-- <mark class="sky">글보기</mark> -->
          {{ article.title }}
        </h2>
      </div>
      <div class="col-lg-10 text-start">
        <!-- <div class="row my-2">
          <h2 class="text-secondary px-5">{{ article.articleNo }}. {{ article.title }}</h2>
        </div> -->
        <div class="row">
          <div class="col-md-8">
            <div class="clearfix align-content-center">
              <img class="avatar me-2 float-md-start bg-light p-2"
                src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg" />
              <p>
                <span class="fw-bold">{{ article.userId }}</span> <br/>
                <span class="text-secondary fw-light">{{  article.publishedDate }} | 조회 {{ article.hit }}</span>
              </p>
            </div>
          </div>
          <div class="col-md-4 align-self-center text-end"><i class="bi bi-chat-dots"></i> {{ getRepliesLength }}</div>
        </div>
        <hr>
        
        <!-- 내용 -->
        <div>
            {{ article.content }}
        </div>
        <hr>

        <!-- 답글 -->
        <TheRepliesView :replies="replies"/>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
