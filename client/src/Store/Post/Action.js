import { api } from "../../Config/config"
import { FIND_POST_BY_ID_FAILURE, FIND_POST_BY_ID_SUCCESS, GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GET_USER_POST_FAILURE, GET_USER_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_SUCCESS, POST_CREATE_FAILURE, POST_CREATE_SUCCESS, POST_DELETE_FAILURE, POST_DELETE_SUCCESS, REPLY_POST_FAILURE, REPLY_POST_SUCCESS, RE_POST_FAILURE, RE_POST_SUCCESS, USER_LIKE_POST_FAILURE, USER_LIKE_POST_SUCCESS } from "./ActionType";

export const getAllPosts = () => async (dispatch) => {
    try {
        const { data } = await api.get("/api/posts/");
        console.log("Get All Posts: ", data);
        dispatch({ type: GET_ALL_POST_SUCCESS, payload: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: GET_ALL_POST_FAILURE, payload: error.message })
    }
}

export const getUserAllPosts = (userId) => async (dispatch) => {
    try {
        const { data } = await api.get(`/api/posts/user/${userId}`);
        console.log("Get User Posts: ", data);
        dispatch({ type: GET_USER_POST_SUCCESS, payload: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: GET_USER_POST_FAILURE, payload: error.message })
    }
}

export const findPostByLikesContainersUser = (userId) => async (dispatch) => {
    try {
        const { data } = await api.get(`/api/posts/user/${userId}/likes`);
        console.log("find Post By Likes Containers User: ", data);
        dispatch({ type: USER_LIKE_POST_SUCCESS, payload: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: USER_LIKE_POST_FAILURE, payload: error.message })
    }
}

export const findPostById = (postId) => async (dispatch) => {
    try {
        const { data } = await api.get(`/api/posts/${postId}`);
        console.log("find Post By Id: ", data);
        dispatch({ type: FIND_POST_BY_ID_SUCCESS, payload: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: FIND_POST_BY_ID_FAILURE, payload: error.message })
    }
}

export const createPost = (postData) => async (dispatch) => {
    try {
        const { data } = await api.post(`/api/posts/create`, postData);
        console.log("Create Post: ", data);
        dispatch({ type: POST_CREATE_SUCCESS, payload: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: POST_CREATE_FAILURE, payload: error.message })
    }
}

export const replyPost = (postData) => async (dispatch) => {
    try {
        const { data } = await api.post(`/api/posts/reply`, postData);
        console.log("replyPost: ", data);
        dispatch({ type: REPLY_POST_SUCCESS, payload: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: REPLY_POST_FAILURE, payload: error.message })
    }
}

export const rePostHandler = (postId) => async (dispatch) => {
    try {
        const { data } = await api.put(`/api/posts/${postId}/repost`);
        console.log("rePostHandler: ", data);
        dispatch({ type: RE_POST_SUCCESS, payload: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: RE_POST_FAILURE, payload: error.message })
    }
}

export const likePost = (postId) => async (dispatch) => {
    try {
        const { data } = await api.post(`/api/${postId}/likes`);
        console.log("likePost: ", data);
        dispatch({ type: LIKE_POST_SUCCESS, payload: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: LIKE_POST_FAILURE, payload: error.message })
    }
}

export const deletePostHandler = (postId) => async (dispatch) => {
    try {
        const { data } = await api.delete(`/api/${postId}`, data);
        console.log("deletePost: ", data);
        dispatch({ type: POST_DELETE_SUCCESS, payload: postId })
    } catch (error) {
        console.log(error);
        dispatch({ type: POST_DELETE_FAILURE, payload: error.message })
    }
}