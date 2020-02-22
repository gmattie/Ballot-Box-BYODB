/**
 * @description Login component
 * 
 * @requires constants
 * @requires ErrorResponse
 * @requires InputPassword
 * @requires InputText
 * @requires react
 * @requires react-router-dom
 * @requires useAuth
 * @requires useInputText
 * @requires useUsers
 * @public
 * @module
 * 
 */
import { useHistory } from "react-router-dom";
import * as C from "../../../support/constants";
import ErrorResponse from "../../ErrorResponse";
import InputPassword from "../../InputPassword";
import InputText from "../../InputText";
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
     * Hooks
     * 
     */
    const history = useHistory();
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
    } = useInputText(C.Label.EMAIL, submitHandler);
    
    const { 
        
        binding: bindPassword,
        clearValue: clearPassword,
        value: password
    } = useInputText(C.Label.PASSWORD, submitHandler);

    /**
     * Login success
     * Clear text input elements and redirect route.
     * 
     */
    if (authToken && responseUpdate.current) {

        responseUpdate.current = false;

        clearEmail();
        clearPassword();
        setIsLoading(false);

        setTimeout(() => history.push(C.Route.VOTE));
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

        setIsLoading(false);
    }

    /**
     * @description Posts the request body to the server.
     * Resets to the initial render by nullifying the "authError" and "authToken" states and clearing all local error states.
     * Written as a function declaration in order to be hoisted and accessible to the custom hooks above.
     * 
     * @async
     * @function
     * @private
     *  
     */
    function submitHandler() {

        setAuthError(null);
        setAuthToken(null);

        setInvalidCredentials(null);
        setInvalidEmail(null);
        setInvalidPassword(null);

        setIsLoading(true);

        responseUpdate.current = true;
        fetchLogin(email, password);
    }

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.LOGIN}>
            {invalidCredentials &&
                <div className={C.Style.LOGIN_ERROR}>
                    <ErrorResponse message={invalidCredentials} />
                </div>
            }

            <div className={C.Style.LOGIN_EMAIL}>
                <InputText 
                    name={C.ID.NAME_EMAIL}
                    disabled={isLoading}
                    errorMessage={invalidEmail}
                    {...bindEmail}
                />
            </div>

            <div className={C.Style.LOGIN_PASSWORD}>
                <InputPassword
                    name={C.ID.NAME_PASSWORD}
                    disabled={isLoading}
                    errorMessage={invalidPassword}
                    {...bindPassword}
                />
            </div>

            <button
                onClick={submitHandler}
                disabled={isLoading}
            >
                {C.Label.LOGIN}
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
export default Login;