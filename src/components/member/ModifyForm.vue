<script setup>
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { updateMember } from "@/api/member.js";
import { httpStatusCode } from "@/util/http-status";

const memberStore = useMemberStore();
const userInfo = memberStore.userInfo;
const router = useRouter();

userInfo.userPass = "";

const onSubmit = async () => {

    console.log("submit", userInfo);
    await updateMember(userInfo.userId, userInfo,
        ((response) => {
            console.log("요청 응답 성공", response.status);

            if (response.status === httpStatusCode.CREATE) {
                alert("회원정보변경 성공!");
                router.replace({ name: "main" });
            } else {
                alert("회원정보변경 실패");
            }

        }), (error) => {
            console.error(error);
        });
}


</script>

<template>
    <section class="vh-100" style="background-color: #eee;">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black" style="border-radius: 25px;">
                        <div class="card-body p-md-5">
                            <div class="row justify-content-center">
                                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">회원정보 수정</p>
                                    <!-- form으로 전송하면 post, get 만...! -->
                                    <form class="mx-1 mx-md-4">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" id="floatingInputUserId"
                                                v-model="userInfo.userId" readonly>
                                            <label for="floatingInputUserId">아이디</label>
                                        </div>

                                        <div class="form-floating mb-3">
                                            <input type="email" class="form-control" id="floatingInputEmail"
                                                v-model="userInfo.userEmail">
                                            <label for="floatingInputEmail">이메일</label>
                                        </div>

                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" id="floatingInputName"
                                                v-model="userInfo.userName">
                                            <label for="floatingInputName">이름</label>
                                        </div>

                                        <div class="form-floating mb-3">
                                            <input type="password" class="form-control" id="floatingPasswordOrigin"
                                                v-model="userInfo.userPass" placeholder="Password">
                                            <label for="floatingPasswordOrigin">현재 비밀번호</label>
                                        </div>


                                        <div class="form-floating mb-3">
                                            <input type="password" class="form-control" id="floatingPasswordNew"
                                                v-model="userInfo.newPass" placeholder="Password">
                                            <label for="floatingPasswordNew">새 비밀번호</label>
                                        </div>

                                        <div class="form-floating mb-3">
                                            <input type="password" class="form-control" id="floatingPasswordNewVerify"
                                                v-model="userInfo.newPassVerifiy" placeholder="Password">
                                            <label for="floatingPasswordNewVerify">새 비밀번호 확인</label>
                                        </div>

                                        <div class="d-grid gap-2 col-6 mx-auto w-100 mt-2">
                                            <button type="button" class="btn btn-primary p-2"
                                                @click.preventDefault="onSubmit">
                                                회원정보수정
                                            </button>
                                            <button type="button" class="btn btn-danger p-2">
                                                회원 탈퇴
                                            </button>
                                        </div>

                                    </form>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>