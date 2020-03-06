/**
 * @description Register component
 * 
 * @requires AdminCredentials
 * @requires Button
 * @requires Confirmation
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
import AdminCredentials from "../../AdminCredentials";
import Button from "../../controls/Button";
import Confirmation from "./Confirmation";
import InputPassword from "../../controls/InputPassword";
import InputText from "../../controls/InputText";
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
    const isSubmittable = useRef(false);

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
        value: name
    } = useInputText(C.Label.NAME, submitHandler);

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
    } = useInputText(`${C.Label.CONFIRM} ${C.Label.PASSWORD}`, submitHandler);

    const {
        
        binding: bindAdminUsername,
        value: adminUsername
    } = useInputText(C.Label.ADMIN_USERNAME, submitHandler);

    const {
        
        binding: bindAdminPassword,
        value: adminPassword
    } = useInputText(C.Label.ADMIN_PASSWORD, submitHandler);

    /**
     * Set isSubmittable flag
     * Determines if the present state of text data is sufficient for submitting to the server.
     * 
     */
    isSubmittable.current = (

        name && 
        email &&
        password &&
        passwordConfirm
    );

    /**
     * Register success
     * Clear text input elements and redirect route.
     * 
     */
    if (usersRegister && responseUpdate.current) {

        responseUpdate.current = false;

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

        if (isSubmittable.current) {

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
    }

    /**
     * JSX markup
     * 
     */
    if (emailSent) {

        return (
        
            <Confirmation
                email={usersRegister.email}
                message={C.Label.EMAIL_REGISTRATION}
            />
        );
    }

    return (

        <div className={C.Style.REGISTER}>
            <div className={C.Style.REGISTER_NAME}>
                <InputText
                    name={C.ID.NAME_NAME}
                    disabled={isLoading}
                    errorMessage={invalidName}
                    {...bindName}
                />
            </div>

            <div className={C.Style.REGISTER_EMAIL}>
                <InputText
                    name={C.ID.NAME_EMAIL}
                    disabled={isLoading}
                    errorMessage={emailAlreadyRegistered || invalidEmail}
                    {...bindEmail}
                />
            </div>

            <div className={C.Style.REGISTER_PASSWORD}>
                <InputPassword
                    name={C.ID.NAME_PASSWORD}
                    disabled={isLoading}
                    errorMessage={invalidPassword}
                    {...bindPassword}
                />
            </div>

            <div className={C.Style.REGISTER_PASSWORD_CONFIRM}>
                <InputPassword
                    name={C.ID.NAME_PASSWORD_CONFIRM}
                    disabled={isLoading}
                    errorMessage={invalidPasswordConfirm}
                    {...bindPasswordConfirm}
                />
            </div>

            <div className={C.Style.REGISTER_ADMIN}>
                <AdminCredentials
                    bindAdminUsername={bindAdminUsername}
                    bindAdminPassword={bindAdminPassword}
                    isLoading={isLoading}
                    errorMessage={invalidAdminCredentials}
                />
            </div>
            
            <div className={C.Style.REGISTER_BUTTON}>
                <Button
                    style={C.Style.BUTTON_SUBMIT_EMPHASIS}
                    onClick={submitHandler}
                    disabled={isLoading || !isSubmittable.current}
                >
                    {C.Label.REGISTER}
                </Button>
            </div>

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