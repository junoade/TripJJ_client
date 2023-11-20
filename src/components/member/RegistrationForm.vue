<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { doRegistration } from "@/api/member.js";
import { httpStatusCode } from "@/util/http-status";

const userInfo = ref({});
const router = useRouter();


const onSubmit = async () => {
    console.log("뀨", userInfo.value);
    await doRegistration(userInfo.value,
        (response) => {
            console.log("요청 응답 성공", response.status);

            if (response.status === httpStatusCode.CREATE) {
                alert("회원 가입 성공!");
                router.replace({ name: "main"});
            } else {
                alert("회원 가입 실패.");
            }
        }, (error) => {
            if (error.response.status == httpStatusCode.CONFLICT) {
                alert("이미 등록된 회원입니다.");
            } else {
                alert("회원 가입 실패.");
            }
            
        });
}

</script>

<template>
    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">회원 가입</p>

        <form class="mx-1 mx-md-4" @submit.prevent="onSubmit">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInputUserId" placeholder="" v-model="userInfo.userId">
                <label for="floatingInputUserId">아이디</label>
            </div>

            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInputEmail" placeholder="" v-model="userInfo.userEmail">
                <label for="floatingInputEmail">이메일</label>
            </div>

            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInputName" placeholder="" v-model="userInfo.userName">
                <label for="floatingInputName">이름</label>
            </div>


            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                    v-model="userInfo.userPass">
                <label for="floatingPassword">비밀번호</label>
            </div>

            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingPasswordVerify" placeholder="Password">
                <label for="floatingPasswordVerify">비밀번호 확인</label>
            </div>


            <div class="form-check d-flex justify-content-center mb-2">
                <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                <label class="form-check-label" for="form2Example3">
                    <a href="#!">개인 정보 활용 방침</a>에 동의합니다.
                </label>
            </div>

            <div class="d-grid gap-2 col-6 mx-auto w-100 mt-2">
                <button type="submit" class="btn btn-primary p-2">
                    회원가입
                </button>
            </div>

        </form>

    </div>
</template>

<style scoped></style>