/**
 * @description Edit component
 * 
 * @requires AdminCredentials
 * @requires Button
 * @requires constants
 * @requires Dialog
 * @requires InputPassword
 * @requires InputText
 * @requires prop-types
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
import Dialog from "../../modal/Dialog";
import InputPassword from "../../controls/InputPassword";
import InputText from "../../controls/InputText";
import PropTypes from "prop-types";
import React, { useRef, useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useInputText from "../../../hooks/useInputText";
import useUsers from "../../../hooks/useUsers";

/**
 * @description The Edit component contains UI elements that are required to edit a User document.
 * The UI elements include text input fields for editing a user's name, password and admin credentials and a button for submitting the input data to the server.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const Edit = ({ logout }) => {

    /**
     * State
     * 
     */
    const [ invalidAdminCredentials, setInvalidAdminCredentials ] = useState(null);
    const [ invalidName, setInvalidName ] = useState(null);
    const [ invalidPassword, setInvalidPassword ] = useState(null);
    const [ invalidPasswordConfirm, setInvalidPasswordConfirm ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ showDialog, setShowDialog ] = useState(false);

    /**
     * Refs
     * 
     */
    const responseUpdate = useRef(false);
    const awaitUsersSelfUpdate = useRef(false);
    const isSubmittable = useRef(false);
    const isResettable = useRef(false);

    /**
     * Hooks
     * 
     */
    const { authError, setAuthError } = useAuth();

    const {
        
        fetchEdit,
        setUsersEdit,
        usersEdit,
        usersSelf
    } = useUsers();
    
    const {
        
        binding: bindName,
        clearValue: clearName,
        value: name
    } = useInputText(`${C.Label.NAME} ${C.Label.OPTIONAL}`, confirmHandler, usersSelf[C.Model.USER][C.Model.NAME]);
    
    const { 
        
        binding: bindPassword,
        clearValue: clearPassword,
        value: password
    } = useInputText(`${C.Label.PASSWORD} ${C.Label.OPTIONAL}`, confirmHandler);

    const { 
        
        binding: bindPasswordConfirm,
        clearValue: clearPasswordConfirm,
        value: passwordConfirm
    } = useInputText(`${C.Label.PASSWORD_CONFIRM} ${C.Label.OPTIONAL}`, confirmHandler);

    const {
        
        binding: bindAdminUsername,
        clearValue: clearAdminUsername,
        value: adminUsername
    } = useInputText(C.Label.ADMIN_USERNAME, confirmHandler);

    const {
        
        binding: bindAdminPassword,
        clearValue: clearAdminPassword,
        value: adminPassword
    } = useInputText(C.Label.ADMIN_PASSWORD, confirmHandler);

    /**
     * Set isSubmittable flag
     * Determines if the present state of text data is sufficient for submitting to the server.
     * 
     */
    isSubmittable.current = (

        (name && name !== usersSelf[C.Model.USER][C.Model.NAME]) ||
        (password && passwordConfirm) ||
        (adminUsername && adminPassword)
    );

    /**
     * Set isResettable flag
     * Determines if the present state of text data is sufficient for enabling the "Reset" button and clearing the form.
     * 
     */
    isResettable.current = (

        (name && name !== usersSelf[C.Model.USER][C.Model.NAME]) ||
        password ||
        passwordConfirm ||
        adminUsername ||
        adminPassword
    );

    /**
     * @description The "usersSelf" prop is updated after a successful edit.
     * An update to the "usersSelf" prop occurs after a new authentication token has been successfully set in Local Storage.  
     * Therefore, to avoid authentication errors while mounting other components, the user may only regain control of the UI when the modal Dialog component is unmounted.
     * 
     * @private
     * @function
     * 
     */
    useEffect(() => {

        if (awaitUsersSelfUpdate.current) {

            awaitUsersSelfUpdate.current = false;

            setIsLoading(false);
            setShowDialog(false);
        }
    }, [usersSelf]);

    /**
     * Edit success
     * Clear text input elements.
     * 
     */
    if (usersEdit && responseUpdate.current) {

        responseUpdate.current = false;
        
        resetHandler(false);
    }

    /**
     * Edit failure
     * Parse the error object to set the appropriate local error states.
     * 
     */
    if (authError && responseUpdate.current) {

        responseUpdate.current = false;
        awaitUsersSelfUpdate.current = false;

        setIsLoading(false);
        setShowDialog(false);

        if (Array.isArray(authError.error)) {
            
            authError.error.forEach((error) => {

                switch (error[C.ID.ERROR_PARAM]) {

                    case C.ID.NAME_NAME:
                        setInvalidName(error[C.ID.ERROR_MESSAGE]);

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

            setAuthError(null);
        }
        else {

            setTimeout(() => logout());
        }
    }

    /**
     * @description Posts the request body to the server.
     * Resets to the initial render by nullifying the "authError" and "usersEdit" states and clearing all local error states.
     * Function executes asynchronously to facilitate the local loading state.
     * 
     * @async
     * @function
     * @private
     *  
     */
    const submitHandler = async () => {

        if (isSubmittable.current) {

            setAuthError(null);
            setUsersEdit(null);

            setInvalidAdminCredentials(null);
            setInvalidName(null);
            setInvalidPassword(null);
            setInvalidPasswordConfirm(null);

            setIsLoading(true);

            responseUpdate.current = true;
            awaitUsersSelfUpdate.current = true;

            await fetchEdit(
                
                name,
                password,
                passwordConfirm,
                adminUsername,
                adminPassword
            );
        }
    };

    /**
     * @description Resets the "name", "password", "passwordConfirm", "adminUsername" and "adminPassword" text fields back to their default values.
     * This function is called either after clicking the "Reset" button or after data as been posted to the server.
     * Written as a function declaration in order to be hoisted and accessible to the code above.
     * 
     * @param {object|null} event - The event object. 
     * @private
     * @function
     * 
     */
    function resetHandler(event = null) {

        if (event) {
            
            clearName();
        }

        clearPassword();
        clearPasswordConfirm();
        clearAdminUsername();
        clearAdminPassword();

        setInvalidAdminCredentials(null);
    }

    /**
     * @description Displays the confirmation dialog.
     * Written as a function declaration in order to be hoisted and accessible to the custom hooks above.
     * 
     * @function
     * @private
     * 
     */
    function confirmHandler() {

        if (isSubmittable.current) {

            setShowDialog(true);
        }
    }

    /**
     * JSX markup
     * 
     */
    return (

        <>
            {showDialog &&
                <Dialog 
                    message={C.Label.CONFIRM_EDIT}
                    okCallback={submitHandler}
                    cancelCallback={() => setShowDialog(false)}
                    preloader={true}
                />
            }

            <div className={C.Style.EDIT}>
                <div className={C.Style.EDIT_NAME}>
                    <InputText
                        name={C.ID.NAME_NAME}
                        disabled={isLoading}
                        errorMessage={invalidName}
                        {...bindName}
                    />
                </div>

                <div className={C.Style.EDIT_PASSWORD}>
                    <InputPassword
                        name={C.ID.NAME_PASSWORD}
                        disabled={isLoading}
                        errorMessage={invalidPassword}
                        {...bindPassword}
                    />
                </div>

                <div className={C.Style.EDIT_PASSWORD_CONFIRM}>
                    <InputPassword
                        name={C.ID.NAME_PASSWORD_CONFIRM}
                        disabled={isLoading}
                        errorMessage={invalidPasswordConfirm}
                        {...bindPasswordConfirm}
                    />
                </div>

                {!usersSelf[C.Model.USER][C.Model.ADMIN] &&
                    <div className={C.Style.EDIT_ADMIN}>
                        <AdminCredentials
                            bindAdminUsername={bindAdminUsername}
                            bindAdminPassword={bindAdminPassword}
                            isLoading={isLoading}
                            errorMessage={invalidAdminCredentials}
                        />
                    </div>
                }
                
                <div className={C.Style.EDIT_BUTTONS_CONTAINER}>
                    <Button
                        style={C.Style.BUTTON_SUBMIT_EMPHASIS}
                        onClick={confirmHandler}
                        disabled={isLoading || !isSubmittable.current}
                    >
                        {C.Label.EDIT}
                    </Button>

                    <Button
                        style={C.Style.BUTTON_SUBMIT}
                        onClick={resetHandler}
                        disabled={isLoading || !isResettable.current}
                    >
                        {C.Label.RESET}
                    </Button>
                </div>
            </div>
        </>
    );
};

/**
 * Prop Types
 * 
 */
Edit.propTypes = {

    logout: PropTypes.func.isRequired
};

/**
 * Export module
 * 
 */
export default Edit;