/**
 * @description Register component
 * 
 * @requires Collapsible
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
import Collapsible from "../../Collapsible";
import InputPassword from "../../InputPassword";
import React, { useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useInputText from "../../../hooks/useInputText";
import useUsers from "../../../hooks/useUsers";
/**
 * @description The Register component contains UI elements that are required to register a user.
 * The UI elements include text input fields for entering a user's name, email, password, optional admin credentials and a button for submitting the input data to the server.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const Register = () => {

    /**
     * State
     * 
     */
    const [ emailAlreadyRegistered, setEmailAlreadyRegistered ] = useState(null);
    const [ invalidAdminCredentials, setInvalidAdminCredentials ] = useState(null);
    const [ invalidName, setInvalidName ] = useState(null);
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

    /**
     * Hooks
     * 
     */
    const { authError, setAuthError } = useAuth();

    const {
        
        fetchRegister,
        setUsersRegister,
        usersRegister,
    } = useUsers();
    
    const {
        
        binding: bindName,
        clearValue: clearName,
        value: name
    } = useInputText(null, submitHandler);

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

    const {
        
        binding: bindAdminUsername,
        clearValue: clearAdminName,
        value: adminUsername
    } = useInputText(C.Label.OPTIONAL, submitHandler);

    const {
        
        binding: bindAdminPassword,
        clearValue: clearAdminPassword,
        value: adminPassword
    } = useInputText(C.Label.OPTIONAL, submitHandler);

    /**
     * Register success
     * Clear text input elements and redirect route.
     * 
     */
    if (usersRegister && responseUpdate.current) {

        responseUpdate.current = false;

        clearName();
        clearEmail();
        clearPassword();
        clearPasswordConfirm();
        clearAdminName();
        clearAdminPassword();

        setEmailSent(true);
    }

    /**
     * Register failure
     * Parse the error object to set the appropriate local error states.
     * 
     */
    if (authError && responseUpdate.current) {

        responseUpdate.current = false;

        if (Array.isArray(authError.error)) {
            
            authError.error.forEach((error) => {

                switch (error[C.ID.ERROR_PARAM]) {

                    case C.ID.NAME_NAME:
                        setInvalidName(error[C.ID.ERROR_MESSAGE]);

                        break;

                    case C.ID.NAME_EMAIL:
                        setInvalidEmail(error[C.ID.ERROR_MESSAGE]);

                        break;

                    case C.ID.NAME_PASSWORD:
                        setInvalidPassword(error[C.ID.ERROR_MESSAGE]);

                        break;

                    case C.ID.NAME_PASSWORD_CONFIRM:
                        setInvalidPasswordConfirm(error[C.ID.ERROR_MESSAGE]);

                        break;

                    case C.ID.NAME_ADMIN_USERNAME:
                    case C.ID.NAME_ADMIN_PASSWORD:
                        setInvalidAdminCredentials(error[C.ID.ERROR_MESSAGE]);

                        break;

                    default:
                        throw new Error(error[C.ID.ERROR_MESSAGE]);
                }
            });
        }
        else {

            setEmailAlreadyRegistered(authError.error);
        }
    }

    /**
     * @description Posts the request body to the server.
     * Resets to the initial render by nullifying the "authError" and "usersRegister" states and clearing all local error states.
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
        setUsersRegister(null);

        setEmailAlreadyRegistered(null);
        setInvalidAdminCredentials(null);
        setInvalidName(null);
        setInvalidEmail(null);
        setInvalidPassword(null);
        setInvalidPasswordConfirm(null);

        setIsLoading(true);

        responseUpdate.current = true;
        await fetchRegister(
            
            name,
            email,
            password,
            passwordConfirm,
            adminUsername,
            adminPassword
        );

        setIsLoading(false);
    }

    /**
     * JSX markup
     * 
     */
    if (emailSent) {

        return (
        
            <div>
                <p>{C.Label.EMAIL_SENT} <span>{usersRegister.email}</span></p>
                <p>{C.Label.EMAIL_REFER} {C.Label.EMAIL_REGISTRATION}</p>
            </div>
        );
    }

    return (

        <div>
            <div>
                {invalidName && <div>{invalidName}</div>}
                <label>
                    {C.Label.NAME}
                    <input 
                        type={C.HTMLElement.InputType.TEXT}
                        name={C.ID.NAME_NAME}
                        disabled={isLoading}
                        {...bindName}
                    />
                </label>
            </div>

            <div>
                {emailAlreadyRegistered && <div>{emailAlreadyRegistered}</div>}
                {invalidEmail && <div>{invalidEmail}</div>}
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
                {invalidPassword && <div>{invalidPassword}</div>}
                <label>
                    {C.Label.PASSWORD}
                    <InputPassword
                        name={C.ID.NAME_PASSWORD}
                        disabled={isLoading}
                        {...bindPassword}
                    />
                </label>
            </div>

            {password && 
                <div>
                    {invalidPasswordConfirm && <div>{invalidPasswordConfirm}</div>}
                    <label>
                        {C.Label.PASSWORD_CONFIRM}
                        <InputPassword
                            name={C.ID.NAME_PASSWORD_CONFIRM}
                            disabled={isLoading}
                            {...bindPasswordConfirm}
                        />
                    </label>
                </div>
            }

            <Collapsible title={C.Label.ADMIN_CREDENTIALS}>
                {invalidAdminCredentials && <div>{invalidAdminCredentials}</div>}

                <div>
                    <label>
                        {C.Label.ADMIN_USERNAME}
                        <input
                            type={C.HTMLElement.InputType.TEXT}
                            name={C.ID.NAME_ADMIN_USERNAME}
                            disabled={isLoading}
                            {...bindAdminUsername}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        {C.Label.ADMIN_PASSWORD}
                        <InputPassword
                            name={C.ID.NAME_ADMIN_PASSWORD}
                            disabled={isLoading}
                            {...bindAdminPassword}
                        />
                    </label>
                </div>
            </Collapsible>
            
            <button
                onClick={submitHandler}
                disabled={isLoading}
            >
                {C.Label.REGISTER.toUpperCase()}
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
export default Register;