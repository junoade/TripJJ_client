<script setup>
import VKakaoMap2 from "@/components/layout/VKakaoMap2.vue";
import { listInterests } from "@/api/attraction";
import { findStoryByUserId } from "@/api/snapshot.js";
import { useMemberStore } from "@/stores/member";
import { ref, onMounted } from "vue";

import AttractionInterestListItemVue from "@/components/Attraction/item/AttractionInterestListItem.vue";
import MyPageSnapshotItem from "@/components/mypage/MyPageSnapshotItem.vue";

const userInfo = ref(useMemberStore().userInfo);
const attractions = ref([]);
const selectedAttraction = ref({});
const userSnapshots = ref([]);

// DB내 로그인 유저의 모든 관심 관광지 정보 반환
const getInterests = () => {
    listInterests(
        {userId: userInfo.value.userId},
        ({ data }) => {
            attractions.value = data.attractions;
            console.log(userInfo.value, "모든 관심 관광지 정보 출력 : ", attractions.value);
        },
        (error) => {
            console.log(error);
        }
    )
}

// 관심 관광지 클릭 시 selectedAttraction 설정
const viewAttraction = (attraction) => {
    selectedAttraction.value = attraction;
}

getInterests();

/**
 * onMounted() 시, 사용자가 올렸던 snapshot 목록을 등록 날짜를 기준으로 역순으로 가져온다
 */
const getUserSnapshots = async () => {
    console.log('called');
    await findStoryByUserId(userId,
        (response) => {
            console.log(response.data);
            userSnapshots.value = response.data;
        }
        , (error) => {
            console.log("error", error);
        });
}

onMounted(() => {
    getUserSnapshots(userId);
})


</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-xl-5">
                <div class="card">
                    <div class="card-body">
                        <div class="dropdown float-end">
                            <a href="#" class="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <i class="mdi mdi-dots-vertical"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                                <!-- item-->
                                <a href="javascript:void(0);" class="dropdown-item">Edit</a>
                                <!-- item-->
                                <a href="javascript:void(0);" class="dropdown-item">Delete</a>
                                <!-- item-->
                                <a href="javascript:void(0);" class="dropdown-item">Block</a>
                            </div>
                        </div>
                        <div class="d-flex align-items-start">
                            <img src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                class="rounded-circle avatar-lg img-thumbnail" alt="profile-image">
                            <div class="w-100 ms-3">
                                <h4 class="my-0">{{ userInfo.userId }}</h4>
                                <p class="text-muted">{{userInfo.joinDate.substr(0, 10)}}</p>
                                <button type="button"
                                    class="btn btn-soft-primary btn-xs waves-effect mb-2 waves-light">Follow</button>
                                <button type="button"
                                    class="btn btn-soft-success btn-xs waves-effect mb-2 waves-light">Message</button>
                            </div>
                        </div>

                        <div class="mt-3">
                            <h4 class="font-13 text-uppercase">About Me :</h4>
                            <p class="text-muted font-13 mb-3">
                                한국의 아름다운 풍경과 문화를 탐험하는 것을 즐기며, 새로운 장소에서의 경험을 통해 인생을 더 풍요롭게 만들어 나가는 것을 목표로 하고 있습니다.
                            </p>
                            <p class="text-muted mb-2 font-13">
                                <strong>Full Name :</strong> 
                                <span class="ms-2">{{ userInfo.userName }}</span>
                            </p>

                            <p class="text-muted mb-2 font-13">
                                <strong>Mobile :</strong>
                                <span class="ms-2">010-4255-8702</span>
                            </p>
                            <p class="text-muted mb-2 font-13">
                                <strong>Email :</strong> 
                                <span class="ms-2">{{userInfo.userEmail}}</span>
                            </p>

                            <p class="text-muted mb-1 font-13"><strong>Location :</strong> <span class="ms-2">KOREA</span></p>
                        </div>

                        <ul class="social-list list-inline mt-3 mb-0">
                            <li class="list-inline-item">
                                <a href="javascript: void(0);"
                                    class="social-list-item text-center border-primary text-primary"><i
                                        class="mdi mdi-facebook"></i></a>
                            </li>
                            <li class="list-inline-item">
                                <a href="javascript: void(0);"
                                    class="social-list-item text-center border-danger text-danger"><i
                                        class="mdi mdi-google"></i></a>
                            </li>
                            <li class="list-inline-item">
                                <a href="javascript: void(0);" class="social-list-item text-center border-info text-info"><i
                                        class="mdi mdi-twitter"></i></a>
                            </li>
                            <li class="list-inline-item">
                                <a href="javascript: void(0);"
                                    class="social-list-item text-center border-secondary text-secondary"><i
                                        class="mdi mdi-github"></i></a>
                            </li>
                        </ul>
                    </div>
                </div> <!-- end card -->

                <div class="card">
                    <div class="card-body text-center">
                        <div class="row">
                            <div class="col-4 border-end border-light">
                                <h5 class="text-muted mt-1 mb-2 fw-normal">방문 지역</h5>
                                <h2 class="mb-0 fw-bold">116</h2>
                            </div>
                            <div class="col-4 border-end border-light">
                                <h5 class="text-muted mt-1 mb-2 fw-normal">게시글 수</h5>
                                <h2 class="mb-0 fw-bold">87</h2>
                            </div>
                            <div class="col-4">
                                <h5 class="text-muted mt-1 mb-2 fw-normal">관심 여행지</h5>
                                <h2 class="mb-0 fw-bold">{{ attractions.length }}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- TODO 카카오맵 API 연동하기 -->
                <div class="card">
                    <div class="card-body">
                        <div class="dropdown float-end">
                            <a href="#" class="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <i class="mdi mdi-dots-vertical"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                                <!-- item-->
                                <a href="javascript:void(0);" class="dropdown-item">Sales Report</a>
                                <!-- item-->
                                <a href="javascript:void(0);" class="dropdown-item">Export Report</a>
                                <!-- item-->
                                <a href="javascript:void(0);" class="dropdown-item">Profit</a>
                                <!-- item-->
                                <a href="javascript:void(0);" class="dropdown-item">Action</a>
                            </div>
                        </div>
                        <h4 class="header-title mb-3">나의 관심 여행지</h4>

                        <div class="inbox-widget" data-simplebar="init" style="max-height: 350px;">
                            <div style="height: 300px;">
                                <VKakaoMap2 :attractions="attractions" :selectedAttraction="selectedAttraction">
                                </VKakaoMap2>
                            </div>
                        </div> <!-- end inbox-widget -->
                    </div>
                </div> <!-- end card-->


                <!-- TODO 내 장소-->
                <div class="card">
                    <div class="card-body">
                        <div class="dropdown float-end">
                            <a href="#" class="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <i class="mdi mdi-dots-vertical"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                                <!-- item-->
                                <a href="javascript:void(0);" class="dropdown-item">Sales Report</a>
                                <!-- item-->
                                <a href="javascript:void(0);" class="dropdown-item">Export Report</a>
                                <!-- item-->
                                <a href="javascript:void(0);" class="dropdown-item">Profit</a>
                                <!-- item-->
                                <a href="javascript:void(0);" class="dropdown-item">Action</a>
                            </div>
                        </div>
                        <h4 class="header-title mb-3">나의 관심 여행지</h4>
                        <div class="inbox-widget" style="max-height: 350px;">
                            <div class="simplebar-wrapper" style="margin: 0px;">
                                <div class="simplebar-content-wrapper" style="height: auto;">
                                    <AttractionInterestListItemVue v-for="attraction in attractions" :key="attraction.title"
                                        :attraction="attraction" @view-attraction="viewAttraction">
                                    </AttractionInterestListItemVue>
                                </div>
                            </div>
                        </div> <!-- end inbox-widget -->
                    </div>
                </div> <!-- end card-->


            </div> <!-- end col-->

            <div class="col-xl-7">
                <div class="card">
                    <div class="card-body">
                        <h4 class="header-title mb-3">나의 여행 기록, 스냅샷</h4>
                        <!-- Story Box-->
                        <template v-for="snapshot of userSnapshots">
                            <div class="p-2 mb-3">
                                <MyPageSnapshotItem
                                    :snapshot="snapshot"    
                                />
                            </div>
                        </template>
                        <div class="text-center">
                            <a href="javascript:void(0);" class="text-danger"><i class="mdi mdi-spin mdi-loading me-1"></i>
                                Load more </a>
                        </div>
                    </div>
                </div> <!-- end card-->

            </div> <!-- end col -->
        </div>
        <!-- end row-->

    </div>
</template>

<style scoped>
body {
    background-color: #ecf2f5;
    margin-top: 20px;
}

.container {
    margin-top: 2%;
}

.card {
    box-shadow: 0 0 2px 0 rgb(0 0 0 / 10%);
    margin-bottom: 24px;
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid #ecf2f5;
    border-radius: .25rem;
}

.avatar-lg {
    height: 4.5rem;
    width: 4.5rem;
}

.rounded-circle {
    border-radius: 50% !important;
}

.img-thumbnail {
    padding: .25rem;
    background-color: #ecf2f5;
    border: 1px solid #dee2e6;
    border-radius: .25rem;
    max-width: 100%;
    height: auto;
}

.avatar-sm {
    height: 2.25rem;
    width: 2.25rem;
}

.rounded-circle {
    border-radius: 50% !important;
}

.me-2 {
    margin-right: .75rem !important;
}

.avatar-md {
    height: 3.5rem;
    width: 3.5rem;
}

.rounded-circle {
    border-radius: 50% !important;
}

.bg-transparent {
    --bs-bg-opacity: 1;
    background-color: transparent !important;
}

.post-user-comment-box {
    background-color: #f2f8fb;
    margin: 0 -.75rem;
    padding: 1rem;
    margin-top: 20px;
}

.simplebar-wrapper {
    overflow: auto;
    width: inherit;
    height: inherit;
    max-width: inherit;
    max-height: inherit;
}

.simplebar-height-auto-observer-wrapper {
    box-sizing: inherit !important;
    height: 100%;
    width: 100%;
    max-width: 1px;
    position: relative;
    float: left;
    max-height: 1px;
    overflow: hidden;
    z-index: -1;
    padding: 0;
    margin: 0;
    pointer-events: none;
    flex-grow: inherit;
    flex-shrink: 0;
    flex-basis: 0;
}

.font-13 {
    font-size: 13px !important;
}

.btn-soft-info {
    color: #45bbe0;
    background-color: rgba(69, 187, 224, .18);
    border-color: rgba(69, 187, 224, .12);
}

.social-list-item {
    height: 2rem;
    width: 2rem;
    line-height: calc(2rem - 2px);
    display: block;
    border: 2px solid #adb5bd;
    border-radius: 50%;
    color: #adb5bd;
}

.comment-area-box .comment-area-btn {
    background-color: #f2f8fb;
    padding: 10px;
    border: 1px solid #dee2e6;
    border-top: none;
    border-radius: 0 0 .2rem .2rem;
}</style>