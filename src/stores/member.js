import { ref } from 'vue'
import { useRouter } from "vue-router";
import { defineStore } from 'pinia'
import { jwtDecode } from "jwt-decode";


import { doRegistration, doLogin, findById, tokenRegeneration, logout } from "@/api/member";
import { httpStatusCode } from "@/util/http-status";

export const useMemberStore = defineStore('memberStore', () => {
    const router = useRouter();

    const isLogin = ref(false);
    const isLoginError = ref(false);
    const userInfo = ref(null);
    const isValidToken = ref(false);

    // login 상태에 의존
    // const memberMenu = ref({
    //     "joinUs" : { name: "joinUs", routeName: "joinUs" },
    //     "login" : { name: "login", show: isLogin, routeName: "login" },
    //     // "myPage" : { name: "마이페이지", show: false, routeName: "user-mypage" },
    // });

    // const changeMemberState = () => {
    //     memberMenu.value["login"]["show"] = !memberMenu.value["login"]["show"];
    // };

    // 토큰 정보 받아옴
    const userLogin = async (loginUser) => {
        await doLogin(
            loginUser,
            (response) => {
                console.log("login ok!!!!", response.status);
                console.log("login ok!!!!", httpStatusCode.CREATE);

                if (response.status === httpStatusCode.CREATE) {
                    let { data } = response;
                    let accessToken = data["access-token"];
                    let refreshToken = data["refresh-token"];
                    console.log("accessToken", accessToken);
                    console.log("refreshToken", refreshToken);

                    isLogin.value = true;
                    isLoginError.value = false;
                    isValidToken.value = true;

                    // sessionStorage.setItem("accessToken", accessToken);
                    // sessionStorage.setItem("refreshToken", refreshToken);
                    // console.log("sessiontStorage에 담았다", isLogin.value);
                    
                    console.log("localStorage에도 쿠키처럼 토큰 담았다");
                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);

                } else {
                    console.log("로그인 실패했다");
                    isLogin.value = false;
                    isLoginError.value = true;
                    isValidToken.value = false;
                }
            },
            (error) => {
                console.error(error);
            }
        );
    };

    // 사용자가 지속적으로 서비스를 이용할 수 있게
    // 토큰 -> 서버; 유효한 토큰 검증 후 사용자 정보 get
    const getUserInfo = async (token) => {
        let decodeToken = jwtDecode(token);
        console.log("2. decodeToken", decodeToken);
        console.log("> userId in token", decodeToken.userId);

        await findById(
            decodeToken.userId,
            (response) => {
                if (response.status === httpStatusCode.OK) {
                    userInfo.value = response.data.userInfo;
                    console.log("3. getUserInfo data >> ", response.data);

                    // 새로고침하더라도 유지되도록 
                    isLogin.value = true;
                    isLoginError.value = false;
                    isValidToken.value = true;
                    
                } else {
                    console.log("유저 정보 없음!!!!");
                }
            },
            async (error) => {
                console.error(
                    "getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
                    error.response.status
                );
                isValidToken.value = false;

                await tokenRegenerate();
            }
        );
    };

    const tokenRegenerate = async () => {
        console.log("토큰 재발급 >> 기존 토큰 정보 : {}", localStorage.getItem("accessToken"));
        await tokenRegeneration(
            JSON.stringify(userInfo.value),
            (response) => {
                if (response.status === httpStatusCode.CREATE) {
                    let accessToken = response.data["access-token"];
                    console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
                    // sessionStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("accessToken", accessToken);
                    isValidToken.value = true;
                }
            },
            async (error) => {
                // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
                if (error.response.status === httpStatusCode.UNAUTHORIZED) {
                    console.log("갱신 실패");
                    // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
                    await logout(
                        userInfo.value.userid,
                        (response) => {
                            if (response.status === httpStatusCode.OK) {
                                console.log("리프레시 토큰 제거 성공");
                            } else {
                                console.log("리프레시 토큰 제거 실패");
                            }
                            alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
                            isLogin.value = false;
                            userInfo.value = null;
                            isValidToken.value = false;
                            router.push({ name: "user-login" });
                        },
                        (error) => {
                            console.error(error);
                            isLogin.value = false;
                            userInfo.value = null;
                        }
                    );
                }
            }
        );
    };

    const userLogout = async (userid) => {
        await logout(
            userid,
            (response) => {
                if (response.status === httpStatusCode.OK) {
                    isLogin.value = false;
                    userInfo.value = null;
                    isValidToken.value = false;
                    // sessionStorage.removeItem("accessToken");
                    // sessionStorage.removeItem("refreshToken");
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");

                } else {
                    console.error("유저 정보 없음!!!!");
                }
            },
            (error) => {
                console.log(error);
            }
        );

        alert("로그아웃 되었습니다.");
        router.replace({name: "main"});
    };

    // 새로 고침시에도 로그인 유지되도록


    return {
        isLogin,
        isLoginError,
        userInfo,
        isValidToken,
        userLogin,
        getUserInfo,
        tokenRegenerate,
        userLogout,
    };
})
