import { localAxios } from "@/util/http-commons";

const local = localAxios();

const api_name = 'member'

async function doRegistration(member, success, fail) {
    await local.post(`${api_name}`, JSON.stringify(member)).then(success).catch(fail);
}

async function doLogin(member, success, fail) {
    await local.post(`${api_name}/login`, JSON.stringify(member)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
    local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
    await local.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
    local.defaults.headers["refreshToken"] = sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
    await local.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
    await local.get(`/user/logout/${userid}`).then(success).catch(fail);
}

export {
    doRegistration, doLogin, findById, tokenRegeneration, logout,
}