import axios from "axios";

const { VITE_VUE_API_URL, VITE_ATTRACTION_SEARCH_URL } = import.meta.env;
const header_validator = "Bearer";

// local vue api axios instance
function localAxios() {
    const instance = axios.create({
        baseURL: VITE_VUE_API_URL,
        // headers: {
        //   "Content-Type": "application/json;charset=utf-8",
        // },
    });

    // Request 발생 시 적용할 내용.
    // instance.defaults.headers.common["Authorization"] = header_validator + " " + sessionStorage.getItem("accessToken");

    if (localStorage.getItem("accessToken"))
        instance.defaults.headers.common["Authorization"] =
            header_validator + " " + localStorage.getItem("accessToken");
    instance.defaults.headers.post["Content-Type"] = "application/json";
    instance.defaults.headers.put["Content-Type"] = "application/json";

    return instance;
}

function uploadAxios() {
    const instance = axios.create({
        baseURL: VITE_VUE_API_URL,
    });

    instance.defaults.headers.common["Authorization"] =
        header_validator + " " + localStorage.getItem("accessToken");
    instance.defaults.headers.post["Content-Type"] = "multipart/form-data";

    return instance;
}

export { localAxios, uploadAxios };
