<script setup>

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
            <li><a class="dropdown-item" href="#">나만의 핫플레이스 보기</a></li>
            <li><a class="dropdown-item" href="#">나만의 핫플레이스 추가</a></li>
            <router-link to="logout" class="dropdown-item">로그아웃</router-link>
        </ul>
    </li>
</template>

<style scoped>

a {
    font-size: large;
}
</style>