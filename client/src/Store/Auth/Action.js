import axios from "axios"
import { API_BASE_URL } from "../../Config/config"
import { GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOG_OUT, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS } from "./ActionType"

export const loginUser = (loginData) => async (dispatch) => {
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

    dispatch({ type: LOG_OUT,payload:null })

}

