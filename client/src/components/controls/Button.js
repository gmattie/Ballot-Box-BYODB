/**
 * @description Button component.
 * 
 * @requires constants
 * @requires prop-types
 * @requires react
 * @public
 * @module
 * 
 */
import * as C from "../../support/constants";
import PropTypes from "prop-types";
import React from "react";

/**
 * @description The Button component extends an HTMLButtonElement.
 * The base style of the component is augmented by either the "submit" or "submit-emphasis" styles.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const Button = ({
    
        style,
        onClick,
        disabled,
        children,
    }) => {

    /**
     * JSX markup
     * 
     */
    return (

        <button
            className={`${C.Style.BUTTON} ${style}`}
            disabled={disabled || false}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

/**
 * Prop Types
 * 
 */
Button.propTypes = {

    style: PropTypes.oneOf([

        C.Style.BUTTON_NAVIGATION_SELECTED,
        C.Style.BUTTON_NAVIGATION,
        C.Style.BUTTON_SUBMIT_EMPHASIS,
        C.Style.BUTTON_SUBMIT, 
    ]).isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    children: PropTypes.any.isRequired
};

/**
 * Export module
 * 
 */
export default Button;