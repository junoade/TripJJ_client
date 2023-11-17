<script setup>
import MemberForm from "@/components/member/MemberForm.vue";
import JoinUsImg from "@/assets/img/joinUs.png";
</script>

<template>
    <!-- <section class="h-100">
        <div class="container h-100">
            <div class="row justify-content-sm-center h-100">
                <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                    <div class="text-center my-5">
                        <img src="@/assets/trip.png" alt="logo" width="100">
                    </div>
                    <div class="card shadow-lg">
                        <MemberForm/>
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
    </section> -->
    <section class="vh-100" style="background-color: #eee;">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black" style="border-radius: 25px;">
                        <div class="card-body p-md-5">
                            <div class="row justify-content-center">
                                <MemberForm/>
                                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                    <img :src="JoinUsImg"
                                        class="img-fluid" alt="Sample image">
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