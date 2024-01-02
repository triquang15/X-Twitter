import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Auth/Reducer";
import { thunk } from "redux-thunk";
import { postReducer } from "./Post/Reducer";
import { messageReducer } from "./Messages/Reducer";

const rootReducers = combineReducers({
    auth: authReducer,
    post: postReducer,
    message: messageReducer

});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));