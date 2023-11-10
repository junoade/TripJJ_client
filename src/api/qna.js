import { localAxios } from "@/util/http-commons";

const local = localAxios();

const api_name = '/qna'

function getQnaList(param, success, fail) {
  local.get(api_name, { params: param }).then(success).catch(fail);
}

function detailQna(articleno, success, fail) {
  local.get(`${api_name}/${articleno}`).then(success).catch(fail);
}

function registQna(article, success, fail) {
  console.log("boardjs article", article);
  local.post(api_name, JSON.stringify(article)).then(success).catch(fail);
}

function getModifyQna(articleno, success, fail) {
  local.get(`${api_name}/modify/${articleno}`).then(success).catch(fail);
}

function modifyQna(article, success, fail) {
  local.put(api_name, JSON.stringify(article)).then(success).catch(fail);
}

function deleteQna(articleno, success, fail) {
  local.delete(`${api_name}/${articleno}`).then(success).catch(fail);
}

export {
    getQnaList,
    detailQna,
    registQna,
    getModifyQna,
    modifyQna,
    deleteQna,
};
