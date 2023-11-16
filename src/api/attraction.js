import { localAxios } from "@/util/http-commons";

const local = localAxios();

function listAttractions(conditions, success, fail) {
  local.get(`/attraction/search`, { param: conditions }).then(success).catch(fail);
}

function listSido(success, fail) {
  local.get(`/attraction/sido`).then(success).catch(fail);
}

function listGugun(param, success, fail) {
  local.get(`/attraction/gugun`, { params: param }).then(success).catch(fail);
}

export { listAttractions, listSido, listGugun };