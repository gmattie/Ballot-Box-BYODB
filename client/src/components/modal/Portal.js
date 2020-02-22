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
import { useEffect, useRef } from "react";
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
        children
    }) => {

    const childrenContainer = useRef(document.createElement(C.HTMLElement.DIV));

    /**
     * @description Pause background scrolling
     * Temporarily deactivates scrolling on the document body while the Portal component is visible. 
     * 
     * @private
     * @function
     * 
     */
    useEffect(() => {

        document.body.style.overflow = C.Style.HIDDEN;

        return () => document.body.style.overflow = C.Style.VISIBLE;
    }, []);

    /**
     * @description Portal root element
     * Creates an element containing the ChildrenContainer to be appended to the DOM as the Portal.
     * 
     * @private
     * @function
     * 
     */
    useEffect(() => {
        
        let portalRoot = document.getElementById(elementID);
        
        if (!portalRoot) {
            
            portalRoot = document.createElement(C.HTMLElement.DIV);
            portalRoot.id = elementID;

            const applicationRoot = document.getElementById(C.HTMLElement.ROOT);
            applicationRoot.parentNode.insertBefore(portalRoot, applicationRoot.nextSibling);
        }

        const container = childrenContainer.current;
        container.className = C.Style.PORTAL;
        
        portalRoot.appendChild(container);

        return () => {

            portalRoot.removeChild(container);
        };
    }, [elementID]);

    return ReactDOM.createPortal(children, childrenContainer.current);
};

/**
 * Prop Types
 * 
 */
Portal.propTypes = {

    elementID: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

/**
 * Export module
 * 
 */
export default Portal;