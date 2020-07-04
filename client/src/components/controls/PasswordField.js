/**
 * @description PasswordField component.
 * 
 * @requires constants
 * @requires Eye
 * @requires EyeSlash
 * @requires prop-types
 * @requires react
 * @requires TextField
 * @public
 * @module
 * 
 */
import * as C from "../../support/constants";
import Eye from "../../icons/Eye";
import EyeSlash from "../../icons/EyeSlash";
import TextField from "./TextField";
import React, { memo, useState } from "react";
import PropTypes from "prop-types";

/**
 * @description The PasswordField component extends the functionality of the TextField component with an additional button for toggling between plain and obscured text.
 * Changing the type of the HTMLInputElement to either "text" or "password" will either reveal or obscure the value of the input respectively.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const PasswordField = ({
    
        placeholder,
        errorMessage,
        value,
        disabled,
        onChange,
        onKeyPress,
    }) => {

    /**
     * State
     * 
     */
    const [ isVisible, setIsVisible ] = useState(false);

    /**
     * @description Handler for a dispatched "click" event that toggles the "isVisible" state.
     * Toggling the state changes the type of the HTMLInputElement to either "text" or "password".
     * 
     * @private
     * @function
     *  
     */
    const toggleInputTypeHandler = () => {

        setIsVisible(!isVisible);
    };

    /**
     * @description Handler for a dispatched "mousedown" event.
     * Preventing default behavior on the button ensures that it will not intercept focus from the input element.
     * 
     * @param {object} event - The event object.
     * @private
     * @function
     * 
     */
    const buttonMouseDownHandler = (event) => {

        event.preventDefault();
    };

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.INPUT_PASSWORD}>
            <TextField
                type={(isVisible)
                    ? C.HTMLElement.InputType.TEXT
                    : C.HTMLElement.InputType.PASSWORD}
                placeholder={placeholder}
                errorMessage={errorMessage}
                value={value}
                disabled={disabled}
                onChange={onChange}
                onKeyPress={onKeyPress}
            />

            <button 
                className={C.Style.INPUT_PASSWORD_BUTTON}
                disabled={disabled}
                onClick={toggleInputTypeHandler}
                onMouseDown={buttonMouseDownHandler}
            >
                {(isVisible)
                    ?   <Eye />
                    :   <EyeSlash />
                }
            </button>
        </div>
    );
};

/**
 * Prop Types
 * 
 */
PasswordField.propTypes = {

    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onKeyPress: PropTypes.func,
};

/**
 * Export module
 * 
 */
export default memo(PasswordField);