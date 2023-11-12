import { localAxios } from "@/util/http-commons";

const local = localAxios();

const api_name = 'v1/auth'

function doLogin(member, success, fail) {
    local.post(`${api_name}/login`, JSON.stringify(member)).then(success).catch(fail);
  }

export {
    doLogin,
}