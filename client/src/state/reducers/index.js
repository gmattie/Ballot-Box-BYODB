/**
 * @description The root reducer module.
 * 
 * @requires authReducer
 * @requires constants
 * @requires itemsReducer
 * @requires persistReducer
 * @requires redux
 * @requires usersReducer
 * @requires votesReducer
 * @requires webSocketReducer
 * @module
 * 
 */
import { combineReducers } from "redux";
import * as C from "../../support/constants";
import auth from "./authReducer";
import items from "./itemsReducer";
import persist from "./persistReducer";
import users from "./usersReducer";
import votes from "./votesReducer";
import webSocket from "./webSocketReducer";

/**
 * @description A combination of all included reducers into a single reducer.
 * 
 * @private
 * @constant
 * 
 */
const reducers = combineReducers({

    auth,
    items,
    persist,
    users,
    votes,
    webSocket,
});

/**
 * @description Delegates to the combined reducers.
 * 
 * @public
 * @constant
 * 
 */ 
const rootReducer = (state, action) => {

    if (action.type === C.Action.Type.USERS_LOGOUT) {

        state = undefined;
    }

    return reducers(state, action);
};

/**
 * Export module
 * 
 */
export default rootReducer;