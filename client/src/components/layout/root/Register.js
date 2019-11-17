/**
 * @description Register component
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
    const [ userAlreadyExists, setUserAlreadyExists ] = useState(null);
    const [ invalidName, setInvalidName ] = useState(null);
    const [ invalidEmail, setInvalidEmail ] = useState(null);
    const [ invalidPassword, setInvalidPassword ] = useState(null);
    const [ invalidPasswordConfirm, setInvalidPasswordConfirm ] = useState(null);
    const [ invalidAdminUsername, setInvalidAdminUsername ] = useState(null);
    const [ invalidAdminPassword, setInvalidAdminPassword ] = useState(null);
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
    } = useInputText(null, submitHandler);

    const {
        
        binding: bindAdminPassword,
        clearValue: clearAdminPassword,
        value: adminPassword
    } = useInputText(null, submitHandler);

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

        // TODO: Replace with Redirected route
        console.log(usersRegister);
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
                        setInvalidAdminUsername(error[C.ID.ERROR_MESSAGE]);

                        break;

                    case C.ID.NAME_ADMIN_PASSWORD:
                        setInvalidAdminPassword(error[C.ID.ERROR_MESSAGE]);

                        break;

                    default:
                        throw new Error(error[C.ID.ERROR_MESSAGE]);
                }
            });
        }
        else {

            setUserAlreadyExists(authError.error);
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

        setUserAlreadyExists(null);
        setInvalidName(null);
        setInvalidEmail(null);
        setInvalidPassword(null);
        setInvalidPasswordConfirm(null);
        setInvalidAdminUsername(null);
        setInvalidAdminPassword(null);

        setIsLoading(true);

        responseUpdate.current = true;
        await fetchRegister(
            
            name,
            email,
            password,
            passwordConfirm,
            (adminUsername === "") ? null : adminUsername,
            (adminPassword === "") ? null : adminPassword
        );

        setIsLoading(false);
    }

    /**
     * JSX markup
     * 
     */
    return (

        <div>
            {userAlreadyExists && (<div>{userAlreadyExists}</div>)}

            <div>
                {invalidName && (<div>{invalidName}</div>)}
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

            <div>
                {invalidPasswordConfirm && (<div>{invalidPasswordConfirm}</div>)}
                <label>
                    {C.Label.PASSWORD_CONFIRM}
                    <input
                        type={C.HTMLElement.InputType.PASSWORD}
                        name={C.ID.NAME_PASSWORD_CONFIRM}
                        disabled={isLoading}
                        {...bindPasswordConfirm}
                    />
                </label>
            </div>

            <div>
                {invalidAdminUsername && (<div>{invalidAdminUsername}</div>)}
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
                {invalidAdminPassword && (<div>{invalidAdminPassword}</div>)}
                <label>
                    {C.Label.ADMIN_PASSWORD}
                    <input
                        type={C.HTMLElement.InputType.PASSWORD}
                        name={C.ID.NAME_ADMIN_PASSWORD}
                        disabled={isLoading}
                        {...bindAdminPassword}
                    />
                </label>
            </div>
            
            <button
                onClick={submitHandler}
                disabled={isLoading}
            >
                {C.Label.REGISTER.toUpperCase()}
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
export default Register;