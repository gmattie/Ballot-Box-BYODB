/**
 * @description AdminCredentials component
 * 
 * @requires Collapsible
 * @requires constants
 * @requires ErrorResponse
 * @requires InputPassword
 * @requires InputText
 * @requires prop-types
 * @requires react
 * @requires useInputText
 * @requires utilities
 * @public
 * @module
 * 
 */
import { concatClassNames } from "../support/utilities";
import * as C from "../support/constants";
import Collapsible from "./Collapsible";
import ErrorResponse from "./ErrorResponse";
import InputPassword from "./InputPassword";
import InputText from "./InputText";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

/**
 * @description The AdminCredentials component contains UI elements that are required to enter admin credentials.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const AdminCredentials = ({
    
        bindAdminUsername,
        bindAdminPassword,
        isLoading,
        errorMessage
    }) => {

    /**
     * Refs
     * 
     */
    const showErrorMessage = useRef(true);

    /**
     * @description Reset the "showErrorMessage" reference when the "errorMessage" prop is updated. 
     * 
     * @private
     * @function
     * 
     */
    useEffect(() => {

        showErrorMessage.current = true;
    }, [errorMessage]);
    
    /**
     * @description Callback for a dispatched "change" event for either the "adminUsername" or "adminPassword" HTMLInputElement.
     * Intercepts the target's "onChange" binding from its UseInputText hook.
     * 
     * @param {object} target - The object that dispatched the event.
     * @param {object} event - The event object.
     * 
     * @private
     * @function
     *  
     */
    const adminCredentialsChangeHandler = (target, event) => {

        if (showErrorMessage.current) {

            showErrorMessage.current = false;
        }

        target.onChange(event);
    };

    /**
     * JSX markup
     * 
     */
    return (

        <Collapsible
            title={`${C.Label.ADMIN_CREDENTIALS} ${C.Label.OPTIONAL}`}
            headerStyle={C.Style.COLLAPSIBLE_HEADER_SECTION}
        >
            <div className={C.Style.ADMIN_CREDENTIALS}>
                <div className={
                    concatClassNames(
                        C.Style.ADMIN_CREDENTIALS_ERROR,
                        (errorMessage && showErrorMessage.current && C.Style.ADMIN_CREDENTIALS_ERROR_SHOW)
                    )
                }>
                    {errorMessage &&
                        <ErrorResponse message={errorMessage} />
                    }
                </div>
                
                <div className={C.Style.ADMIN_CREDENTIALS_USERNAME}>
                    <InputText
                        name={C.ID.NAME_ADMIN_USERNAME}
                        disabled={isLoading}
                        {...bindAdminUsername}
                        onChange={adminCredentialsChangeHandler.bind(null, bindAdminUsername)}
                    />
                </div>

                <div className={C.Style.ADMIN_CREDENTIALS_PASSWORD}>
                    <InputPassword
                        name={C.ID.NAME_ADMIN_PASSWORD}
                        disabled={isLoading}
                        {...bindAdminPassword}
                        onChange={adminCredentialsChangeHandler.bind(null, bindAdminPassword)}
                    />
                </div>
            </div>
        </Collapsible>
    );
};

/**
 * Prop Types
 * 
 */
AdminCredentials.propTypes = {

    bindAdminUsername: PropTypes.object.isRequired,
    bindAdminPassword: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
};

/**
 * Export module
 * 
 */
export default AdminCredentials;