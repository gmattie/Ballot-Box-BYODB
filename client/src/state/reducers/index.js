/**
 * @description The root reducer module.
 * 
 * @requires redux
 * @requires webSocketReducer
 * @module
 * 
 */
import { combineReducers } from "redux";
import webSocket from "./webSocketReducer";

/**
 * @description A combination of all included reducers into a single reducer.
 * 
 * @public
 * @constant
 * 
 */
const rootReducer = combineReducers({

    webSocket
});

/**
 * Export module
 * 
 */
export default rootReducer;