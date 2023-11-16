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

export { listAttractions, listSido, listGugun };