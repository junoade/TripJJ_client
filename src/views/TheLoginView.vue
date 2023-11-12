<script setup>
import { ref } from "vue";


import {doLogin} from "@/api/auth.js";

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

    doLogin(userInfo.value, () => {
        alert("로그인 성공");
    }, (error) => {
        alert("로그인 실패");
    })
}
</script>

<template>
    <section class="h-100">
        <div class="container h-100">
            <div class="row justify-content-sm-center h-100">
                <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                    <div class="text-center my-5">
                        <img src="@/assets/trip.png" alt="logo" width="100">
                    </div>
                    <div class="card shadow-lg">
                        <div class="card-body p-5">
                            <h1 class="fs-4 card-title fw-bold mb-4">로그인</h1>
                            <form class="needs-validation" @submit.prevent="onSubmit" novalidate="" autocomplete="off">
                                <div class="mb-3">
                                    <label class="mb-2 text-muted" for="id">아이디</label>
                                    <input id="id" type="text" class="form-control" v-model="userInfo.id" required
                                        autofocus>
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
                        <div class="card-footer py-3 border-0">
                            <div class="text-center">
                                아직 회원이 아니세요? <a href="register.html" class="text-dark">Create One</a>
                            </div>
                        </div>
                    </div>
                    <div class="text-center mt-5 text-muted">
                        Copyright &copy; 2023 &mdash; Double JJ
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>