<script setup>
import { RouterLink } from "vue-router";
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";

import { useMemberStore } from "@/stores/member";
import { usePageInfo } from "@/stores/pageInfo.js";

// dropdown
import NavbarMyPage from "./NavbarMypage.vue"

const memberStore = useMemberStore();
const { memberMenu } = storeToRefs(memberStore);

// 페이지 이동 함수
// function moveQnA(event) {
//   event.preventDefault();
//   router.push({name: "board"})
// }
// function moveAttraction = () => {
//   // console.log(router)
//   // currentPage.value = 1;
//   router.push({name: "attraction"})
// } 


</script>
<template>
    <nav class="navbar sticky-top navbar-light navbar-expand-lg">
        <div class="container">    
            <!-- main page -->
            <RouterLink class="navbar-brand" :to="{ name: 'main' }" rel="tooltip" data-placement="bottom">
                <img src="@/assets/trip.png" class="rounded mx-auto d-block" alt="..." width="60" />
            </RouterLink>

            <!-- 반응형 웹 UI / 토글 햄버거 버튼 -->
            <button class="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse"
                data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon mt-2">
                    <span class="navbar-toggler-bar bar1"></span>
                    <span class="navbar-toggler-bar bar2"></span>
                    <span class="navbar-toggler-bar bar3"></span>
                </span>
            </button>

            <div class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0" id="navigation">
                <ul class="navbar-nav navbar-nav-hover ms-auto">

                    <!-- 커뮤니티 탭 -->
                    <li class="nav-item">
                        <a href="#" class="nav-link">커뮤니티</a>
                    </li>

                    <li class="nav-item">
                        <router-link :to="{ name: 'board' }" class="nav-link">Q&A 게시판</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link :to="{ name: 'attraction' }" class="nav-link">관광지 검색</router-link>
                    </li>
                    <template v-if="memberMenu['login'].show">
                        <li class="nav-item" v-if="memberMenu['login'].show">
                            <!-- <router-link :to="{ name: 'login' }" class="nav-link">로그인</router-link> -->
                            <router-link :to="memberMenu['login']" class="nav-link">로그인</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="memberMenu['joinUs']" class="nav-link">회원가입</router-link>
                        </li>
                    </template>
                    <template v-else>
                        <navbar-my-page/>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
    <!-- End Navbar -->
</template>

<style scoped>
.navbar {
    background-color: azure;
}
</style>