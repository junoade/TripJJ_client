<script setup>
import { ref } from "vue";
import { useMemberStore } from "@/stores/member";
const memberStore = useMemberStore();


</script>

<template>
    <li class="nav-item">
        <router-link :to="{name: 'mypage'}" class="nav-link">마이페이지</router-link>
    </li>
    <li class="nav-item dropdown">
        <a
            class="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        ><i class="bi bi-gear"></i>
        </a>
        <ul class="dropdown-menu">
            <router-link :to="{name: 'member-modify'}"  class="dropdown-item">회원정보수정</router-link>
            <router-link :to="{name: 'logout'}" class="dropdown-item">로그아웃</router-link>
        </ul>
    </li>
</template>

<style scoped>

a {
    font-size: large;
}
</style>