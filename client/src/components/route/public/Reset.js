/**
 * @description Reset component
 * 
 * @requires constants
 * @requires InputPassword
 * @requires InputText
 * @requires react
 * @requires useAuth
 * @requires useInputText
 * @requires useUsers
 * @public
 * @module
 * 
 */
import * as C from "../../../support/constants";
import InputPassword from "../../controls/InputPassword";
import InputText from "../../controls/InputText";
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
    const [ emailSent, setEmailSent ] = useState(false);

    /**
     * Refs
     * 
     */
    const responseUpdate = useRef(false);
    const isSubmittable = useRef(false);

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
        value: email
    } = useInputText(C.Label.EMAIL, submitHandler);
    
    const { 
        
        binding: bindPassword,
        value: password
    } = useInputText(C.Label.PASSWORD, submitHandler);

    const { 
        
        binding: bindPasswordConfirm,
        value: passwordConfirm
    } = useInputText(C.Label.PASSWORD_CONFIRM, submitHandler);

    /**
     * Set isSubmittable flag
     * Determines if the present state of text data is sufficient for submitting to the server.
     * 
     */
    isSubmittable.current = (

        email &&
        password &&
        passwordConfirm
    );

    /**
     * Reset success
     * Clear text input elements and redirect route.
     * 
     */
    if (usersReset && responseUpdate.current) {

        responseUpdate.current = false;

        setEmailSent(true);
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

        if (isSubmittable.current) {
        
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
    }

    /**
     * JSX markup
     * 
     */
    if (emailSent) {

        return (
        
            <div className={C.Style.RESET_CONFIRMATION}>
                <p>{C.Label.EMAIL_SENT} <span>{usersReset.email}</span></p>
                <p>{C.Label.EMAIL_REFER} {C.Label.EMAIL_RESET}</p>
            </div>
        );
    }

    return (

        <div className={C.Style.RESET}>
            <div className={C.Style.RESET_EMAIL}>
                <InputText 
                    name={C.ID.NAME_EMAIL}
                    disabled={isLoading}
                    errorMessage={invalidEmail || userDoesNotExist}
                    {...bindEmail}
                />
            </div>

            <div className={C.Style.RESET_PASSWORD}>
                <InputPassword
                    name={C.ID.NAME_PASSWORD}
                    disabled={isLoading}
                    errorMessage={invalidPassword}
                    {...bindPassword}
                />
            </div>

            <div className={C.Style.RESET_PASSWORD_CONFIRM}>
                <InputPassword
                    name={C.ID.NAME_PASSWORD_CONFIRM}
                    disabled={isLoading}
                    errorMessage={invalidPasswordConfirm}
                    {...bindPasswordConfirm}
                />
            </div>
            
            <button
                onClick={submitHandler}
                disabled={isLoading || !isSubmittable.current}
            >
                {`${C.Label.RESET} ${C.Label.PASSWORD}`}
            </button>

            {
                //TODO: Replace with style animation
                isLoading && <div>LOADING...</div>
            }
        </div>
    );
};

/**
 * Export module
 * 
 */
export default Reset;