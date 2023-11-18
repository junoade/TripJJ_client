<script setup>
import JoinUsImg from "@/assets/img/joinUs.png";
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

                                    <form class="mx-1 mx-md-4">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" id="floatingInput" placeholder="" readonly>
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
                                            <input type="password" class="form-control" id="floatingPassword"
                                                placeholder="Password">
                                            <label for="floatingPassword">비밀번호</label>
                                        </div>

                                        <div class="form-floating mb-3">
                                            <input type="password" class="form-control" id="floatingPassword"
                                                placeholder="Password">
                                            <label for="floatingPassword">비밀번호 확인</label>
                                        </div>

                                        <div class="d-grid gap-2 col-6 mx-auto w-100 mt-2">
                                            <button type="submit" class="btn btn-primary p-2">
                                                회원정보 변경
                                            </button>

                                            <button type="submit" class="btn btn-danger p-2">
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