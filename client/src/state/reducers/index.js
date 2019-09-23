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
import items from "./itemsReducer";
import webSocket from "./webSocketReducer";

/**
 * @description A combination of all included reducers into a single reducer.
 * 
 * @public
 * @constant
 * 
 */
const reducers = combineReducers({

    items,
    webSocket
});

/**
 * Export module
 * 
 */
export default reducers;