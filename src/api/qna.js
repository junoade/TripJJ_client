import { localAxios } from "@/util/http-commons";

const local = localAxios();

const api_name = '/qna'
const reply_api_name = api_name + "/reply";

function getQnaList(param, success, fail) {
  local.get(api_name, { params: param }).then(success).catch(fail);
}

function detailQna(articleno, success, fail) {
  local.get(`${api_name}/${articleno}`).then(success).catch(fail);
}

async function registQna(article, success, fail) {
  await local.post(`${api_name}/write`, JSON.stringify(article)).then(success).catch(fail);
}

function getModifyQna(articleno, success, fail) {
  local.get(`${api_name}/modify/${articleno}`).then(success).catch(fail);
}

async function modifyQna(article, success, fail) {
  await local.put(api_name, JSON.stringify(article)).then(success).catch(fail);
}

async function deleteQna(articleno, success, fail) {
  await local.delete(`${api_name}/${articleno}`).then(success).catch(fail);
}

async function registReply(reply, success, fail) {
  await local.post(`${reply_api_name}/write`, JSON.stringify(reply)).then(success).catch(fail);
}

function getModifyReply(replyno, success, fail) {
  local.get(`${reply_api_name}/modify/${replyno}`).then(success).catch(fail);
}

async function modifyReply(reply, success, fail) {
  await local.put(reply_api_name, JSON.stringify(reply)).then(success).catch(fail);
}

async function deleteReply(replyno, success, fail) {
  await local.delete(`${reply_api_name}/${replyno}`).then(success).catch(fail);
}

export {
    getQnaList,
    detailQna,
    registQna,
    getModifyQna,
    modifyQna,
    deleteQna,
    // -------------
    registReply,
    getModifyReply,
    modifyReply,
    deleteReply
};
