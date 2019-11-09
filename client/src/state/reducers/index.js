/**
 * @description The root reducer module.
 * 
 * @requires itemReducer
 * @requires redux
 * @requires webSocketReducer
 * @module
 * 
 */
import { combineReducers } from "redux";
import auth from "./authReducer";
import items from "./itemsReducer";
import users from "./usersReducer";
import webSocket from "./webSocketReducer";

/**
 * @description A combination of all included reducers into a single reducer.
 * 
 * @public
 * @constant
 * 
 */
const reducers = combineReducers({

    auth,
    items,
    users,
    webSocket
});

/**
 * Export module
 * 
 */
export default reducers;