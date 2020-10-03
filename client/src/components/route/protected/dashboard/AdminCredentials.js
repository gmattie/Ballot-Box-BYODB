/**
 * @description AdminCredentials component
 * 
 * @requires Button
 * @requires Collapsible
 * @requires constants
 * @requires ErrorResponse
 * @requires Dialog
 * @requires PasswordField
 * @requires ProtectedContainer;
 * @requires react
 * @requires TextField
 * @requires useAuth
 * @requires useInputText
 * @requires usePersist
 * @requires useUsers
 * @requires utilities
 * @public
 * @module
 * 
 */
import { concatClassNames } from "../../../../support/utilities";
import { LogoutAPI } from "../ProtectedContainer";
import * as C from "../../../../support/constants";
import Button from "../../../controls/Button";
import Collapsible from "../../../controls/Collapsible";
import Dialog from "../../../modal/Dialog";
import ErrorResponse from "../../../ErrorResponse";
import PasswordField from "../../../controls/PasswordField";
import React, { useContext, useEffect, useRef, useState } from "react";
import TextField from "../../../controls/TextField";
import useAuth from "../../../../hooks/useAuth";
import useInputText from "../../../../hooks/useInputText";
import usePersist from "../../../../hooks/usePersist";
import useUsers from "../../../../hooks/useUsers";

/**
 * @description The AdminCredentials component contains UI elements that are required to enter admin credentials.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const AdminCredentials = () => {

    /**
     * Context
     * 
     */
    const logout = useContext(LogoutAPI);

    /**
     * State
     * 
     */
    const [ dialogPreloaderComplete, setDialogPreloaderComplete ] = useState(false);
    const [ invalidAdminCredentials, setInvalidAdminCredentials ] = useState(null);
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
        
        persistCollapsedAdminCredentials: collapsed,
        setPersistCollapsedAdminCredentials: setCollapsed
    } = usePersist();

    const {
        
        fetchEdit,
        setUsersEdit,
        usersEdit,
        usersSelf
    } = useUsers();

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
    isSubmittable.current = (bindAdminUsername.value && bindAdminPassword.value);

    /**
     * Set isResettable flag
     * Determines if the present state of text data is sufficient for enabling the "Reset" button and clearing the form.
     * 
     */
    isResettable.current = (bindAdminUsername.value || bindAdminPassword.value);

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

            setDialogPreloaderComplete(true);
        }
    }, [usersSelf]);
    
    /**
     * Authenticate admin success
     * Clear text input elements.
     * 
     */
    if (usersEdit && responseUpdate.current) {

        responseUpdate.current = false;
        
        resetHandler();
    }

    /**
     * Authenticate admin failure
     * Parse the error object to set the appropriate local error states.
     * 
     */
    if (authError && responseUpdate.current) {

        responseUpdate.current = false;
        awaitUsersSelfUpdate.current = false;

        setShowDialog(false);

        if (Array.isArray(authError.error)) {
            
            authError.error.forEach((error) => {

                const errorMessage = error[C.Error.ERROR_MESSAGE];

                switch (error[C.Error.ERROR_PARAM]) {

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

            setInvalidAdminCredentials(null);

            responseUpdate.current = true;
            awaitUsersSelfUpdate.current = true;

            await fetchEdit(
                
                undefined,
                undefined,
                undefined,
                undefined,
                adminUsername,
                adminPassword
            );
        }
    };

    /**
     * @description Resets the "adminUsername" and "adminPassword" text fields back to their default values.
     * This function is called either after clicking the "Reset" button or after data as been posted to the server.
     * Written as a function declaration in order to be hoisted and accessible to the code above.
     * 
     * @private
     * @function
     * 
     */
    function resetHandler() {

        clearAdminUsername();
        clearAdminPassword();
    }

    /**
     * @description Displays the Dialog component.
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
     * @description Handler for a dispatched "click" event on the Cancel button.
     * 
     * @function
     * @private
     *  
     */
    const cancelHandler = () => {

        setShowDialog(false);
        setDialogPreloaderComplete(false);
    };

    /**
     * @description Callback executed when the "collapsed" state of the Collapsible component is updated.
     * 
     * @param {boolean} collapsed - the "collapsed" state of the Collapsible component.
     * @private
     * @function
     *  
     */
    const collapsibleHandler = (collapsed) => {

        setCollapsed(collapsed);
    };

    /**
     * @description Callback for a dispatched "change" event for either the "adminUsername" or "adminPassword" HTMLInputElement.
     * Intercepts the target's "onChange" binding from its UseInputText hook.
     * 
     * @param {object} target - The object that dispatched the event.
     * @param {object} event - The event object.
     * @private
     * @function
     *  
     */
    const adminCredentialsChangeHandler = (target, event) => {

        if (invalidAdminCredentials) {

            setInvalidAdminCredentials(null);
        }

        target.onChange(event);
    };

    /**
     * JSX markup
     * 
     */
    return (

        <>
            {showDialog &&
                <Dialog 
                    content={C.Label.CONFIRM_ADMIN}
                    okCallback={submitHandler}
                    cancelCallback={cancelHandler}
                    dismountCallback={cancelHandler}
                    preloader={{ [C.Event.COMPLETE]: dialogPreloaderComplete }}
                />
            }

            <Collapsible
                title={C.Label.ADMIN_CREDENTIALS}
                eventHandler={collapsibleHandler}
                collapsed={collapsed}
            >
                <div className={C.Style.ADMIN_CREDENTIALS}>
                    <div
                        className={
                            concatClassNames(
                                C.Style.ADMIN_CREDENTIALS_ERROR,
                                (invalidAdminCredentials && C.Style.ADMIN_CREDENTIALS_ERROR_SHOW)
                            )
                        }
                    >
                        {invalidAdminCredentials &&
                            <ErrorResponse message={invalidAdminCredentials} />
                        }
                    </div>
                    
                    <div className={C.Style.ADMIN_CREDENTIALS_USERNAME}>
                        <TextField
                            name={C.ID.NAME_ADMIN_USERNAME}
                            {...bindAdminUsername}
                            onChange={adminCredentialsChangeHandler.bind(null, bindAdminUsername)}
                        />
                    </div>

                    <div className={C.Style.ADMIN_CREDENTIALS_PASSWORD}>
                        <PasswordField
                            name={C.ID.NAME_ADMIN_PASSWORD}
                            {...bindAdminPassword}
                            onChange={adminCredentialsChangeHandler.bind(null, bindAdminPassword)}
                        />
                    </div>

                    <div className={C.Style.ADMIN_CREDENTIALS_BUTTONS}>
                        <Button
                            style={C.Style.BUTTON_SUBMIT_EMPHASIS}
                            onClick={confirmHandler}
                            disabled={!isSubmittable.current}
                        >
                            {C.Label.AUTHENTICATE}
                        </Button>

                        <Button
                            style={C.Style.BUTTON_SUBMIT}
                            onClick={resetHandler}
                            disabled={!isResettable.current}
                        >
                            {C.Label.RESET}
                        </Button>
                    </div>
                </div>
            </Collapsible>
        </>
    );
};

/**
 * Export module
 * 
 */
export default AdminCredentials;