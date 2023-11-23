<script setup>
import { ref } from "vue";
import { useMemberStore } from "@/stores/member";
const memberStore = useMemberStore();

</script>

<template>
    <li class="nav-item dropdown">
        <a
            class="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            마이페이지
        </a>
        <ul class="dropdown-menu">
            <router-link :to="{name: 'member-modify'}"  class="dropdown-item">회원정보수정</router-link>
            <!-- <li><a class="dropdown-item" href="#">나의 스냅샷</a></li> -->
            <router-link :to="{name: 'mypage'}" class="dropdown-item">나의 스냅샷</router-link>
            <!-- <li><a class="dropdown-item" href="#">나만의 핫플레이스 추가</a></li> -->
            <router-link :to="{name: 'logout'}" class="dropdown-item">로그아웃</router-link>
        </ul>
    </li>
</template>

<style scoped>

a {
    font-size: large;
}
</style>