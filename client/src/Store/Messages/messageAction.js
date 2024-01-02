import { CREATE_CHAT_FAILURE, CREATE_CHAT_REQUEST, CREATE_CHAT_SUCCESS, CREATE_MESSAGE_FAILURE, CREATE_MESSAGE_REQUEST, CREATE_MESSAGE_SUCCESS, GET_ALL_CHAT_FAILURE, GET_ALL_CHAT_REQUEST, GET_ALL_CHAT_SUCCESS } from "./ActionType";
import { api } from "../../Config/config"

export const createMessage = (message) => async (dispatch) => {
    dispatch({ type: CREATE_MESSAGE_REQUEST })
    try {
        const { data } = await api.post(`/api/messages/chat/${message.chatId}`, message);
        console.log("Create Message: ", data);
        dispatch({ type: CREATE_MESSAGE_SUCCESS, payload: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: CREATE_MESSAGE_FAILURE, payload: error })
    }
}

export const createChat = (chat) => async (dispatch) => {
    dispatch({ type: CREATE_CHAT_REQUEST })
    try {
        const { data } = await api.post(`/api/chats/create`, chat);
        console.log("Create Chat: ", data);
        dispatch({ type: CREATE_CHAT_SUCCESS, payload: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: CREATE_CHAT_FAILURE, payload: error })
    }
}

export const getAllChat = () => async (dispatch) => {
    dispatch({ type: GET_ALL_CHAT_REQUEST })
    try {
        const { data } = await api.get(`/api/chats`);
        console.log("Get All Chats: ", data);
        dispatch({ type: GET_ALL_CHAT_SUCCESS, payload: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: GET_ALL_CHAT_FAILURE, payload: error })
    }
}
