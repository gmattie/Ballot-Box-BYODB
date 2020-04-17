/**
 * @description Reset component
 * 
 * @requires Button
 * @requires Confirmation
 * @requires constants
 * @requires PasswordField
 * @requires PublicContainer
 * @requires react
 * @requires TextField
 * @requires useAuth
 * @requires useInputText
 * @requires useUsers
 * @public
 * @module
 * 
 */
import { LoadingAPI } from "../public/PublicContainer";
import * as C from "../../../support/constants";
import Button from "../../controls/Button";
import Confirmation from "./Confirmation";
import PasswordField from "../../controls/PasswordField";
import React, { useContext, useRef, useState } from "react";
import TextField from "../../controls/TextField";
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
    const [ emailSent, setEmailSent ] = useState(false);

    const [ isLoading, setIsLoading ] = useContext(LoadingAPI);

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
    } = useInputText(`${C.Label.NEW} ${C.Label.PASSWORD}`, submitHandler);

    const { 
        
        binding: bindPasswordConfirm,
        value: passwordConfirm
    } = useInputText(`${C.Label.CONFIRM } ${C.Label.NEW} ${C.Label.PASSWORD}`, submitHandler);

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
        
            <Confirmation
                email={usersReset.email}
                message={C.Label.EMAIL_RESET}
            />
        );
    }

    return (

        <div className={C.Style.RESET}>
            <div className={C.Style.RESET_EMAIL}>
                <TextField 
                    name={C.ID.NAME_EMAIL}
                    disabled={isLoading}
                    errorMessage={invalidEmail || userDoesNotExist}
                    {...bindEmail}
                />
            </div>

            <div className={C.Style.RESET_PASSWORD}>
                <PasswordField
                    name={C.ID.NAME_PASSWORD}
                    disabled={isLoading}
                    errorMessage={invalidPassword}
                    {...bindPassword}
                />
            </div>

            <div className={C.Style.RESET_PASSWORD_CONFIRM}>
                <PasswordField
                    name={C.ID.NAME_PASSWORD_CONFIRM}
                    disabled={isLoading}
                    errorMessage={invalidPasswordConfirm}
                    {...bindPasswordConfirm}
                />
            </div>
            
            <div className={C.Style.RESET_SUBMIT}>
                {isLoading &&
                    <div className={C.Style.RESET_SUBMIT_PRELOADER} />
                }

                <div className={C.Style.RESET_SUBMIT_BUTTON}>
                    <Button
                        style={C.Style.BUTTON_SUBMIT_EMPHASIS}
                        onClick={submitHandler}
                        disabled={isLoading || !isSubmittable.current}
                    >
                        {C.Label.RESET}
                    </Button>
                </div>
            </div>
        </div>
    );
};

/**
 * Export module
 * 
 */
export default Reset;