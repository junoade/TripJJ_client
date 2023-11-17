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
    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">로그인</p>

        <form class="mx-1 mx-md-4 needs-validation" @submit.prevent="onSubmit" novalidate="" autocomplete="off">
        <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInput" v-model="userInfo.id" required autofocus
                    placeholder="">
                <label for="floatingInput">아이디</label>
                <div class="invalid-feedback">
                    아이디를 입력해주세요!
                </div>
            </div>

            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingPassword" v-model="userInfo.password"
                    placeholder="Password">
                <label for="floatingPassword">비밀번호</label>
                <div class="invalid-feedback">
                    비밀번호를 입력해주세요!
                </div>
            </div>

            <div class="d-flex align-items-center">
                <div class="form-check">
                    <input type="checkbox" name="remember" id="remember" class="form-check-input">
                    <label for="remember" class="form-check-label">아이디 저장</label>
                </div>
                <a href="#" class="ms-auto">
                    비밀번호 찾기
                </a>
            </div>

            <div class="d-grid gap-2 col-6 mx-auto w-100 mt-2">
                <button type="submit" class="btn btn-primary p-2">
                    로그인
                </button>
            </div>
        </form>

    </div>
</template>

<style scoped></style>