/**
 * @description Actions associated with the webSocketReducer.
 * 
 * @requires constants
 * @module
 * 
 */
import * as C from "../../support/constants";
import { setVotesActive } from "./voteActions";

/**
 * @description Dispatches an action that sets the "websocketMessage" property of the webSocketReducer state.
 * Additional actions may be conditionally dispatches from voteActions to the votesReducer state depending on the "message" argument.
 * 
 * @param {string} message - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setWebSocketMessage = (message) => {

    return (dispatch) => {
        
        if (message === C.Event.VOTE_CLOSED) {

            dispatch(setVotesActive(null));
        }

        dispatch({

            type: C.Action.Type.WEBSOCKET_MESSAGE,
            [C.Action.PAYLOAD]: message
        });
    };
};

/**
 * Export module
 * 
 */
export {

    setWebSocketMessage
};