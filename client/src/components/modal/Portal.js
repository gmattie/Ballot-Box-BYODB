/**
 * @description Portal component.
 * 
 * @requires constants
 * @requires prop-types
 * @requires react
 * @requires react-dom
 * @requires utilities
 * @public
 * @module
 * 
 */
import { concatClassNames } from "../../support/utilities";
import { forwardRef, useImperativeHandle, useRef } from "react";
import * as C from "../../support/constants";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import useMount from "../../hooks/useMount";

/**
 * @description Renders children in a separate DOM node outside of the application root DOM node.
 * Portal DOM nodes that are not predefined in the public index.html file with a matching "elementID" prop will be created and appended as the last element sibling of the application root DOM node.
 * The optional "okCallback" and "cancelCallback" props are used to interface with the children props of the same name if available.
 * The "dismountCallback" is called after the exit animation has ended, which is triggered either by calling the "exit" function, pressing the keyboard's Escape or Enter keys or navigating via the browser's Back button.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} The portal rendered to the DOM.
 * @public
 * @function
 * 
 */
const Portal = forwardRef(({
    
        elementID,
        okCallback,
        cancelCallback,
        dismountCallback,
        children
    }, ref) => {

    /**
     * Refs
     * 
     */
    const root = useRef();
    const container = useRef(document.createElement(C.HTMLElement.DIV));
    const isAnimating = useRef(true);

    /**
     * Hooks
     * 
     */
     const { onMount } = useMount();

    /**
     * @description Sets the flag of the "isAnimating" ref.
     * 
     * @param {bool} animating - the flag to set.
     * @public
     * @function
     * 
     */
    const setIsAnimating = (animating) => {

    isAnimating.current = animating;
    };

    /**
     * @description Starts the "exit" animation.
     * Invokes the "dismountCallback" to remove the Portal component from the DOM after the animation has ended.
     * 
     * @public
     * @function
     * 
     */
    const exit = () => {

        setIsAnimating(true);

        const portal = container.current;
        portal.addEventListener(C.Event.ANIMATION_END, dismountCallback);
        portal.classList.remove(C.Style.PORTAL_ANIMATION_ENTER);
        portal.classList.add(C.Style.PORTAL_ANIMATION_EXIT);        
    };

    /**
     * @description Used alongside the forwardRef to exposes the included functions to the parent component.
     * 
     * @private
     * @function
     * 
     */
    useImperativeHandle(ref, () => ({
        
        exit,
        setIsAnimating
    }));

    /**
     * @description Handler for a dispatched "animationend" event.
     * 
     * @param {object} event - The event object. 
     * @private
     * @function
     * 
     */
    const animationEndHandler = (event) => {

        event.target.removeEventListener(C.Event.ANIMATION_END, animationEndHandler);

        setIsAnimating(false);
    };

    /**
     * @description Pushes a single null state to the Window's history.
     * 
     * @private
     * @function
     * 
     */
    const pushHistoryState = () => {

        const windowTitle = window.document.title;
        const history = window.history;
        history.pushState(null, windowTitle);
    };

    /**
     * @description Handler for a dispatched "keydown" event.
     * The Enter key calls the "okCallback" prop if present while the Escape key calls the "cancelCallback" prop if present.
     * While there may exist several Portal component node siblings in the DOM at once, this callback only executes on the last sibling.
     * 
     * @param {object} event - The event object.
     * @private
     * @function
     * 
     */
    const keyDownHandler = (event) => {

        if (!root.current.nextElementSibling && !isAnimating.current) {

            event.stopPropagation();
            event.preventDefault();

            if (event.key === C.Key.ENTER) {

                if (okCallback) {

                    okCallback();
                }
                else {

                    exit();
                }
            }
            else if (event.key === C.Key.ESCAPE) {

                exit();

                if (cancelCallback) {

                    cancelCallback();
                }
            }
        }
    };

    /**
     * @description Handler for a dispatched "popstate" event by pressing the browser's Back button.
     * While there may exist several Portal component node siblings in the DOM at once, this callback will only execute on the last sibling. 
     * 
     * @private
     * @function
     * 
     */
    const popStateHandler = () => {

        if (!root.current.nextElementSibling) {

            if (!isAnimating.current) {

                exit();

                if (cancelCallback) {

                    cancelCallback();
                }
            }
            else {

                pushHistoryState();
            }
        }
     };

    /**
     * @description Creates an element containing children to be appended to the DOM as a React Portal.
     * Creating new history states on both mount and dismount and listening for a "popstate" event facilitates closing modal windows via the browser's Back button. 
     * Listening for a "keydown" event facilitates both affirmative and negative UI actions via pressing the keyboard's Enter and Escape keys, respectively.
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
        
        const portal = container.current;
        portal.addEventListener(C.Event.ANIMATION_END, animationEndHandler);
        portal.className = concatClassNames(
            C.Style.PORTAL,
            C.Style.PORTAL_ANIMATION_ENTER
        );
        
        portalRoot.appendChild(portal);

        const applicationRoot = document.getElementById(C.HTMLElement.ROOT);
        applicationRoot.parentNode.appendChild(portalRoot);

        window.addEventListener(C.Event.KEY_DOWN, keyDownHandler, true);
        window.addEventListener(C.Event.POP_STATE, popStateHandler);
        
        pushHistoryState();

        return () => {

            window.removeEventListener(C.Event.KEY_DOWN, keyDownHandler, true);
            window.removeEventListener(C.Event.POP_STATE, popStateHandler);
            portal.removeEventListener(C.Event.ANIMATION_END, dismountCallback);

            portalRoot.removeChild(portal);
            applicationRoot.parentNode.removeChild(portalRoot);

            pushHistoryState();
        };
    };

    onMount(mount);

    return ReactDOM.createPortal(children, container.current);
});

/**
 * Prop Types
 * 
 */
Portal.propTypes = {

    elementID: PropTypes.string.isRequired,
    okCallback: PropTypes.func,
    cancelCallback: PropTypes.func,
    dismountCallback: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

/**
 * Export module
 * 
 */
export default Portal;