/**
 * @description Edit component
 * 
 * @requires AdminCredentials
 * @requires Button
 * @requires constants
 * @requires Dialog
 * @requires PasswordField
 * @requires ProtectedContainer
 * @requires react
 * @requires TextField
 * @requires useAuth
 * @requires useInputText
 * @requires useUsers
 * @public
 * @module
 * 
 */
import { LogoutAPI } from "../ProtectedContainer";
import * as C from "../../../../support/constants";
import AdminCredentials from "./AdminCredentials";
import Button from "../../../controls/Button";
import Dialog from "../../../modal/Dialog";
import PasswordField from "../../../controls/PasswordField";
import React, { useContext, useRef, useEffect, useState } from "react";
import TextField from "../../../controls/TextField";
import useAuth from "../../../../hooks/useAuth";
import useInputText from "../../../../hooks/useInputText";
import useUsers from "../../../../hooks/useUsers";

/**
 * @description The Edit component contains UI elements that are required to edit a User document.
 * The UI elements include text input fields for editing a user's name, password and admin credentials and a button for submitting the input data to the server.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const Edit = () => {

    /**
     * Context
     * 
     */
    const logout = useContext(LogoutAPI);

    /**
     * State
     * 
     */
    const [ invalidAdminCredentials, setInvalidAdminCredentials ] = useState(null);
    const [ invalidAvatar, setInvalidAvatar ] = useState(null);
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
    } = useInputText(
        
        C.Label.NAME,
        confirmHandler,
        usersSelf[C.Model.USER][C.Model.NAME]
    );

    const {

        binding: bindAvatar,
        clearValue: clearAvatar,
        value: avatar
    } = useInputText(
        
        `${C.Label.AVATAR} ${C.Label.URL} ${C.Label.OPTIONAL}`,
        confirmHandler,
        usersSelf[C.Model.USER][C.Model.AVATAR]
    );
    
    const { 
        
        binding: bindPassword,
        clearValue: clearPassword,
        value: password
    } = useInputText(`${C.Label.NEW} ${C.Label.PASSWORD} ${C.Label.OPTIONAL}`, confirmHandler);

    const { 
        
        binding: bindPasswordConfirm,
        clearValue: clearPasswordConfirm,
        value: passwordConfirm
    } = useInputText(`${C.Label.CONFIRM} ${C.Label.NEW} ${C.Label.PASSWORD} ${C.Label.OPTIONAL}`, confirmHandler);

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

        (name &&
            (
                name !== usersSelf[C.Model.USER][C.Model.NAME] ||
                avatar !== usersSelf[C.Model.USER][C.Model.AVATAR] ||
                (password && passwordConfirm) ||
                (adminUsername && adminPassword)
            )
        )
    );

    /**
     * Set isResettable flag
     * Determines if the present state of text data is sufficient for enabling the "Reset" button and clearing the form.
     * 
     */
    isResettable.current = (

        (name !== usersSelf[C.Model.USER][C.Model.NAME]) ||
        (avatar !== usersSelf[C.Model.USER][C.Model.AVATAR]) ||
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

                const errorMessage = error[C.Error.ERROR_MESSAGE];

                switch (error[C.Error.ERROR_PARAM]) {

                    case C.ID.NAME_NAME:
                        setInvalidName(errorMessage);

                        break;

                    case C.ID.NAME_AVATAR:
                        setInvalidAvatar(errorMessage);

                        break;

                    case C.ID.NAME_PASSWORD:
                        setInvalidPassword(errorMessage);

                        break;

                    case C.ID.NAME_PASSWORD_CONFIRM:
                        setInvalidPasswordConfirm(errorMessage);

                        break;

                    case C.ID.NAME_ADMIN_USERNAME:
                    case C.ID.NAME_ADMIN_PASSWORD:
                        setInvalidAdminCredentials(errorMessage);

                        break;

                    default:
                        throw new Error(errorMessage);
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

            setInvalidName(null);
            setInvalidAvatar(null);
            setInvalidPassword(null);
            setInvalidPasswordConfirm(null);
            setInvalidAdminCredentials(null);

            setIsLoading(true);

            responseUpdate.current = true;
            awaitUsersSelfUpdate.current = true;

            await fetchEdit(
                
                (name !== usersSelf[C.Model.USER][C.Model.NAME])
                    ? name
                    : undefined,
                (avatar !== usersSelf[C.Model.USER][C.Model.AVATAR])
                    ? avatar
                    : undefined,
                (password)
                    ? password
                    : undefined,
                (passwordConfirm)
                    ? passwordConfirm
                    : undefined,
                (adminUsername)
                    ? adminUsername
                    : undefined,
                (adminPassword)
                    ? adminPassword
                    : undefined
            );
        }
    };

    /**
     * @description Resets the "name", "avatar", "password", "passwordConfirm", "adminUsername" and "adminPassword" text fields back to their default values.
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
            clearAvatar();
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
                    content={C.Label.CONFIRM_EDIT}
                    okCallback={submitHandler}
                    cancelCallback={() => setShowDialog(false)}
                    preloader={true}
                />
            }

            <div className={C.Style.EDIT}>
                <div className={C.Style.EDIT_NAME}>
                    <TextField
                        name={C.ID.NAME_NAME}
                        disabled={isLoading}
                        errorMessage={invalidName}
                        {...bindName}
                    />
                </div>

                <div className={C.Style.EDIT_AVATAR}>
                    <TextField
                        name={C.ID.NAME_AVATAR}
                        disabled={isLoading}
                        errorMessage={invalidAvatar}
                        {...bindAvatar}
                    />
                </div>

                <div className={C.Style.EDIT_PASSWORD}>
                    <PasswordField
                        name={C.ID.NAME_PASSWORD}
                        disabled={isLoading}
                        errorMessage={invalidPassword}
                        {...bindPassword}
                    />
                </div>

                <div className={C.Style.EDIT_PASSWORD_CONFIRM}>
                    <PasswordField
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
                
                <div className={C.Style.EDIT_BUTTONS}>
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
 * Export module
 * 
 */
export default Edit;