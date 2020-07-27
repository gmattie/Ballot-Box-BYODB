/**
 * @description The items reducer module.
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
    
    [C.Action.Type.ITEMS_ADD]: null,
    [C.Action.Type.ITEMS_ALL]: null,
    [C.Action.Type.ITEMS_CANDIDATE]: null,
    [C.Action.Type.ITEMS_EDIT]: null,
    [C.Action.Type.ITEMS_ERROR]: null,
    [C.Action.Type.ITEMS_VOTE]: null,
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
const itemsReducer = (state = initialState, action) => {

    switch (action.type) {

        case C.Action.Type.ITEMS_ADD:
        case C.Action.Type.ITEMS_ALL:
        case C.Action.Type.ITEMS_CANDIDATE:
        case C.Action.Type.ITEMS_EDIT:
        case C.Action.Type.ITEMS_ERROR:
        case C.Action.Type.ITEMS_VOTE:

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
export default itemsReducer;