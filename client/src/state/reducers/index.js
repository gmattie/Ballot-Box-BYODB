/**
 * @description The root reducer module.
 * 
 * @requires authReducer
 * @requires itemsReducer
 * @requires redux
 * @requires usersReducer
 * @requires votesReducer
 * @requires webSocketReducer
 * @module
 * 
 */
import { combineReducers } from "redux";
import auth from "./authReducer";
import items from "./itemsReducer";
import users from "./usersReducer";
import votes from "./votesReducer";
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
    votes,
    webSocket
});

/**
 * Export module
 * 
 */
export default reducers;