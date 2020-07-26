/**
 * @description AdminCredentials component
 * 
 * @requires Collapsible
 * @requires constants
 * @requires ErrorResponse
 * @requires PasswordField
 * @requires prop-types
 * @requires react
 * @requires TextField
 * @requires useInputText
 * @requires usePersist
 * @requires utilities
 * @public
 * @module
 * 
 */
import { concatClassNames } from "../../../../support/utilities";
import * as C from "../../../../support/constants";
import Collapsible from "../../../controls/Collapsible";
import ErrorResponse from "../../../ErrorResponse";
import PasswordField from "../../../controls/PasswordField";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import TextField from "../../../controls/TextField";
import usePersist from "../../../../hooks/usePersist";

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
     * Hooks
     * 
     */
    const {
        
        persistCollapsedAdminCredentials: collapsed,
        setPersistCollapsedAdminCredentials: setCollapsed
    } = usePersist();

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
            title={C.Label.ADMIN_CREDENTIALS}
            eventHandler={collapsibleHandler}
            collapsed={collapsed}
        >
            <div className={C.Style.ADMIN_CREDENTIALS}>
                <div
                    className={
                        concatClassNames(
                            C.Style.ADMIN_CREDENTIALS_ERROR,
                            (errorMessage && showErrorMessage.current && C.Style.ADMIN_CREDENTIALS_ERROR_SHOW)
                        )
                    }
                >
                    {errorMessage &&
                        <ErrorResponse message={errorMessage} />
                    }
                </div>
                
                <div className={C.Style.ADMIN_CREDENTIALS_USERNAME}>
                    <TextField
                        name={C.ID.NAME_ADMIN_USERNAME}
                        disabled={isLoading}
                        {...bindAdminUsername}
                        onChange={adminCredentialsChangeHandler.bind(null, bindAdminUsername)}
                    />
                </div>

                <div className={C.Style.ADMIN_CREDENTIALS_PASSWORD}>
                    <PasswordField
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