/**
 * @description Actions associated with the usersReducer.
 * 
 * @requires authActions
 * @requires constants
 * @module
 * 
 */
import * as C from "../../support/constants";
import * as authActions from "./authActions";

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
 * @description Creates an action that sets the "usersRegister" property of the usersReducer state.
 * 
 * @param {string} data - The value of the payload embedded in the action.
 * @returns {object|null} The action.
 * @private
 * @function
 *  
 */
const setUsersRegister = (data) => {

    return {

        type: C.Action.Type.USERS_REGISTER,
        [C.Action.PAYLOAD]: data
    };
};

/**
 * @description Creates an action that sets the "usersReset" property of the usersReducer state.
 * 
 * @param {string} data - The value of the payload embedded in the action.
 * @returns {object|null} The action.
 * @private
 * @function
 *  
 */
const setUsersReset = (data) => {

    return {

        type: C.Action.Type.USERS_RESET,
        [C.Action.PAYLOAD]: data
    };
};

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
 * @description Fetches data from /api/users/self and dispatches actions to the usersReducer state.
 *
 * @param {string} authToken - The JSON Web Token to authenticate the user.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const fetchSelf = (authToken) => {

    return async (dispatch) => {

        try {

            const url = `${C.Route.API_USERS}${C.Route.SELF}`;
            const options = {

                method: C.Request.METHOD_GET,
                headers: { [C.Request.HEADER_X_AUTH_TOKEN]: authToken }
            };

            const response = await fetch(url, options);
            const data = await response.json();
            
            dispatch((data.error) ? setUsersError(data) : setUsersSelf(data));
        }
        catch (error) {

            dispatch(setUsersError(error.message));
        }
    };
};

/**
 * @description Posts data to /api/users/login and dispatches actions from authActions to the authReducer state.
 * 
 * @param {string} email - The user's email address credential.
 * @param {string} password - The user's password credential.
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

            dispatch(setUsersError(error.message));
        }
    };
};

/**
 * @description Post data to /api/users/register and dispatches actions from either userActions to the usersReducer state or from authActions to the authReducer state.
 * 
 * @param {string} name - The user's name.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @param {string|null} [adminusername=null] - The admin name credential.
 * @param {string|null} [adminpassword=null] - The admin password credential.
 * @public
 * @function
 * 
 */
const register = (name, email, password, adminusername = null, adminpassword = null) => {

    return async (dispatch) => {

        try {

            const url = `${C.Route.API_USERS}${C.Route.REGISTER}`;
            const options = {

                method: C.Request.METHOD_POST,
                headers: { [C.Request.CONTENT_TYPE]: C.Request.APPLICATION_JSON },
                body: JSON.stringify({
                    
                    name,
                    email,
                    password,
                    ...(adminusername && { adminusername }),
                    ...(adminpassword && { adminpassword })
                })
            };

            const response = await fetch(url, options);
            const data = await response.json();

            dispatch((data.error) ? authActions.setAuthError(data) : setUsersRegister(data));
        }
        catch (error) {

            dispatch(setUsersError(error.message));
        }
    };
};

/**
 * @description Posts data to /api/users/reset and dispatches actions from either userActions to the usersReducer state or from authActions to the authReducer state.
 * 
 * @param {string} email - The user's email address credential.
 * @param {string} password - The user's new password credential.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const reset = (email, password) => {

    return async (dispatch) => {
        
        try {
            
            const url = `${C.Route.API_USERS}${C.Route.RESET}`;
            const options = {

                method: C.Request.METHOD_POST,
                headers: { [C.Request.CONTENT_TYPE]: C.Request.APPLICATION_JSON },
                body: JSON.stringify({ email, password })
            };

            const response = await fetch(url, options);
            const data = await response.json();
            
            dispatch((data.error) ? authActions.setAuthError(data) : setUsersReset(data));
        }
        catch (error) {

            dispatch(setUsersError(error.message));
        }
    };
};

/**
 * Export module
 * 
 */
export {

    fetchSelf,
    login,
    register,
    reset
};