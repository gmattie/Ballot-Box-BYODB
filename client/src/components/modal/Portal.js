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
import { useCallback, useEffect, useRef } from "react";
import * as C from "../../support/constants";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

/**
 * @description Renders children in a separate DOM node outside of the application's root DOM node.
 * Portal DOM nodes that are not predefined in the public index.html file with a matching "elementID" prop will be created and inserted after the application root DOM node.
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
     * @description Pause background scrolling
     * Temporarily deactivates scrolling on the document body while the Portal component is visible. 
     * 
     * @returns {function} Cleanup code to execute when the component dismounts.
     * @private
     * @function
     * 
     */
    useEffect(() => {

        document.body.style.overflow = C.Style.HIDDEN;

        return () => document.body.style.overflow = C.Style.VISIBLE;
    }, []);

    /**
     * @description Handler for a dispatched "keydown" event.
     * Since there may exist several portal component node siblings in the DOM at once, this callback only executes on the last portal component node sibling. 
     * 
     * @param {object} event - The event object.
     * @private
     * @function
     * 
     */
    const keyDownHandler = useCallback((event) => {

        if (!root.current.nextElementSibling) {

            event.stopPropagation();
            event.preventDefault();

            if (event.key === C.Key.ENTER) {

                if (okCallback) {

                    okCallback();
                }
            }
            else if (event.key === C.Key.ESCAPE) {

                if (closeCallback) {

                    closeCallback();
                }
            }
        }
    }, [closeCallback, okCallback]);

    /**
     * @description Portal root element
     * Creates an element containing the children to be appended to the DOM as the Portal.
     * 
     * @returns {function} Cleanup code to execute when the component dismounts.
     * @private
     * @function
     * 
     */
    useEffect(() => {

        const portalRoot = document.createElement(C.HTMLElement.DIV);
        portalRoot.id = elementID;
        root.current = portalRoot;
        
        const childrenContainer = container.current;
        childrenContainer.className = C.Style.PORTAL;
        
        portalRoot.appendChild(childrenContainer);

        const applicationRoot = document.getElementById(C.HTMLElement.ROOT);
        applicationRoot.parentNode.appendChild(portalRoot);

        window.addEventListener(C.Event.KEY_DOWN, keyDownHandler, true);

        return () => {

            portalRoot.removeChild(childrenContainer);
            applicationRoot.parentNode.removeChild(portalRoot);
            window.removeEventListener(C.Event.KEY_DOWN, keyDownHandler, true);
        };
    }, [elementID, keyDownHandler]);

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