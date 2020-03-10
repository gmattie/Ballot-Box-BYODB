/**
 * @description Toggle component.
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
 * @description The Toggle component extends an HTMLInputElement of type "checkbox" with an HTMLLabelElement.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const Toggle = ({
    
        label,
        checked,
        disabled,
        onChange,
    }) => {

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.TOGGLE}>
            <input
                className={C.Style.TOGGLE_INPUT}
                type={C.HTMLElement.InputType.CHECKBOX}
                id={label}
                checked={checked}
                disabled={disabled}
                onChange={onChange}
            />

            <label
                className={C.Style.TOGGLE_LABEL}
                htmlFor={label}
            >
                {label}
            </label>
        </div>
    );
};

/**
 * Prop Types
 * 
 */
Toggle.propTypes = {

    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
};

/**
 * Export module
 * 
 */
export default Toggle;