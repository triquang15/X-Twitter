import axios from "axios"
import { API_BASE_URL, api } from "../../Config/config"
import { FIND_USER_BY_ID_FAILURE, FIND_USER_BY_ID_SUCCESS, FOLLOW_USER_FAILURE, FOLLOW_USER_SUCCESS, GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOG_OUT, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, SEARCH_USER_FAILURE, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "./ActionType"

export const loginUser = (loginData) => async (dispatch) => {
    dispatch({type: LOGIN_USER_FAILURE});
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData)
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt)
        }
        console.log('loginUser', data);
        dispatch({ type: LOGIN_USER_SUCCESS, payload: data.jwt })
    } catch (error) {
        console.log(error);
        dispatch({ type: LOGIN_USER_FAILURE, payload: error.message })
    }
}

export const getUserProfile = (jwt) => async (dispatch) => {
    dispatch({type: GET_USER_PROFILE_REQUEST});
    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })

        dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: GET_USER_PROFILE_FAILURE, payload: error.message })
    }
}

export const signupUser = (signupData) => async (dispatch) => {
    dispatch({type: REGISTER_USER_REQUEST});
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, signupData)
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt)
        }
        console.log('signUpUser', data);
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.jwt })
    } catch (error) {
        console.log(error);
        dispatch({ type: REGISTER_USER_FAILURE, payload: error.message })
    }
}

export const logoutUser = () => async (dispatch) => {
    localStorage.removeItem("jwt")

    dispatch({ type: LOG_OUT, payload: null })

}

export const findUserById = (userId) => async (dispatch) => {
    try {
        const { data } = await api.get(`/api/users/${userId}`)
        dispatch({ type: FIND_USER_BY_ID_SUCCESS, payload: data })

    } catch (error) {
        console.log(error);
        dispatch({ type: FIND_USER_BY_ID_FAILURE, payload: error.message })
    }
}

export const updateUser = (reqData) => async (dispatch) => {
    dispatch({type: UPDATE_USER_REQUEST});
    try {
        const { data } = await api.put(`/api/users/update`, reqData)
        console.log("updateUser: ", data);
        dispatch({ type: UPDATE_USER_SUCCESS, payload: reqData })

    } catch (error) {
        console.log(error);
        dispatch({ type: UPDATE_USER_FAILURE, payload: error.message })
    }
}

export const followUser = (userId) => async (dispatch) => {
    try {
        const { data } = await api.put(`/api/users/${userId}/follow`)
        console.log("followUser: ", data);
        dispatch({ type: FOLLOW_USER_SUCCESS, payload: data })

    } catch (error) {
        console.log(error);
        dispatch({ type: FOLLOW_USER_FAILURE, payload: error.message })
    }
}

export const searchUser = (query) => async (dispatch) => {
    dispatch({type: SEARCH_USER_REQUEST});
    try {
        const { data } = await api.get(`${API_BASE_URL}/api/users/search?query=${query}`);
        console.log('Search User...', data);
        dispatch({ type: SEARCH_USER_SUCCESS, payload: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: SEARCH_USER_FAILURE, payload: error.message })
    }
}

