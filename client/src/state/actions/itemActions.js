/**
 * @description Actions associated with the itemsReducer.
 * 
 * @requires authActions
 * @requires constants
 * @module
 * 
 */
import * as authActions from "./authActions";
import * as C from "../../support/constants";

/**
 * @description Creates an action that sets the "itemsAdd" property of the itemsReducer state.
 * 
 * @param {string} data - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setItemsAdd = (data) => {

    return {

        type: C.Action.Type.ITEMS_ADD,
        [C.Action.PAYLOAD]: data
    };
};

/**
 * @description Creates an action that sets the "itemsAll" property of the itemsReducer state.
 * 
 * @param {string} data - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setItemsAll = (data) => {

    return {

        type: C.Action.Type.ITEMS_ALL,
        [C.Action.PAYLOAD]: data
    };
};

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
 * @description Creates an action that sets the "itemsEdit" property of the itemsReducer state.
 * 
 * @param {string} data - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setItemsEdit = (data) => {

    return {

        type: C.Action.Type.ITEMS_EDIT,
        [C.Action.PAYLOAD]: data
    };
};

/**
 * @description Creates an action that sets the "itemsError" property of the itemsReducer state. 
 * 
 * @param {string} error - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
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
 * @description Posts data to /api/items/add and dispatches actions to the itemsReducer state or from authActions to the authReducer state.
 * 
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const fetchAdd = (name, image) => {

    return async (dispatch, getState) => {

        try {

            const authToken = getState().auth[C.Action.Type.AUTH_TOKEN][C.Local.TOKEN];
            const url = `${C.Route.API_ITEMS}${C.Route.ADD}`;
            const options = {

                method: C.Request.METHOD_POST,
                headers: {
                    
                    [C.Request.HEADER_X_AUTH_TOKEN]: authToken,
                    [C.Request.HEADER_CONTENT_TYPE]: C.Request.APPLICATION_JSON
                },
                body: JSON.stringify({
                    
                    [C.Model.ITEM]: [{
                        
                        name, image 
                    }]
                })
            };

            const response = await fetch(url, options);
            const data = await response.json();
            
            if (data.error) {

                dispatch(authActions.setAuthError(data));
            }
            else {

                dispatch(setItemsAdd(data));

                if (getState().items[C.Action.Type.ITEMS_ALL]) {

                    dispatch(fetchAll());
                }
            }
        }
        catch (error) {

            dispatch(setItemsError(error.message));
        }
    };
};

/**
 * @description Gets data from /api/items and dispatches actions to the itemsReducer state or from authActions to the authReducer state.
 * 
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const fetchAll = () => {

    return async (dispatch, getState) => {

        try {

            const authToken = getState().auth[C.Action.Type.AUTH_TOKEN][C.Local.TOKEN];
            const url = C.Route.API_ITEMS;
            const options = {

                method: C.Request.METHOD_GET,
                headers: { [C.Request.HEADER_X_AUTH_TOKEN]: authToken }
            };

            const response = await fetch(url, options);
            const data = await response.json();
            
            dispatch((data.error) ? authActions.setAuthError(data) : setItemsAll(data));
        }
        catch (error) {

            dispatch(setItemsError(error.message));
        }
    };
};

/**
 * @description Patches data to /api/items/edit/:itemID and dispatches actions to the itemsReducer state or from authActions to the authReducer state.
 * 
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const fetchEdit = (itemID, name, image) => {

    return async (dispatch, getState) => {

        try {

            const authToken = getState().auth[C.Action.Type.AUTH_TOKEN][C.Local.TOKEN];
            const url = `${C.Route.API_ITEMS}${C.Route.EDIT}/${itemID}`;
            const options = {

                method: C.Request.METHOD_PATCH,
                headers: {
                    
                    [C.Request.HEADER_X_AUTH_TOKEN]: authToken,
                    [C.Request.HEADER_CONTENT_TYPE]: C.Request.APPLICATION_JSON
                },
                body: JSON.stringify({ name, image })
            };

            const response = await fetch(url, options);
            const data = await response.json();
            
            if (data.error) {

                dispatch(authActions.setAuthError(data));
            }
            else {

                dispatch(setItemsEdit(data));
                dispatch(fetchAll());
            }
        }
        catch (error) {

            dispatch(setItemsError(error.message));
        }
    };
};

/**
 * Export module
 * 
 */
export {

    fetchAdd,
    fetchAll,
    fetchEdit,
    setItemsAdd,
    setItemsAll,
    setItemsCandidate,
    setItemsEdit,
    setItemsError,
    setItemsVote,
};