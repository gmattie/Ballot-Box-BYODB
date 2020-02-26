/**
 * @description InputPassword component.
 * 
 * @requires constants
 * @requires Eye.svg
 * @requires EyeSlash.svg
 * @requires InputText
 * @requires react
 * @requires prop-types
 * @public
 * @module
 * 
 */
import * as C from "../support/constants";
import Eye from "../assets/Eye.svg";
import EyeSlash from "../assets/EyeSlash.svg";
import InputText from "./InputText";
import React, { memo, useState } from "react";
import PropTypes from "prop-types";

/**
 * @description The InputPassword component extends the functionality of InputText component with an additional button for toggling between plain and obscured text.
 * Changing the type of the HTMLInputElement to either "text" or "password" will either reveal or obscure the value of the input respectively.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const InputPassword = ({
    
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
     * @function
     * @private
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
            <InputText
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

            <input 
                className={C.Style.INPUT_PASSWORD_BUTTON}
                type={C.HTMLElement.InputType.IMAGE}
                src={(isVisible)
                    ? Eye
                    : EyeSlash}
                alt={(isVisible)
                    ? C.Label.HIDE
                    : C.Label.SHOW}
                disabled={disabled}
                onClick={toggleInputTypeHandler}
                onMouseDown={buttonMouseDownHandler}
            />
        </div>
    );
};

/**
 * Prop Types
 * 
 */
InputPassword.propTypes = {

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
export default memo(InputPassword);