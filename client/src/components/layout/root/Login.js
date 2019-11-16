/**
 * @description Login component
 * 
 * @requires constants
 * @requires react
 * @requires useAuth
 * @requires useInputText
 * @requires useUsers
 * @public
 * @module
 * 
 */
import * as C from "../../../support/constants";
import React, { useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useInputText from "../../../hooks/useInputText";
import useUsers from "../../../hooks/useUsers";

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
     * Custom hooks
     * 
     */
    const { authError, authToken } = useAuth();
    const { login } = useUsers();
    
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
     * Parse the error object to set the appropriate invalid states.
     * 
     */
    if (authError && responseUpdate.current) {

        responseUpdate.current = false;

        if (Array.isArray(authError.error)) {
            
            authError.error.forEach((error) => {
                
                if (error[C.ID.ERROR_PARAM] === C.ID.NAME_EMAIL) {

                    setInvalidEmail(error[C.ID.ERROR_MESSAGE]);
                }
                else if (error[C.ID.ERROR_PARAM] === C.ID.NAME_PASSWORD) {

                    setInvalidPassword(error[C.ID.ERROR_MESSAGE]);
                }
            });
        }
        else {

            setInvalidCredentials(authError.error);
        }
    }

    /**
     * @description Clears all error notifications, manages the loading state and posts the request body to the server.
     * Written as a named function declaration instead of a function expression in order to be hoisted and accessible to the custom hooks above.
     * 
     * @async
     * @function
     * @private
     *  
     */
    async function submitHandler() {

        setInvalidCredentials(null);
        setInvalidEmail(null);
        setInvalidPassword(null);

        setIsLoading(true);

        await login(email, password);
        responseUpdate.current = true;

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
                    <input
                        type={C.HTMLElement.InputType.PASSWORD}
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