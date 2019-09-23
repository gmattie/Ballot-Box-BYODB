/**
 * @description This module contains actions and action creators associated with the itemReducer.
 * 
 * @requires constants
 * @module
 * 
 */
import * as C from "../../support/constants";

/**
 * @description Creates an action that sets the "items" property of the itemsReducer state.
 * 
 * @param {string} items - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setItems = (items) => {

    return {

        type: C.Action.Type.ITEMS,
        [C.Action.PAYLOAD]: items
    };
};

/**
 * @description Creates an action that sets the "error" property of the itemsReducer state. 
 * 
 * @param {string} items - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @private
 * @function
 *  
 */
const setError = (error) => {

    return {

        type: C.Action.Type.ERROR,
        [C.Action.PAYLOAD]: error
    };
};

/**
 * @description An action that fetches data from /api/items and dispatches it to the itemReducer state.
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
            
            dispatch((data.error) ? setError(data) : setItems(data));
        }
        catch (error) {

            dispatch(setError(error));
        }
    };
};

/**
 * Export module
 * 
 */
export {

    fetchItems,
    setItems
};