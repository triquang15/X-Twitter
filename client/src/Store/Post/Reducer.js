import { CREATE_COMMENT_SUCCESS, GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, POST_CREATE_FAILURE, POST_CREATE_REQUEST, POST_CREATE_SUCCESS } from "./ActionType";

const initialState = {
    loading: false,
    error: null,
    posts: [],
    post: null,
    like: null,
    comments: [],
    newComment: null
}
export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_CREATE_REQUEST:
        case LIKE_POST_REQUEST:
        case GET_ALL_POST_REQUEST:
            return { ...state, loading: false, error: null }

        case POST_CREATE_SUCCESS:
            return {
                ...state, post: action.payload,
                posts: [action.payload, ...state.posts],
                loading: false, error: null
            };

        case GET_ALL_POST_SUCCESS:
            return {
                ...state, 
                posts: action.payload,
                comments: action.payload.comments,
                loading: false, error: null
            }

        case LIKE_POST_SUCCESS:
            return {
                ...state,
                like: action.payload,
                posts: state.posts.map((item) => item.id === action.payload.id ? action.payload : item),
                loading: false, error: null
            }

        case CREATE_COMMENT_SUCCESS:
            return{
                ...state,
                newComment: action.payload
            }

        case POST_CREATE_FAILURE:
        case LIKE_POST_FAILURE:
        case GET_ALL_POST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}