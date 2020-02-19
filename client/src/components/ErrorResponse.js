/**
 * @description ErrorResponse component.
 * 
 * @requires constants
 * @requires prop-types
 * @requires react
 * @requires TimesCircle.svg
 * @public
 * @module
 * 
 */
import * as C from "../support/constants";
import PropTypes from "prop-types";
import React, { memo } from "react";
import ExclamationCircle from "../assets/ExclamationCircle.svg";

/**
 * @description The ErrorResponse component displays an error from an HTTP request.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const ErrorResponse = ({ message }) => {

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.ERROR_RESPONSE}>
            <img
                className={C.Style.ERROR_RESPONSE_ICON}
                src={ExclamationCircle}
                alt={C.Label.ERROR}
            />

            <span className={C.Style.ERROR_RESPONSE_TEXT}>
                {message}
            </span>
        </div>
    );
};

/**
 * Prop Types
 * 
 */
ErrorResponse.propTypes = {

    message: PropTypes.string.isRequired
};

/**
 * Export module
 * 
 */
export default memo(ErrorResponse);