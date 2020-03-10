/**
 * @description Radio component.
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
 * @description The Radio component extends an HTMLInputElement of type "radio" with an HTMLLabelElement.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const Radio = ({
    
        label,
        name,
        checked,
        disabled,
        onChange,
    }) => {

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.RADIO}>
            <input
                type={C.HTMLElement.InputType.RADIO}
                id={label}
                name={name}
                checked={checked}
                disabled={disabled}
                onChange={onChange}
            />

            <label htmlFor={label}>
                {label}
            </label>
        </div>
    );
};

/**
 * Prop Types
 * 
 */
Radio.propTypes = {

    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
};

/**
 * Export module
 * 
 */
export default Radio;