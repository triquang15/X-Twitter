import { api } from "../../Config/config"
import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, FIND_POST_BY_ID_FAILURE, FIND_POST_BY_ID_REQUEST, FIND_POST_BY_ID_SUCCESS, GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GET_USER_POST_FAILURE, GET_USER_POST_REQUEST, GET_USER_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, POST_CREATE_FAILURE, POST_CREATE_REQUEST, POST_CREATE_SUCCESS} from "./ActionType";

export const getAllPosts = () => async (dispatch) => {
    dispatch({type:GET_ALL_POST_REQUEST})
    try {
        const { data } = await api.get("/api/posts");
        console.log("Get All Posts: ", data);
        dispatch({ type: GET_ALL_POST_SUCCESS, payload: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: GET_ALL_POST_FAILURE, payload: error.message })
    }
}

export const getUserPosts = (userId) => async (dispatch) => {
    dispatch({type:GET_USER_POST_REQUEST})
    try {
        const { data } = await api.get(`/api/posts/user/${userId}`);
        console.log("Get User Posts: ", data);
        dispatch({ type: GET_USER_POST_SUCCESS, payload: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: GET_USER_POST_FAILURE, payload: error.message })
    }
}

export const findPostById = (postId) => async (dispatch) => {
    dispatch({type:FIND_POST_BY_ID_REQUEST})
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
    dispatch({type:POST_CREATE_REQUEST})
    try {
        const { data } = await api.post(`/api/posts/create`, postData);
        console.log("Create Post: ", data);
        dispatch({ type: POST_CREATE_SUCCESS, payload: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: POST_CREATE_FAILURE, payload: error })
    }
}

export const likePost = (postId) => async (dispatch) => {
    dispatch({type:LIKE_POST_REQUEST})
    try {
        const { data } = await api.put(`/api/posts/like/${postId}`);
        console.log("likePost: ", data);
        dispatch({ type: LIKE_POST_SUCCESS, payload: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: LIKE_POST_FAILURE, payload: error.message })
    }
}

export const createComment = (reqData) => async (dispatch) => {
    dispatch({type:CREATE_COMMENT_REQUEST})
    try {
        const { data } = await api.post(`/api/comments/post/${reqData.postId}`, reqData.data);
        console.log("Create Comment: ", data);
        dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: CREATE_COMMENT_FAILURE, payload: error })
    }
}
