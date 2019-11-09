/**
 * @description Actions associated with the usersReducer.
 * 
 * @requires constants
 * @module
 * 
 */
import * as C from "../../support/constants";
import * as authActions from "./authActions";

/**
 * @description Creates an action that sets the "usersSelf" property of the usersReducer state.
 * 
 * @param {string} data - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @private
 * @function
 *  
 */
const setUsersSelf = (data) => {

    return {

        type: C.Action.Type.USERS_SELF,
        [C.Action.PAYLOAD]: data
    };
};

/**
 * @description Creates an action that sets the "usersError" property of the usersReducer state. 
 * 
 * @param {string} error - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @private
 * @function
 *  
 */
const setUsersError = (error) => {

    return {

        type: C.Action.Type.USERS_ERROR,
        [C.Action.PAYLOAD]: error
    };
};

/**
 * @description Posts data to /api/users/login and dispatches actions from authActions to the authReducer state.
 * 
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const login = (email, password) => {

    return async (dispatch) => {
        
        try {

            const url = `${C.Route.API_USERS}${C.Route.LOGIN}`;
            const options = {

                method: C.Request.METHOD_POST,
                headers: { [C.Request.CONTENT_TYPE]: C.Request.APPLICATION_JSON },
                body: JSON.stringify({ email, password })
            };

            const response = await fetch(url, options);
            const data = await response.json();
            
            dispatch((data.error) ? authActions.setAuthError(data) : authActions.setAuthToken(data));
        }
        catch (error) {

            dispatch(setUsersError(error));
        }
    };
};

/**
 * @description Fetches data from /api/users/self and dispatches it to the usersReducer state.
 * 
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const fetchUsersSelf = (authToken) => {

    return async (dispatch) => {

        try {

            const url = `${C.Route.API_USERS}${C.Route.SELF}`;
            const options = {

                method: C.Request.METHOD_GET,
                headers: {
                    
                    [C.Request.HEADER_X_AUTH_TOKEN]: authToken
                }
            };

            const response = await fetch(url, options);
            const data = await response.json();
            
            dispatch((data.error) ? setUsersError(data) : setUsersSelf(data));
        }
        catch (error) {

            dispatch(setUsersError(error));
        }
    };
};

/**
 * Export module
 * 
 */
export {

    login,
    fetchUsersSelf
};