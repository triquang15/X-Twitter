import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Auth/Reducer";
import { thunk } from "redux-thunk";
import { postReducer } from "./Post/Reducer";

const rootReducers = combineReducers({
    auth: authReducer,
    post: postReducer

});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));