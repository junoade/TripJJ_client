import { localAxios } from "@/util/http-commons";

const local = localAxios();
const api_name = 'attraction'

function listAttractions(param, success, fail) {
    local.get(`${api_name}/search`, { params: param }).then(success).catch(fail);
}

function listSido(success, fail) {
    local.get(`${api_name}/sido`).then(success).catch(fail);
}

function listGugun(param, success, fail) {
    local.get(`${api_name}/gugun`, { params: param }).then(success).catch(fail);
}

function listInterests(param, success, fail) {
    local.get(`${api_name}/interests`, { params: param }).then(success).catch(fail);
}

function listInterestsContentIds(userId, success, fail) {
    local.get(`${api_name}/interests/contentIds?userId=${userId}`).then(success).catch(fail);
}

async function updateInterests(interests, success, fail) {
    await local.post(`${api_name}/interests`, JSON.stringify(interests)).then(success).catch(fail);
}

export {
    listAttractions, listSido, listGugun,
    listInterests, listInterestsContentIds,
    updateInterests
};