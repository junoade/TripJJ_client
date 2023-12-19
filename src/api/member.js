import { localAxios } from "@/util/http-commons";

const local = localAxios();

const api_name = "member";
const header_validator = "Bearer";

async function doRegistration(member, success, fail) {
    await local.post(`${api_name}`, JSON.stringify(member)).then(success).catch(fail);
}

async function doLogin(member, success, fail) {
    const timeout = 1000;
    await local.post(`${api_name}/login`, JSON.stringify(member), {timeout}).then(success).catch(fail);
}

async function findById(userid, success, fail) {
    // local.defaults.headers["Authorization"] = header_validator + " " + localStorage.getItem("accessToken");
    await local.get(`${api_name}/validate/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
    local.defaults.headers["refreshToken"] = localStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
    await local.post(`${api_name}/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
    await local.get(`${api_name}/logout/${userid}`).then(success).catch(fail);
}

async function updateMember(userId, member, success, fail) {
    console.log("axios 호출", member);
    console.log("axios 호출", JSON.stringify(member));
    await local.put(`${api_name}/${userId}`, JSON.stringify(member)).then(success).catch(fail);
}

export { doRegistration, doLogin, findById, tokenRegeneration, logout, updateMember };
