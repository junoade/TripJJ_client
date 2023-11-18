<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";

const router = useRouter();
const memberStore = useMemberStore();

const { isLogin } = storeToRefs(memberStore);
const { userLogin, getUserInfo } = memberStore;

const loginUser = ref({
    userId: "",
    userPass: ""
})

// 유효성 검증 관련

// 회원 로그인과 관련된 API 호출
async function onSubmit() {

    // if(isLogin) {
    //     // 토큰에 body에 있는 사용자 정보 관련
    //     // await getUserInfo(token);
    //     alert("이미 로그인된 사용자입니다.")
    //     return;
    // }

    // event.preventDefault();
    console.log("로그인 폼 전송");
    console.log("id", loginUser.value.userId);
    console.log("password", loginUser.value.userPass);
    
    await userLogin(loginUser.value);

    // 동기 - 토큰 받아올 때까지 기다려
    let token = sessionStorage.getItem("accessToken");
    console.log("current Access toekn : ", token);
    
    alert("로그인 성공");

    router.push("/");
}

</script>

<template>
    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">로그인</p>

        <form class="mx-1 mx-md-4 needs-validation" @submit.prevent="onSubmit" novalidate="" autocomplete="off">
        <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInput" v-model="loginUser.userId" required autofocus
                    placeholder="">
                <label for="floatingInput">아이디</label>
                <div class="invalid-feedback">
                    아이디를 입력해주세요!
                </div>
            </div>

            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingPassword" v-model="loginUser.userPass"
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