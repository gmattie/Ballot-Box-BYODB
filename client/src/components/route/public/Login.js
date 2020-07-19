/**
 * @description Login component
 * 
 * @requires Button
 * @requires constants
 * @requires ErrorResponse
 * @requires PasswordField
 * @requires PublicContainer
 * @requires react
 * @requires react-router-dom
 * @requires TextField
 * @requires useAuth
 * @requires useInputText
 * @requires useUsers
 * @requires utilities
 * @public
 * @module
 * 
 */
import { concatClassNames } from "../../../support/utilities";
import { LoadingAPI } from "../public/PublicContainer";
import { useHistory } from "react-router-dom";
import * as C from "../../../support/constants";
import Button from "../../controls/Button";
import ErrorResponse from "../../ErrorResponse";
import PasswordField from "../../controls/PasswordField";
import React, { useContext, useRef, useState } from "react";
import TextField from "../../controls/TextField";
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
     * Context
     * 
     */
    const [ isLoading, setIsLoading ] = useContext(LoadingAPI);

    /**
     * State
     * 
     */
    const [ invalidCredentials, setInvalidCredentials ] = useState(null);
    const [ invalidEmail, setInvalidEmail ] = useState(null);
    const [ invalidPassword, setInvalidPassword ] = useState(null);

    /**
     * Refs
     * 
     */
    const isSubmittable = useRef(false);
    const responseUpdate = useRef(false);
    const showInvalidCredentials = useRef(true);

    /**
     * Hooks
     * 
     */
    const {
        
        authError,
        authToken,
        setAuthError,
        setAuthToken,
    } = useAuth();

    const history = useHistory();

    const {
        
        binding: bindEmail,
        value: email
    } = useInputText(C.Label.EMAIL, submitHandler);
    
    const { 
        
        binding: bindPassword,
        value: password
    } = useInputText(C.Label.PASSWORD, submitHandler);
    
    const { fetchLogin } = useUsers();

    /**
     * Set isSubmittable flag
     * Determines if the present state of text data is sufficient for submitting to the server.
     * 
     */
    isSubmittable.current = email && password;

    /**
     * Login success
     * Clear text input elements and redirect route.
     * 
     */
    if (authToken && responseUpdate.current) {

        responseUpdate.current = false;

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

                const errorMessage = error[C.Error.ERROR_MESSAGE];
                
                switch (error[C.Error.ERROR_PARAM]) {

                    case C.ID.NAME_EMAIL:
                        setInvalidEmail(errorMessage);

                        break;

                    case C.ID.NAME_PASSWORD:
                        setInvalidPassword(errorMessage);
                        
                        break;

                    default:
                        throw new Error(errorMessage);
                }
            });
        }
        else {

            showInvalidCredentials.current = true;
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

        if (isSubmittable.current) {
            
            setAuthError(null);
            setAuthToken(null);

            setInvalidCredentials(null);
            setInvalidEmail(null);
            setInvalidPassword(null);

            setIsLoading(true);

            responseUpdate.current = true;
            fetchLogin(email, password);
        }
    }

        /**
     * @description Callback for a dispatched "change" event from an HTMLInputElement.
     * Intercepts the target's "onChange" binding from its UseInputText hook.
     * 
     * @param {object} target - The object that dispatched the event.
     * @param {object} event - The event object.
     * 
     * @private
     * @function
     *  
     */
    const credentialsChangeHandler = (target, event) => {

        if (showInvalidCredentials.current) {

            showInvalidCredentials.current = false;
        }

        target.onChange(event);
    };

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.LOGIN}>
            <div
                className={
                    concatClassNames(
                        C.Style.LOGIN_ERROR,
                        (invalidCredentials && showInvalidCredentials.current && C.Style.LOGIN_ERROR_SHOW)
                    )
                }
            >
                {invalidCredentials &&
                    <ErrorResponse message={invalidCredentials} />
                }
            </div>

            <div className={C.Style.LOGIN_EMAIL}>
                <TextField 
                    name={C.ID.NAME_EMAIL}
                    disabled={isLoading}
                    errorMessage={invalidEmail}
                    {...bindEmail}
                    onChange={credentialsChangeHandler.bind(null, bindEmail)}
                />
            </div>

            <div className={C.Style.LOGIN_PASSWORD}>
                <PasswordField
                    name={C.ID.NAME_PASSWORD}
                    disabled={isLoading}
                    errorMessage={invalidPassword}
                    {...bindPassword}
                    onChange={credentialsChangeHandler.bind(null, bindPassword)}
                />
            </div>

            <div className={C.Style.LOGIN_SUBMIT} >
                {isLoading &&
                    <div className={C.Style.LOGIN_SUBMIT_PRELOADER} />
                }

                <div className={C.Style.LOGIN_SUBMIT_BUTTON}>
                    <Button
                        style={C.Style.BUTTON_SUBMIT_EMPHASIS}
                        onClick={submitHandler}
                        disabled={isLoading || !isSubmittable.current}
                    >
                        {C.Label.LOGIN}
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
export default Login;