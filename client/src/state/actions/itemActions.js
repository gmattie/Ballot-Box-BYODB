/**
 * @description Actions associated with the itemsReducer.
 * 
 * @requires constants
 * @module
 * 
 */
import * as C from "../../support/constants";

/**
 * @description Creates an action that sets the "itemsCandidate" property of the itemsReducer state.
 * 
 * @param {string} data - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setItemsCandidate = (data) => {

    return {

        type: C.Action.Type.ITEMS_CANDIDATE,
        [C.Action.PAYLOAD]: data
    };
};

/**
 * @description Creates an action that sets the "itemsVote" property of the itemsReducer state.
 * 
 * @param {string} data - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setItemsVote = (data) => {

    return {

        type: C.Action.Type.ITEMS_VOTE,
        [C.Action.PAYLOAD]: data
    };
};

/**
 * @description Creates an action that sets the "itemsError" property of the itemsReducer state. 
 * 
 * @param {string} error - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @private
 * @function
 *  
 */
const setItemsError = (error) => {

    return {

        type: C.Action.Type.ITEMS_ERROR,
        [C.Action.PAYLOAD]: error
    };
};

/**
 * @description An action that fetches data from /api/items and dispatches it to the itemsReducer state.
 * 
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const fetchItems = (authToken) => {

    return async (dispatch) => {

        try {

            const url = C.Route.API_ITEMS;
            const options = {

                method: C.Request.METHOD_GET,
                headers: {
                    
                    [C.Request.HEADER_X_AUTH_TOKEN]: authToken
                }
            };

            const response = await fetch(url, options);
            const data = await response.json();
            
            dispatch((data.error) ? setItemsError(data) : setItemsCandidate(data));
        }
        catch (error) {

            dispatch(setItemsError(error));
        }
    };
};

/**
 * Export module
 * 
 */
export {

    setItemsCandidate,
    setItemsVote,
    fetchItems
};