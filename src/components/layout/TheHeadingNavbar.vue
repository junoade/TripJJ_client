<script setup>
// 헤더 네비게이션 이동 시 페이징 정보 초기화하도록 수정
import NavbarMyPage from "./NavbarMypage.vue"
import { useRouter } from "vue-router";
import { usePageInfo } from "@/stores/pageInfo";
import { storeToRefs } from "pinia";
const pageInfo = usePageInfo();
const { currentPage, totalPage } = storeToRefs(pageInfo);

const router = useRouter();

// 페이지 이동 함수
const moveQnA = () => {
  // currentPage.value = 1;
  router.push({name: "board"})
}

const moveAttraction = () => {
  // console.log(router)
  // currentPage.value = 1;
  router.push({name: "attraction"})
} 

</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top">
    <div class="container-fluid">
      <router-link :to="{ name: 'main' }" class="navbar-brand">
        <img src="@/assets/trip.png" class="rounded mx-auto d-block" alt="..." width="60"/>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
        aria-controls="navbarScroll"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-fex justify-content-center" id="navbarScroll">
        <ul
          class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll ml-auto"
          style="--bs-scroll-height: 100px"
        >
          <li class="nav-item">
            <a href="#" class="nav-link">커뮤니티</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click="moveQnA">Q&A 게시판</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click="moveAttraction">관광지 검색</a>
          </li>

          <navbar-my-page/>

          <li class="nav-item">
            <router-link :to="{name: 'login'}" class="nav-link">로그인</router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">회원가입</a>
          </li>
        </ul>
        <!-- <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="검색..."
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="button">search</button>
        </form> -->
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
