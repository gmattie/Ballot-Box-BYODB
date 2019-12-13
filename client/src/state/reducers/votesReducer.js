/**
 * @description The vote reducer module.
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
    
    [C.Action.Type.VOTES_ACTIVE]: null,
    [C.Action.Type.VOTES_ALL]: null,
    [C.Action.Type.VOTES_CAST]: null,
    [C.Action.Type.VOTES_ERROR]: null
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
const votesReducer = (state = initialState, action) => {

    switch (action.type) {

        case C.Action.Type.VOTES_ACTIVE:

            return {
                
                ...state,
                [C.Action.Type.VOTES_ACTIVE]: action[C.Action.PAYLOAD],
            };

        case C.Action.Type.VOTES_ALL:

            return {

                ...state,
                [C.Action.Type.VOTES_ALL]: action[C.Action.PAYLOAD]
            };

        case C.Action.Type.VOTES_CAST:

            return {

                ...state,
                [C.Action.Type.VOTES_CAST]: action[C.Action.PAYLOAD]
            };

        case C.Action.Type.VOTES_ERROR:

            return {

                ...state,
                [C.Action.Type.VOTES_ERROR]: action[C.Action.PAYLOAD]
            };

        default:
            
            return state;
    }
};

/**
 * Export module
 * 
 */
export default votesReducer;