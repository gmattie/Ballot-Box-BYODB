/**
 * @description InputPassword component.
 * 
 * @requires constants
 * @requires react
 * @public
 * @module
 * 
 */
import React, { useState } from "react";
import * as C from "../support/constants";

/**
 * @description The InputPassword component extends an HTMLInputElement of toggleable types.
 * Changing the type of the HTMLInputElement to either "text" or "password" will either show and hide the value of the text field respectively.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const InputPassword = (props) => {

    /**
     * State
     * 
     */
    const [ isVisible, setIsVisible ] = useState(false);

    /**
     * @description Handler for a dispatched "click" event that toggles the "isVisible" state.
     * Toggling the state changes both the type of the HTMLInputElement as well as the style of the event target.
     * 
     * @function
     * @private
     *  
     */
    const toggleInputTypeHandler = () => {

        setIsVisible(!isVisible);
    };

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.INPUT_PASSWORD}>
            <input
                type={(isVisible)
                    ? C.HTMLElement.InputType.TEXT
                    : C.HTMLElement.InputType.PASSWORD}
                {...props}
            />
            <span 
                className={(isVisible)
                    ? C.Style.INPUT_PASSWORD_HIDE
                    : C.Style.INPUT_PASSWORD_SHOW}
                onClick={toggleInputTypeHandler}>
            </span>
        </div>
    );
};

/**
 * Export module
 * 
 */
export default InputPassword;