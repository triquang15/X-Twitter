import { CREATE_CHAT_SUCCESS, CREATE_MESSAGE_SUCCESS, GET_ALL_CHAT_SUCCESS } from "./ActionType";

const initialState = {
    loading: false,
    error: null,
    chats: [],
    messages: [],
    message: null
}

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_MESSAGE_SUCCESS:
            return { ...state, message: action.payload }

        case CREATE_CHAT_SUCCESS:
            return { ...state, chats: [action.payload, ...state.chats] }

        case GET_ALL_CHAT_SUCCESS:
            return { ...state, chats: action.payload }

        default:
            return state;
    }
}