import { localAxios } from "@/util/http-commons";

const local = localAxios();

const api_name = "search";

async function searchByArea(param, success, fail) {
    await local.post(`${api_name}`, JSON.stringify(param)).then(success).catch(fail);
}

export { searchByArea };
