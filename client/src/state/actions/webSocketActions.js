/**
 * @description Actions associated with the webSocketReducer.
 * 
 * @requires constants
 * @module
 * 
 */
import * as C from "../../support/constants";

/**
 * @description Creates an action that sets the "websocketMessage" property of the webSocketReducer state. 
 * 
 * @param {string} message - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setWebSocketMessage = (message) => {

    return {

        type: C.Action.Type.WEBSOCKET_MESSAGE,
        [C.Action.PAYLOAD]: message
    };
};

/**
 * Export module
 * 
 */
export {

    setWebSocketMessage
};