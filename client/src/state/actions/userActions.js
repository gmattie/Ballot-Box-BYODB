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
 * @public
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
 * @public
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
 * @public
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
 * @public
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
 * @description Posts data to /api/users/login and dispatches actions to the usersReducer state and from authActions to the authReducer state.
 * 
 * @param {string} email - The user's email address credential.
 * @param {string} password - The user's password credential.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const fetchLogin = (email, password) => {

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
            
            if (data.error) {

                dispatch(authActions.setAuthError(data));
            }
            else {

                dispatch(setUsersError(null));
                dispatch(authActions.setAuthToken(data));
                dispatch(fetchSelf(data[C.Local.TOKEN]));
            }
        }
        catch (error) {

            dispatch(setUsersError(error.message));
        }
    };
};

/**
 * @description Posts data to /api/users/logout and dispatches actions to the usersReducer state and from authActions to the authReducer state.
 *
 * @param {string} authToken - The JSON Web Token to authenticate the user.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const fetchLogout = (authToken) => {

    return async (dispatch) => {

        try {

            const url = `${C.Route.API_USERS}${C.Route.SELF}`;
            const options = {

                method: C.Request.METHOD_GET,
                headers: { [C.Request.HEADER_X_AUTH_TOKEN]: authToken }
            };

            const response = await fetch(url, options);
            const data = await response.json();
            
            if (data.error) {

                dispatch(setUsersError(data));
            }
            else {
                
                dispatch(setUsersError(null));
                dispatch(authActions.setAuthToken(null));
                dispatch(setUsersSelf(null));
                dispatch(fetchSelf(null));
            }
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
 * @param {string} passwordConfirm - The user's confirmed password.
 * @param {string|null} [adminUsername=null] - The admin username credential.
 * @param {string|null} [adminPassword=null] - The admin password credential.
 * @public
 * @function
 * 
 */
const fetchRegister = (name, email, password, passwordConfirm, adminUsername = null, adminPassword = null) => {

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
                    passwordConfirm,
                    adminUsername,
                    adminPassword
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
 * @param {string} passwordConfirm - The user's confirmed new password credential.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const fetchReset = (email, password, passwordConfirm) => {

    return async (dispatch) => {
        
        try {
            
            const url = `${C.Route.API_USERS}${C.Route.RESET}`;
            const options = {

                method: C.Request.METHOD_POST,
                headers: { [C.Request.CONTENT_TYPE]: C.Request.APPLICATION_JSON },
                body: JSON.stringify({ email, password, passwordConfirm })
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
 * @description Gets data from /api/users/self and dispatches actions to the usersReducer state.
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
 * Export module
 * 
 */
export {

    fetchLogin,
    fetchLogout,
    fetchRegister,
    fetchReset,
    fetchSelf,
    setUsersError,
    setUsersRegister,
    setUsersReset,
    setUsersSelf,
};