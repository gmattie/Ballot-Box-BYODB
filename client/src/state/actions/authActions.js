/**
 * @description Actions associated with the authReducer.
 * 
 * @requires constants
 * @module
 * 
 */
import * as C from "../../support/constants";

/**
 * @description Creates an action that sets the "authToken" property of the webSocketReducer state. 
 * 
 * @param {string} token - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setAuthToken = (token) => {


    return {

        type: C.Action.Type.AUTH_TOKEN,
        [C.Action.PAYLOAD]: token
    };
};

/**
 * @description Creates an action that sets the "authError" property of the usersReducer state. 
 * 
 * @param {string} error - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @private
 * @function
 *  
 */
const setAuthError = (error) => {

    return {

        type: C.Action.Type.AUTH_ERROR,
        [C.Action.PAYLOAD]: error
    };
};

/**
 * Export module
 * 
 */
export {

    setAuthToken,
    setAuthError
};