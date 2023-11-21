import { localAxios } from "@/util/http-commons";

const local = localAxios();

function listAttractions(param, success, fail) {
    local.get(`/attraction/search`, { params: param }).then(success).catch(fail);
}

function listSido(success, fail) {
    local.get(`/attraction/sido`).then(success).catch(fail);
}

function listGugun(param, success, fail) {
    local.get(`/attraction/gugun`, { params: param }).then(success).catch(fail);
}

function listInterests(param, success, fail) {
    local.get(`attraction/interests`, { params: param }).then(success).catch(fail);
}

function insertInterests(interests, success, fail) {
    local.post(`attraction/interests`, JSON.stringify(interests)).then(success).catch(fail);
}

function deleteInterests(interests, success, fail) {
    local.delete(`attraction`, JSON.stringify(interests)).then(success).catch(fail);
}

export { listAttractions, listSido, listGugun };