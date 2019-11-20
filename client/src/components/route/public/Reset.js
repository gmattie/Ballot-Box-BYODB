/**
 * @description Reset component
 * 
 * @requires constants
 * @requires InputPassword
 * @requires react
 * @requires useAuth
 * @requires useInputText
 * @requires useUsers
 * @public
 * @module
 * 
 */
import * as C from "../../../support/constants";
import InputPassword from "../../InputPassword";
import React, { useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useInputText from "../../../hooks/useInputText";
import useUsers from "../../../hooks/useUsers";

/**
 * @description The Reset component contains UI elements that are required to reset the user's password.
 * The UI elements include text input fields for entering a user's valid email address and new password as well as a button for submitting the input data to the server.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const Reset = () => {

    /**
     * State
     * 
     */
    const [ userDoesNotExist, setUserDoesNotExist ] = useState(null);
    const [ invalidEmail, setInvalidEmail ] = useState(null);
    const [ invalidPassword, setInvalidPassword ] = useState(null);
    const [ invalidPasswordConfirm, setInvalidPasswordConfirm ] = useState(null);
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
    const { authError, setAuthError } = useAuth();

    const {
        
        fetchReset,
        setUsersReset,
        usersReset
    } = useUsers();
    
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

    const { 
        
        binding: bindPasswordConfirm,
        clearValue: clearPasswordConfirm,
        value: passwordConfirm
    } = useInputText(null, submitHandler);

    /**
     * Reset success
     * Clear text input elements and redirect route.
     * 
     */
    if (usersReset && responseUpdate.current) {

        responseUpdate.current = false;

        clearEmail();
        clearPassword();
        clearPasswordConfirm();

        // TODO: Replace with Redirected route
        console.log(usersReset);
    }

    /**
     * Reset failure
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

                    case C.ID.NAME_PASSWORD_CONFIRM:
                        setInvalidPasswordConfirm(error[C.ID.ERROR_MESSAGE]);

                        break;

                    default:
                        throw new Error(error[C.ID.ERROR_MESSAGE]); 
                }
            });
        }
        else {

            setUserDoesNotExist(authError.error);
        }
    }

    /**
     * @description Posts the request body to the server.
     * Resets to the initial render by nullifying the "authError" and "usersReset" states and clearing all local error states.
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
        setUsersReset(null);

        setUserDoesNotExist(null);
        setInvalidEmail(null);
        setInvalidPassword(null);
        setInvalidPasswordConfirm(null);

        setIsLoading(true);

        responseUpdate.current = true;
        await fetchReset(email, password, passwordConfirm);

        setIsLoading(false);
    }

    /**
     * JSX markup
     * 
     */
    return (

        <div>
            {userDoesNotExist && (<div>{userDoesNotExist}</div>)}

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

            <div>
                {invalidPasswordConfirm && (<div>{invalidPasswordConfirm}</div>)}
                <label>
                    {C.Label.PASSWORD_CONFIRM}
                    <InputPassword
                        name={C.ID.NAME_PASSWORD_CONFIRM}
                        disabled={isLoading}
                        {...bindPasswordConfirm}
                    />
                </label>
            </div>
            
            <button
                onClick={submitHandler}
                disabled={isLoading}
            >
                {C.Label.RESET.toUpperCase()}
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
export default Reset;