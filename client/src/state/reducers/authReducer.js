/**
 * @description The auth reducer module.
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
    
    [C.Action.Type.AUTH_TOKEN]: null,
    [C.Action.Type.AUTH_ERROR]: null
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
const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case C.Action.Type.AUTH_TOKEN:
        case C.Action.Type.AUTH_ERROR:

            return {

                ...state,
                [action.type]: action[C.Action.PAYLOAD]
            };

        default:
            
            return state;
    }
};

/**
 * Export module
 * 
 */
export default authReducer;