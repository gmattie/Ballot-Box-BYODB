/**
 * @description Actions associated with the authReducer.
 * 
 * @requires constants
 * @module
 * 
 */
import * as C from "../../support/constants";

/**
 * @description Writes the token data to local storage and creates an action that sets the "authToken" property of the authReducer state.
 * 
 * @param {string|null} data - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setAuthToken = (data) => {

    if (data) {
    
        localStorage.setItem(C.Local.TOKEN, data[C.Local.TOKEN]);
    }
    else {

        localStorage.removeItem(C.Local.TOKEN);
    }

    return {

        type: C.Action.Type.AUTH_TOKEN,
        [C.Action.PAYLOAD]: data
    };
};

/**
 * @description Removes the token data from local storage and creates an action that sets the "authError" property of the authReducer state. 
 * 
 * @param {string|null} error - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setAuthError = (error) => {

    localStorage.removeItem(C.Local.TOKEN);

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