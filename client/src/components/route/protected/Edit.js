/**
 * @description Edit component
 * 
 * @requires Collapsible
 * @requires constants
 * @requires Dialog
 * @requires InputPassword
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
import Collapsible from "../../Collapsible";
import Dialog from "../../modal/Dialog";
import InputPassword from "../../InputPassword";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
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
    const isEditable = useRef(false);

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
    } = useInputText(null, confirmHandler);
    
    const { 
        
        binding: bindPassword,
        clearValue: clearPassword,
        value: password
    } = useInputText(null, confirmHandler);

    const { 
        
        binding: bindPasswordConfirm,
        clearValue: clearPasswordConfirm,
        value: passwordConfirm
    } = useInputText(null, confirmHandler);

    const {
        
        binding: bindAdminUsername,
        clearValue: clearAdminName,
        value: adminUsername
    } = useInputText(null, confirmHandler);

    const {
        
        binding: bindAdminPassword,
        clearValue: clearAdminPassword,
        value: adminPassword
    } = useInputText(null, confirmHandler);
    
    /**
     * Set isEditable flag
     * Determines if the present state of text field data is sufficient for submitting to the server.
     * 
     */
    isEditable.current = (
        
        name ||
        (password && passwordConfirm) ||
        adminUsername ||
        adminPassword
    );

    /**
     * Synchronize cleared passwords
     * Clears the passwordConfirm field when the password field has been cleared.
     * 
     */
    if (!password && passwordConfirm) {
        
        clearPasswordConfirm();
    }

    /**
     * Edit success
     * Clear text input elements.
     * 
     */
    if (usersEdit && responseUpdate.current) {

        responseUpdate.current = false;

        clearName();
        clearPassword();
        clearPasswordConfirm();
        clearAdminName();
        clearAdminPassword();
    }

    /**
     * Edit failure
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

        if (isEditable.current) {

            setShowDialog(false);

            setAuthError(null);
            setUsersEdit(null);

            setInvalidAdminCredentials(null);
            setInvalidName(null);
            setInvalidPassword(null);
            setInvalidPasswordConfirm(null);

            setIsLoading(true);

            responseUpdate.current = true;
            await fetchEdit(
                
                name,
                password,
                passwordConfirm,
                adminUsername,
                adminPassword
            );

            setIsLoading(false);
        }
    };

    /**
     * @description Displays the confirmation dialog.
     * Written as a function declaration in order to be hoisted and accessible to the custom hooks above.
     * 
     * @function
     * @private
     * 
     */
    function confirmHandler() {

        if (isEditable.current) {

            setShowDialog(true);
        }
    }

    /**
     * JSX markup
     * 
     */
    return (

        <div>
            {showDialog &&
                <Dialog 
                    message={C.Label.CONFIRM_EDIT}
                    okCallback={submitHandler}
                    cancelCallback={() => setShowDialog(false)}
                />
            }

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

            {!usersSelf.user.admin &&
                <Collapsible
                    title={C.Label.ADMIN_CREDENTIALS}
                    headerStyle={C.Style.COLLAPSIBLE_HEADER_SECTION}
                >
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
            }
            
            <button
                onClick={confirmHandler}
                disabled={isLoading || !isEditable.current}
            >
                {C.Label.EDIT.toUpperCase()}
            </button>

            {
                //TODO: Replace with style animation
                isLoading && <div>LOADING...</div>
            }
        </div>
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