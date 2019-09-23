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
    
    [C.Action.Type.ITEMS]: null,
    [C.Action.Type.ERROR]: null
};

/**
 * @description The reducer creates and returns a new state by changing the previous state in response to an action.
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

        case C.Action.Type.ITEMS:

            return {
                
                ...state,
                [C.Action.Type.ITEMS]: action[C.Action.PAYLOAD],
                [C.Action.Type.ERROR]: null
            };

        case C.Action.Type.ERROR:
            return {

                ...state,
                [C.Action.Type.ERROR]: action[C.Action.PAYLOAD]
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