/**
 * @description useInputText hook module
 * 
 * @requires constants
 * @requires react
 * @requires utilities
 * @public
 * @module
 * 
 */
import { setNativeValue } from "../support/utilities";
import { useRef, useState } from "react";
import * as C from "../support/constants";

/**
 * @description This hook provides access to the state of controlled text input elements. 
 * 
 * @param {string|null} placeholder - The placeholder value of the text input.
 * @param {function|null} keyPressEnterCallback - The function to call when the enter key is pressed while the text input has focus.
 * @param {string|null} defaultValue - The default value of the text input when both initialized and cleared.
 * @returns {
 * 
 *     binding: {
 *         
 *         onChange: function,
 *         onKeyPress: function,
 *         placeholder: string,
 *         value: string,
 *     },
 *     setValue: function,
 *     value: string,
 * }
 * @public
 * @function 
 * 
 */
const useInputText = (
    
        placeholder = null,
        keyPressEnterCallback = null,
        defaultValue = null
    ) => {

    /**
     * State
     * 
     */
    const [ value, setValue ] = useState(defaultValue || "");

    /**
     * Refs
     * 
     */
    const inputElement = useRef(null);

    /**
     * @description Called when the value of the text input element is changed.
     * 
     * @param {object} event - The event object
     * @private
     * @function
     *  
     */
    const onChangeHandler = (event) => {

        if (!inputElement.current) {

            inputElement.current = event.target;
        }

        setValue(event.target.value);
    };

    /**
     * @description Clears the value of the state.
     * 
     * @private
     * @function
     *  
     */
    const clearValue = () => {

        const value = defaultValue || "";

        setValue(value);

        if (inputElement.current) {

            setNativeValue(inputElement.current, value);
        }
    };

    /**
     * @description Called when a key is pressed while the text input element has focus.
     * 
     * @param {object} event - The event object
     * @private
     * @function
     *  
     */
    const onKeyPressHandler = (event) => {

        if (event.charCode === C.CharCode.ENTER) {

            if (keyPressEnterCallback) {

                keyPressEnterCallback();
            }
        }
    };

    /**
     * Hook access
     * 
     */
    return {

        binding: {
            
            onChange: onChangeHandler,
            onKeyPress: onKeyPressHandler,
            placeholder: placeholder,
            value,
        },
        clearValue,
        value,
    };
};

/**
 * Export module
 * 
 */
export default useInputText;