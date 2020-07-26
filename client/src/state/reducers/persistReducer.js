/**
 * @description The persist reducer module.
 * 
 * @requires constants
 * @module
 * 
 */
import * as C from "../../support/constants";

/**
 * @description The initial state of the reducer.
 * 
 * @private
 * @constant
 * 
 */
const initialState = {
    
    [C.Action.Type.PERSIST_COLLAPSED_ADD_ITEM]: true,
    [C.Action.Type.PERSIST_COLLAPSED_ADMIN_CREDENTIALS]: true,
    [C.Action.Type.PERSIST_COLLAPSED_EDIT_ITEMS]: true,
    [C.Action.Type.PERSIST_COLLAPSED_MANAGE_VOTE]: false,
    [C.Action.Type.PERSIST_RADIO_AGGREGATE]: false,
    [C.Action.Type.PERSIST_SCROLL_ADMIN]: null,
    [C.Action.Type.PERSIST_SCROLL_CANDIDATES]: null,
    [C.Action.Type.PERSIST_SCROLL_EDIT_ITEMS]: null,
    [C.Action.Type.PERSIST_SCROLL_EDIT]: null,
    [C.Action.Type.PERSIST_SCROLL_RESULTS]: null,
    [C.Action.Type.PERSIST_SCROLL_VOTES]: null,
    [C.Action.Type.PERSIST_TEXT_DEADLINE]: null,
    [C.Action.Type.PERSIST_TEXT_IMAGE]: null,
    [C.Action.Type.PERSIST_TEXT_NAME]: null,
    [C.Action.Type.PERSIST_TEXT_QUANTITY]: null,
    [C.Action.Type.PERSIST_TEXT_THUMBNAIL]: null,
    [C.Action.Type.PERSIST_TOGGLE_ANONYMOUS]: false,
};

/**
 * @description The reducer creates and returns a new state immutably by altering a copy of the previous state in response to an action.
 * 
 * @param {object} state - The initial or previous state of the reducer.
 * @param {object} action - Describes how to change the state.
 * @returns {object} The new state of the reducer.
 * @public
 * @function
 * 
 */
const persistReducer = (state = initialState, action) => {

    switch (action.type) {

        case C.Action.Type.PERSIST_COLLAPSED_ADD_ITEM:
        case C.Action.Type.PERSIST_COLLAPSED_ADMIN_CREDENTIALS:
        case C.Action.Type.PERSIST_COLLAPSED_EDIT_ITEMS:
        case C.Action.Type.PERSIST_COLLAPSED_MANAGE_VOTE:
        case C.Action.Type.PERSIST_RADIO_AGGREGATE:
        case C.Action.Type.PERSIST_SCROLL_ADMIN:
        case C.Action.Type.PERSIST_SCROLL_CANDIDATES:
        case C.Action.Type.PERSIST_SCROLL_EDIT_ITEMS:
        case C.Action.Type.PERSIST_SCROLL_EDIT:
        case C.Action.Type.PERSIST_SCROLL_RESULTS:
        case C.Action.Type.PERSIST_SCROLL_VOTES:
        case C.Action.Type.PERSIST_TEXT_DEADLINE:
        case C.Action.Type.PERSIST_TEXT_IMAGE:
        case C.Action.Type.PERSIST_TEXT_NAME:
        case C.Action.Type.PERSIST_TEXT_QUANTITY:
        case C.Action.Type.PERSIST_TEXT_THUMBNAIL:
        case C.Action.Type.PERSIST_TOGGLE_ANONYMOUS:

        return {
            
            ...state,
            [action.type]: action[C.Action.PAYLOAD],
        };

        default:
            
            return state;
    }
};

/**
 * Export module
 * 
 */
export default persistReducer;