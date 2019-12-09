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

            return {
                
                ...state,
                [C.Action.Type.ITEMS_ADD]: action[C.Action.PAYLOAD],
            };

        case C.Action.Type.ITEMS_ALL:

            return {
                
                ...state,
                [C.Action.Type.ITEMS_ALL]: action[C.Action.PAYLOAD],
            };

        case C.Action.Type.ITEMS_ERROR:
            
            return {

                ...state,
                [C.Action.Type.ITEMS_ERROR]: action[C.Action.PAYLOAD]
            };

        case C.Action.Type.ITEMS_VOTE:

            return {

                ...state,
                [C.Action.Type.ITEMS_VOTE]: action[C.Action.PAYLOAD],
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