/**
 * @description Login component
 * 
 * @requires constants
 * @requires react
 * @requires useAuth
 * @requires useInputText
 * @requires useUsers
 * @requires InputPassword
 * @public
 * @module
 * 
 */
import * as C from "../../../support/constants";
import React, { useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useInputText from "../../../hooks/useInputText";
import useUsers from "../../../hooks/useUsers";
import InputPassword from "../../InputPassword";

/**
 * @description The Login component contains UI elements that are required to log in a user.
 * The UI elements include text input fields for entering credentials and a button for submitting the entered credentials to the server.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const Login = () => {

    /**
     * State
     * 
     */
    const [ invalidCredentials, setInvalidCredentials ] = useState(null);
    const [ invalidEmail, setInvalidEmail ] = useState(null);
    const [ invalidPassword, setInvalidPassword ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);

    /**
     * Refs
     * 
     */
    const responseUpdate = useRef(false);

    /**
     * Hooks
     * 
     */
    const { fetchLogin } = useUsers();

    const {
        
        authError,
        authToken,
        setAuthError,
        setAuthToken,
    } = useAuth();
        
    const {
        
        binding: bindEmail,
        clearValue: clearEmail,
        value: email
    } = useInputText(null, submitHandler);
    
    const { 
        
        binding: bindPassword,
        clearValue: clearPassword,
        value: password
    } = useInputText(null, submitHandler);

    /**
     * Login success
     * Clear text input elements and redirect route.
     * 
     */
    if (authToken && responseUpdate.current) {

        responseUpdate.current = false;

        clearEmail();
        clearPassword();
        
        // TODO: Replace with Redirected route
        console.log(localStorage.getItem(C.Local.TOKEN));
    }

    /**
     * Login failure
     * Parse the error object to set the appropriate local error states.
     * 
     */
    if (authError && responseUpdate.current) {

        responseUpdate.current = false;

        if (Array.isArray(authError.error)) {
            
            authError.error.forEach((error) => {

                switch (error[C.ID.ERROR_PARAM]) {

                    case C.ID.NAME_EMAIL:
                        setInvalidEmail(error[C.ID.ERROR_MESSAGE]);

                        break;

                    case C.ID.NAME_PASSWORD:
                        setInvalidPassword(error[C.ID.ERROR_MESSAGE]);
                        
                        break;

                    default:
                        throw new Error(error[C.ID.ERROR_MESSAGE]);
                }
            });
        }
        else {

            setInvalidCredentials(authError.error);
        }
    }

    /**
     * @description Posts the request body to the server.
     * Resets to the initial render by nullifying the "authError" and "authToken" states and clearing all local error states.
     * Function executes asynchronously to facilitate the local loading state.
     * Written as a function declaration in order to be hoisted and accessible to the custom hooks above.
     * 
     * @async
     * @function
     * @private
     *  
     */
    async function submitHandler() {

        setAuthError(null);
        setAuthToken(null);

        setInvalidCredentials(null);
        setInvalidEmail(null);
        setInvalidPassword(null);

        setIsLoading(true);

        responseUpdate.current = true;
        await fetchLogin(email, password);

        setIsLoading(false);
    }

    /**
     * JSX markup
     * 
     */
    return (

        <div>
            {invalidCredentials && (<div>{invalidCredentials}</div>)}

            <div>
                {invalidEmail && (<div>{invalidEmail}</div>)}
                <label>
                    {C.Label.EMAIL}
                    <input 
                        type={C.HTMLElement.InputType.TEXT}
                        name={C.ID.NAME_EMAIL}
                        disabled={isLoading}
                        {...bindEmail}
                    />
                </label>
            </div>

            <div>
                {invalidPassword && (<div>{invalidPassword}</div>)}
                <label>
                    {C.Label.PASSWORD}
                    <InputPassword
                        name={C.ID.NAME_PASSWORD}
                        disabled={isLoading}
                        {...bindPassword}
                    />
                </label>
            </div>
            
            <button
                onClick={submitHandler}
                disabled={isLoading}
            >
                {C.Label.LOGIN.toUpperCase()}
            </button>

            {
                //TODO: Replace with style animation
                isLoading && (<div>LOADING...</div>)
            }
        </div>
    );
};

/**
 * Export module
 * 
 */
export default Login;