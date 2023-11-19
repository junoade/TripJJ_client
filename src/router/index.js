import { createRouter, createWebHistory } from "vue-router";
import TheMainView from "../views/TheMainView.vue";
import TheLoginView from "@/views/TheLoginView.vue";
import TheAttractionView from "@/views/TheAttractionView.vue";
import TheRegistrationView from "@/views/TheRegistrationView.vue";
import TheLogout from "@/components/member/Logout.vue";
import ModifyForm from "@/components/member/ModifyForm.vue";
import TheCommunityView from "@/views/TheCommunityView.vue";


// import TheBoardView from "../views/TheBoardView.vue";
// import TheElectricChargingStationView from '../views/TheElectricChargingStation.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "main",
            component: TheMainView,
        },
        {
            path: "/login",
            name: "login",
            component: TheLoginView,
        },
        {
            path:"/joinUs",
            name: "joinUs",
            component: TheRegistrationView,
        },
        {
            path:"/logout",
            name: "logout",
            component: TheLogout,
        },
        {
            path:"/member-modify",
            name: "member-modify",
            component: ModifyForm,
        },{
            path:"/community",
            name: "community",
            component: TheCommunityView,
        },
        {
            path: "/attraction",
            name: "attraction",
            component: TheAttractionView,
        },
        {
            path: "/board",
            name: "board",
            // component: TheBoardView,
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/TheBoardView.vue"),
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
                },
                {
                    path: "reply/:articleNo",
                    name: "article-reply",
                    component: () => import("@/components/board/BoardReplyWrite.vue"),
                },
                {
                    path: "reply/modify/:articleNo/:replyNo",
                    name: "article-reply-modify",
                    component: () => import("@/components/board/BoardReplyModify.vue"),
                },
                {
                    path: "reply/delete/:replyNo",
                    name: "article-reply-delete",
                    component: () => import("@/components/board/ReplyDelete.vue"),
                },
            ],
        },
    ],
});

router.beforeEach((to, from) => {
    console.log(to);
    console.log(from);
});

export default router;
