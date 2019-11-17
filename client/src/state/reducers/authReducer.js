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
 * @description The reducer creates and returns a new state by changing the previous state in response to an action.
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

            if (action[C.Action.PAYLOAD]) {

                localStorage.setItem(C.Local.TOKEN, action[C.Action.PAYLOAD][C.Local.TOKEN]);
            }

            return {
                
                ...state,
                [C.Action.Type.AUTH_TOKEN]: action[C.Action.PAYLOAD],
            };

        case C.Action.Type.AUTH_ERROR:

            localStorage.removeItem(C.Local.TOKEN);

            return {

                ...state,
                [C.Action.Type.AUTH_ERROR]: action[C.Action.PAYLOAD]
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