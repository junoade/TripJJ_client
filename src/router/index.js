import { createRouter, createWebHistory } from "vue-router";
import { useMemberStore } from "@/stores/member";
import TheMainView from "../views/TheMainView.vue";
import TheLoginView from "@/views/TheLoginView.vue";
import TheAttractionView from "@/views/TheAttractionView.vue";
import TheRegistrationView from "@/views/TheRegistrationView.vue";
import TheLogout from "@/components/member/Logout.vue";
import ModifyForm from "@/components/member/ModifyForm.vue";
import TheCommunityView from "@/views/TheCommunityView.vue";
import TheAttractionView2 from "@/views/TheAttractionView2.vue";

// import TheBoardView from "../views/TheBoardView.vue";
// import TheElectricChargingStationView from '../views/TheElectricChargingStation.vue';

// import { onlyAuthUser } from "@/util/auth.js";

const onlyAuthUser = async (to, from, next) => {
    const memberStore = useMemberStore();
    // let token = sessionStorage.getItem("accessToken");
    let token = localStorage.getItem("accessToken");

    console.log("로그인 처리 전", memberStore.userInfo, token);

    // 일단 현재 쿠키에 저장된 jwt 토큰이 있다면 유효성 검증을 위해 서버로 전송
    if (token) {
        console.log("토큰 유효성 체크하러 가자!!!!");
        // 유효한 토큰, 유효한 사용자라면
        // userInfo 값 갱신될 것
        // 아니라면 토큰 다시 받아올 것
        await memberStore.getUserInfo(token);
    }

    // 그래도 안되면
    if (!memberStore.isValidToken || memberStore.userInfo === null) {
        alert("로그인이 필요한 페이지입니다..");
        next({ name: "login" });
    } else {
        console.log("로그인 상태 유효");
        next();
    }
};

const loginRemainIfTokenValid = async (to, from, next) => {
    const memberStore = useMemberStore();
    let token = localStorage.getItem("accessToken");
    if (token) {
        console.log("토큰 유효성 체크하러 가자!!!!");
        // 유효한 토큰, 유효한 사용자라면
        // userInfo 값 갱신될 것
        // 아니라면 토큰 다시 받아올 것
        await memberStore.getUserInfo(token);
    }
    next();
};

// const checkModifyArticleValid = (to, from, next) => {
//     const targetStore = useTargetStore();
//     const { targetArticle } = storeToRefs(targetStore);
//     targetStore.setTargetArticle(to?.params.articleNo);
//     console.log("checkModifyArticleValid: ", from, to, targetArticle.value);

//     if (targetArticle.value == null) next(false);
//     else next();
    
// }

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "main",
            beforeEnter: loginRemainIfTokenValid,
            component: TheMainView,
        },
        {
            path: "/login",
            name: "login",
            component: TheLoginView,
        },
        {
            path: "/joinUs",
            name: "joinUs",
            component: TheRegistrationView,
        },
        {
            path: "/logout",
            name: "logout",
            beforeEnter: onlyAuthUser,
            component: TheLogout,
        },
        {
            path: "/member-modify",
            name: "member-modify",
            beforeEnter: onlyAuthUser,
            component: ModifyForm,
        },
        {
            path: "/community",
            name: "community",
            component: TheCommunityView,
        },
        {
            path: "/attraction",
            name: "attraction",
            beforeEnter: onlyAuthUser,
            // component: TheAttractionView,
            component: TheAttractionView2,
        },
        {
            path: "/board",
            name: "board",
            // component: TheBoardView,
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/TheBoardView.vue"),
            beforeEnter: onlyAuthUser,
            redirect: { name: "article-list" },
            children: [
                {
                    path: "list",
                    name: "article-list",
                    component: () => import("@/components/board/BoardList.vue"),
                },
                {
                    path: "view/:articleNo",
                    name: "article-view",
                    component: () => import("@/components/board/BoardDetail.vue"),
                },
                {
                    path: "write",
                    name: "article-write",
                    component: () => import("@/components/board/BoardWrite.vue"),
                },
                {
                    path: "modify/:articleNo",
                    name: "article-modify",
                    component: () => import("@/components/board/BoardModify.vue"),
                    // beforeEnter: checkModifyArticleValid,
                },
                {
                    path: "reply/:articleNo",
                    name: "article-reply",
                    component: () => import("@/components/reply/BoardReplyWrite.vue"),
                },
                // {
                //     path: "reply/modify/:articleNo/:replyNo",
                //     name: "article-reply-modify",
                //     component: () => import("@/components/reply/BoardReplyModify.vue"),
                // },
                {
                    path: "reply/modify/:replyNo",
                    name: "article-reply-modify",
                    component: () => import("@/components/reply/BoardReplyModify.vue"),
                },
                {
                    path: "reply/delete/:replyNo",
                    name: "article-reply-delete",
                    component: () => import("@/components/reply/ReplyDelete.vue"),
                },
            ],
        },
    ],
});

router.beforeEach((to, from) => {
    // console.log(to, val, from);
    // console.log(from);
});

export default router;
