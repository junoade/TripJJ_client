import { localAxios, uploadAxios, pureAxios } from "@/util/http-commons";

const local = uploadAxios();
const pure = pureAxios();
const api_name = "snapshot";

/**
 * 사용자가 스냅샷 게시판에 올린 스토리를 서버로 전송한다.
 * An User uploads a story on SnapShot Board
 * @param {*} param
 * @param {*} success
 * @param {*} fail
 */
async function uploadStory(param, success, fail) {
    await local.post(`${api_name}`, param).then(success).catch(fail);
}

/**
 * 사용자가 스냅샷 게시판에 올린 스토리를 수정한다.
 * An User modifies the story on SnapShot Board which is once uploaded before
 * @param {*} param
 * @param {*} success
 * @param {*} fail
 */
async function modifyStory(param, success, fail) {}

/**
 * 사용자가 자신이 올린 스토리를 삭제한다.
 * An User deletes its own story
 * @param {*} param
 * @param {*} success
 * @param {*} fail
 */
async function deleteStory(param, success, fail) {}

/**
 * 사용자 아이디(userId)를 바탕으로 자신이 업로드한 스토리 목록을 조회한다
 * An User get list of own stories which are uploaded before
 * @param {*} param
 * @param {*} success
 * @param {*} fail
 */
async function findStoryByUserId(param, success, fail) {
    local.get(`${api_name}/user/${param}`).then(success).catch(fail);
}

/**
 * 스토리 아이디(storyId)를 바탕으로 특정 스토리를 조회한다.
 * An User get a specified story by storyId
 * @param {*} param
 * @param {*} success
 * @param {*} fail
 */
async function findStoryByStoryId(param, success, fail) {}

async function findStories(success, fail) {
    await pure.get(`${api_name}`).then(success).catch(fail);
}

async function getImage(param, success, fail) {
    await local.get(`${api_name}/getImage/${param}`, {
        responseType: 'arraybuffer'
    }).then(success).catch(fail);
}

export {
    uploadStory,
    modifyStory,
    deleteStory,
    findStoryByUserId,
    findStoryByStoryId,
    findStories,
    getImage,
};
