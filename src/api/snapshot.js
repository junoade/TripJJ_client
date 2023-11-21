import { localAxios, uploadAxios } from "@/util/http-commons";

const local = uploadAxios();
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
async function findStoryByUserId(param, success, fail) {}

/**
 * 스토리 아이디(storyId)를 바탕으로 특정 스토리를 조회한다.
 * An User get a specified story by storyId
 * @param {*} param
 * @param {*} success
 * @param {*} fail
 */
async function findStoryByStoryId(param, success, fail) {}

export { uploadStory, modifyStory, deleteStory, findStoryByUserId, findStoryByStoryId };
