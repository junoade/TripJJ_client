import { localAxios } from "@/util/http-commons";

const local = localAxios();

const api_name = 'member'

function doRegistration(member, success, fail) {
    local.post(`${api_name}`, JSON.stringify(member)).then(success).catch(fail);
  }

export {
    doRegistration,
}