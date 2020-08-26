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
import { useEffect, useRef, useState } from "react";
import * as C from "../support/constants";

/**
 * @description This hook provides access to the state of controlled text input elements. 
 * 
 * @param {string|null} placeholder - The placeholder value of the text input.
 * @param {function|null} keyPressEnterCallback - The function to call when the enter key is pressed while the text input has focus.
 * @param {string|null} defaultValue - The default value of the text input when both initialized and cleared.
 * @param {object} externalState - An external state object that consists of a accessor value and a mutator function.
 * @param {string} externalState.value - The external state accessor value.
 * @param {function} externalState.setValue = The external state mutator function.
 * @returns {
 * 
 *     binding: {
 *         
 *         onChange: function,
 *         onKeyPress: function,
 *         placeholder: string,
 *         value: string,
 *     },
 *     clearValue: function,
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
        defaultValue = null,
        externalState = null,
    ) => {

    /**
     * State
     * 
     */
    let [ value, setValue ] = useState(defaultValue || "");

    if (externalState) {

        value = externalState.value || "";
        setValue = externalState.setValue;
    }

    /**
     * Refs
     * 
     */
    const inputElement = useRef(null);
    const isMounted = useRef(false);

    /**
     * @description Assigns the "defaultValue" parameter to the "externalState" value if both are supplied arguments.
     * This function is called only once after the components mounts for the first time.
     * 
     * @private
     * @function
     * 
     */
    useEffect(() => {

        if (!isMounted.current) {

            isMounted.current = true;

            if (externalState && !externalState.value && defaultValue) {

                setValue(defaultValue);
            }
        }
    }, [defaultValue, externalState]);

    /**
     * @description Handler for a dispatched "change" event.
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
     * @description Handler for a dispatched "keypress" event.
     * 
     * @param {object} event - The event object
     * @private
     * @function
     *  
     */
    const onKeyPressHandler = (event) => {

        if (event.key === C.Key.ENTER) {

            if (keyPressEnterCallback) {

                keyPressEnterCallback(event);
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
            placeholder,
            value,
        },
        clearValue,
        setValue,
        value,
    };
};

/**
 * Export module
 * 
 */
export default useInputText;