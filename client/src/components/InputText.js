/**
 * @description InputText component.
 * 
 * @requires constants
 * @requires ErrorResponse
 * @requires prop-types
 * @requires react
 * @requires utilities
 * @public
 * @module
 * 
 */
import { concatClassNames } from "../support/utilities";
import * as C from "../support/constants";
import ErrorResponse from "../components/ErrorResponse";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

/**
 * @description The InputText component extends an HTMLInputElement of type "text".
 * The component features resize and placeholder animations on "focus" and "blur" events
 * and optionally displays an error message from an HTTP request.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const InputText = ({
    
        type,
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
    const [ isFocused, setIsFocused ] = useState(false);
    const [ showErrorMessage, setShowErrorMessage ] = useState(true);

    /**
     * @description Called when the value of the text input element is changed.
     * 
     * @param {object} event - The event object
     * @private
     * @function
     *  
     */
    const inputChangeHandler = (event) => {

        if (showErrorMessage && errorMessage) {

            setShowErrorMessage(false);
        }
        
        onChange(event);
    };

    /**
     * @description Resets the state of "showErrorMessage" when a new "errorMessage" prop is received.
     * 
     * @private
     * @function
     * 
     */
    useEffect(() => {

        setShowErrorMessage(true);
    }, [errorMessage]);

    /**
     * @description Conditionally determines additional component styling.
     * 
     * @private
     * @constant
     * 
     */
    const maximize = (

        isFocused ||
        value ||
        (errorMessage && showErrorMessage)
    );

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.INPUT_TEXT}>
            <input
                className={
                    concatClassNames(
                        C.Style.INPUT_TEXT_INPUT,
                        (maximize && C.Style.INPUT_TEXT_INPUT_MAXIMIZE)
                    )
                }
                type={type || C.HTMLElement.InputType.TEXT}
                value={value}
                disabled={disabled}
                onChange={inputChangeHandler}
                onKeyPress={onKeyPress}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            
            <div
                className={
                    concatClassNames(
                        C.Style.INPUT_TEXT_PLACEHOLDER,
                        (maximize && C.Style.INPUT_TEXT_PLACEHOLDER_MAXIMIZE)
                    )
                }
            >
                {placeholder}
            </div>

            <div
                className={
                    concatClassNames(
                        C.Style.INPUT_TEXT_ERROR,
                        (errorMessage && showErrorMessage && C.Style.INPUT_TEXT_ERROR_SHOW)
                    )
                }
            >
                {errorMessage && <ErrorResponse message={errorMessage} />}
            </div>
        </div>
    );
};

/**
 * Prop Types
 * 
 */
InputText.propTypes = {

    type: PropTypes.oneOf([

        C.HTMLElement.InputType.TEXT,
        C.HTMLElement.InputType.PASSWORD
    ]),
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
export default InputText;