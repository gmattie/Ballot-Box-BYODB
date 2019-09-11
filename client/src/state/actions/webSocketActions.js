/**
 * @description This module contains action creators associated to the webSocketReducer.
 * 
 * @requires constants
 * @module
 * 
 */
import * as C from "../../support/constants";

/**
 * @description Creates an action that describes how to change the message of the webSocketReducer state. 
 * 
 * @param {string} message - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setMessage = (message) => {

    return {

        type: C.Action.Type.MESSAGE,
        [C.Action.PAYLOAD]: message
    };
};

/**
 * Export module
 * 
 */
export {

    setMessage
};