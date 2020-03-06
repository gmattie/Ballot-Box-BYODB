/**
 * @description Confirmation component
 * 
 * @requires constants
 * @requires prop-types
 * @requires react
 * @public
 * @module
 * 
 */
import * as C from "../../../support/constants";
import React from "react";
import PropTypes from "prop-types";

/**
 * @description The Confirmation component displays a message after a user submits a request to either register or reset their password.
 * The message instructs the user to refer to a sent email in order to validate the request and complete the task. 
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const Confirmation = ({ 
    
        email,
        message
    }) => {

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.CONFIRMATION}>
            <p>{C.Label.EMAIL_SENT}</p>

            <p className={C.Style.CONFIRMATION_EMAIL}>
                {email}
            </p>

            <p>{C.Label.EMAIL_REFER} {message}</p>
        </div>
    );
};

/**
 * Prop Types
 * 
 */
Confirmation.propTypes = {

    email: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};

/**
 * Export module
 * 
 */
export default Confirmation;