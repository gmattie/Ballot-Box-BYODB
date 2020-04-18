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
 * @public
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
 * @public
 * @function
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
 * @description Postpones executing a callback function by a specified time until all the callback's events, occurring in rapid succession, have ended.
 * 
 * @param {number} delay - The time in milliseconds to postpone the callback.
 * @param {Function} callback - The event's callback function.
 * @return {Function} 
 * @public
 * @function
 * 
 * @example
 * 
 * const resizeHandler = (event) => console.log(event);
 * window.addEventListener("resize", debounce(200, resizeHandler));
 * 
 */
const debounce = (delay, callback) => { 

    let timer;

    return (...args) => {

        if (timer) {

            clearTimeout(timer);
        }

        timer = setTimeout(() => {

            callback(...args);
            timer = null;
        }, delay);
    };
};

/**
 * @description Checks if the deployment target is a mobile device.
 * Additional info: https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
 * 
 * @public
 * @function
 * 
 */
const isMobileDevice = () => /Mobi/i.test(window.navigator.userAgent);

/**
 * Export module
 * 
 */
module.exports = {

    concatClassNames,
    setNativeValue,
    debounce,
    isMobileDevice
};
