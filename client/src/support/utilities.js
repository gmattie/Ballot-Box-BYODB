/* eslint-disable no-console */

/**
 * @description Common and reusable functions 
 * 
 * @requires react-dom/server
 * 
 * @public
 * @module
 * 
 */
import ReactDOMServer from "react-dom/server";

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
 * @description Postpones executing a callback function by a specified time until all the callback's events, occurring in rapid succession, have ended.
 * 
 * @param {number} delay - The time in milliseconds to postpone the callback.
 * @param {function} callback - The event's callback function.
 * @returns {function} 
 * @public
 * @function
 * 
 * @example
 * 
 *      const resizeHandler = (event) => console.log(event);
 *      window.addEventListener("resize", debounce(200, resizeHandler));
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
 * @description Simulates a double-click event that is determined by two clicks occurring within the standard time of 500 milliseconds.
 * 
 * @param {function} callback - The event's callback function.
 * @returns {function} 
 * @public
 * @function
 * 
 * @example
 * 
 *      const clickHandler = (event) => console.log(event);
 *      button.addEventListener("click", doubleClickHandler(clickHandler));
 * 
 */
const doubleClick = (callback) => {

    let previousClick;
  
    return (...args) => {
  
        const currentClick = Date.now();
    
            if (currentClick - previousClick < 500) {

                callback(...args);
            }
            else {
    
                previousClick = currentClick;
            }
    };
};

/**
 * @description Synchronously retrieve the width and/or heigh of a React element without visibly rendering and committing the element to the DOM.
 * 
 * @param {object} elementJSX - The target React element written in JSX.
 * @returns {object} 
 * @public
 * @function
 * 
 * @example
 * 
 *      const { width, height } = getReactElementSize( <div style={{ width: "20px", height: "40px" }} ...props /> );
 *      console.log(`W: ${width}, H: ${height});  // W: 20, H: 40
 * 
 */
const getReactElementSize = (elementJSX) => {

    const elementString = ReactDOMServer.renderToStaticMarkup(elementJSX);
    const elementDocument = new DOMParser().parseFromString(elementString, "text/html");
    const elementNode = elementDocument.getRootNode().body.firstChild;

    const container = document.createElement("div");
    const containerStyle = {

        display: "block",
        position: "absolute",
        boxSizing: "border-box",
        margin: "0",
        padding: "0",
        whiteSpace: "nowrap",
        visibility: "hidden"
    };

    Object.assign(container.style, containerStyle);

    container.appendChild(elementNode);
    document.body.appendChild(container);

    const width = container.clientWidth;
    const height = container.clientHeight;

    container.removeChild(elementNode);
    document.body.removeChild(container);

    return {
        
        width,
        height
    };
};

/**
 * @description Checks if the deployment target is a mobile device.
 * Additional info: https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
 * 
 * @returns {boolean} 
 * @public
 * @function
 * 
 */
const isMobileDevice = () => /Mobi/i.test(window.navigator.userAgent);

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

/*
 * @description Suppresses specific messages from being logged in the Console.
 * 
 * @param {string} message - The target message to suppress, either full text, partial text or a regular expression pattern and case-insensitive.
 * @param {string} method - The Console method of the message to suppress, including "error", "info", "log" and "warn". 
 * @public
 * @function
 * 
 * @example
 * 
 *      suppressConsoleMessage("overeager alarm system", "error");
 * 
 *      console.error("An alarm system for a nuclear power plant")  // <-- Logged
 *      console.error("An overeager alarm system for React")        // <-- Not Logged
 *      console.log("An overeager alarm system for React")          // <-- Logged
 * 
 */
const suppressConsoleMessage = (message, method) => {

    const nativeConsoleMethod = console[method];

    console[method] = (nativeMessage) => {

        if (!RegExp(message, "gi").test(nativeMessage)) {

            nativeConsoleMethod(nativeMessage);
        }
    };
};

/**
 * Export module
 * 
 */
export {

    concatClassNames,
    debounce,
    doubleClick,
    getReactElementSize,
    isMobileDevice,
    setNativeValue,
    suppressConsoleMessage
};