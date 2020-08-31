/**
 * @description Portal component.
 * 
 * @requires constants
 * @requires prop-types
 * @requires react
 * @requires react-dom
 * @public
 * @module
 * 
 */
import { useRef } from "react";
import * as C from "../../support/constants";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import useMount from "../../hooks/useMount";

/**
 * @description Renders children in a separate DOM node outside of the application root DOM node.
 * Portal DOM nodes that are not predefined in the public index.html file with a matching "elementID" prop will be created and appended as the last element sibling of the application root DOM node.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} The portal rendered to the DOM.
 * @public
 * @function
 * 
 */
const Portal = ({
    
        elementID,
        okCallback,
        closeCallback,
        children
    }) => {

    /**
     * Refs
     * 
     */
    const root = useRef();
    const container = useRef(document.createElement(C.HTMLElement.DIV));

    /**
     * Hooks
     * 
     */
     const { onMount } = useMount();

    /**
     * @description Handler for a dispatched "keydown" event.
     * The Enter key calls the okCallback handler while the Escape key calls the closeCallback handler.
     * While there may exist several Portal component node siblings in the DOM at once, this callback only executes on the last sibling.
     * 
     * @param {object} event - The event object.
     * @private
     * @function
     * 
     */
    const keyDownHandler = (event) => {

        if (!root.current.nextElementSibling) {

            event.stopPropagation();
            event.preventDefault();

            if (event.key === C.Key.ENTER) {

                okCallback();
            }
            else if (event.key === C.Key.ESCAPE) {

                closeCallback();
            }
        }
    };

    /**
     * @description Handler for a dispatched "popstate" event.
     * Clicking the browser's back button calls the closeCallback handler.
     * While there may exist several Portal component node siblings in the DOM at once, this callback only executes on the last sibling. 
     * 
     * @param {object} event - The event object.
     * @private
     * @function
     * 
     */
    const popStateHandler = (event) => {

        if (!root.current.nextElementSibling) {

            closeCallback();
        }
     };

    /**
     * @description Creates an element containing children to be appended to the DOM as a React Portal.
     * Creating new history states on both mount and dismount and listening for a "popstate" event facilitates closing modal windows via the browser's back button. 
     * Listening for a "keydown" event facilitates both affirmative and dismissive actions on modal windows via pressing the Enter and Escape keys, respectively.
     * 
     * @returns {function} Cleanup code to execute when the component dismounts.
     * @private
     * @function
     * 
     */
    const mount = () => {

        const portalRoot = document.createElement(C.HTMLElement.DIV);
        portalRoot.id = elementID;
        root.current = portalRoot;
        
        const childrenContainer = container.current;
        childrenContainer.className = C.Style.PORTAL;
        
        portalRoot.appendChild(childrenContainer);

        const applicationRoot = document.getElementById(C.HTMLElement.ROOT);
        applicationRoot.parentNode.appendChild(portalRoot);

        const windowTitle = window.document.title;
        const history = window.history;
        history.pushState(null, windowTitle);
        
        window.addEventListener(C.Event.KEY_DOWN, keyDownHandler, true);
        window.addEventListener(C.Event.POP_STATE, popStateHandler);

        return () => {

            portalRoot.removeChild(childrenContainer);
            applicationRoot.parentNode.removeChild(portalRoot);

            window.removeEventListener(C.Event.KEY_DOWN, keyDownHandler, true);
            window.removeEventListener(C.Event.POP_STATE, popStateHandler);

            history.pushState(null, windowTitle);
        };
    };

    onMount(mount);

    return ReactDOM.createPortal(children, container.current);
};

/**
 * Prop Types
 * 
 */
Portal.propTypes = {

    elementID: PropTypes.string.isRequired,
    okCallback: PropTypes.func.isRequired,
    closeCallback: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

/**
 * Export module
 * 
 */
export default Portal;