/**
 * @description Common and reusable functions 
 * 
 * @public
 * @module
 * 
 */

/**
 * @description Concatenates and returns a string of non-null class names.
 * 
 * @param  {...string|null} classNames - The strings to be concatenated.
 * @private
 * @function
 * 
 */
const concatClassNames = (...classNames) => {
    
    return classNames
        .filter((className) => className)
        .join(" ");
};

/**
 * @description Sets a value and dispatches an event for HTMLElement objects with value setters.
 * For performance reasons React does not dispatch onChange or onInput events when a value of an HTMLElement is updated by state.
 * Therefore, the primary use case for this function is to dispatch the element's onChange or onInput event when its value is updated by state. 
 * 
 * @param {object} element - The HTMLElement with a value setter.
 * @param {string} value - The value assigned to the element.
 * 
 */
const setNativeValue = (element, value) => {

    const { set: valueSetter } = Object.getOwnPropertyDescriptor(element, "value") || {};
    const prototype = Object.getPrototypeOf(element);
    const { set: prototypeValueSetter } = Object.getOwnPropertyDescriptor(prototype, "value") || {};

    if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {

        prototypeValueSetter.call(element, value);
    }
    else if (valueSetter) {

        valueSetter.call(element, value);
    }

    setTimeout(() => element.dispatchEvent(new Event("input", { bubbles: true })));
};

/**
 * Export module
 * 
 */
module.exports = {

    concatClassNames,
    setNativeValue
};
