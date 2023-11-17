<script setup>
import { ref } from "vue";

import { doLogin } from "@/api/auth.js";

const userInfo = ref({
    id: "",
    password: ""
})

// 유효성 검증 관련

// 회원 로그인과 관련된 API 호출
function onSubmit() {
    // event.preventDefault();
    console.log("로그인 폼 전송");
    console.log("id", userInfo.value.id);
    console.log("password", userInfo.value.password);

    doLogin(userInfo.value, (data) => {
        console.log(data);
        alert("로그인 성공");
        // 
    }, (error) => {
        alert("로그인 실패");
    })
}

</script>

<template>
    <div class="card-body p-5">
        <h1 class="fs-4 card-title fw-bold mb-4">로그인</h1>
        <form class="needs-validation" @submit.prevent="onSubmit" novalidate="" autocomplete="off">
            <div class="mb-3">
                <label class="mb-2 text-muted" for="id">아이디</label>
                <input id="id" type="text" class="form-control" v-model="userInfo.id" required autofocus>
                <div class="invalid-feedback">
                    Email is invalid
                </div>
            </div>

            <div class="mb-3">
                <div class="mb-2 w-100">
                    <label class="text-muted" for="password">비밀번호</label>
                    <a href="forgot.html" class="float-end">
                        비밀번호 찾기
                    </a>
                </div>
                <input id="password" type="password" class="form-control" v-model="userInfo.password" name="password"
                    required>
                <div class="invalid-feedback">
                    Password is required
                </div>
            </div>

            <div class="d-flex align-items-center">
                <div class="form-check">
                    <input type="checkbox" name="remember" id="remember" class="form-check-input">
                    <label for="remember" class="form-check-label">아이디 저장</label>
                </div>
                <button type="submit" class="btn btn-primary ms-auto">
                    로그인
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped></style>