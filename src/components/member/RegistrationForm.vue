<script setup>
import { ref } from "vue";

import { doRegistration } from "@/api/member.js";
</script>

<template>
    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">회원 가입</p>

        <form class="mx-1 mx-md-4">
            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="">
                <label for="floatingInput">아이디</label>
            </div>

            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="">
                <label for="floatingInput">이메일</label>
            </div>

            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="">
                <label for="floatingInput">이름</label>
            </div>


            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">비밀번호</label>
            </div>

            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">비밀번호 확인</label>
            </div>
            

            <div class="form-check d-flex justify-content-center mb-5">
                <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                <label class="form-check-label" for="form2Example3">
                    <a href="#!">개인 정보 활용 방침</a>에 동의합니다.
                </label>
            </div>

            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <button type="button" class="btn btn-primary btn-lg">Register</button>
            </div>

        </form>

    </div>
</template>

<style scoped></style>