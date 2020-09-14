/**
 * @description Dialog component.
 * 
 * @requires Button
 * @requires constants
 * @requires Portal
 * @requires prop-types
 * @requires react
 * @requires utilities
 * @public
 * @module
 * 
 */
import { concatClassNames } from "../../support/utilities";
import * as C from "../../support/constants";
import Button from "../controls/Button";
import Portal from "./Portal";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * @description Renders a modal dialog inside a React Portal.
 * Dialog components must contain a "content" property to display text or element nodes, an "okCallback" function to handle affirmative closing of the dialog
 * and a "dismountCallback" function to be passed down to the Portal child component for removal of the modal window from the DOM.
 * Optional properties include a "cancelCallback" function to handle negative closing of the dialog and a "preloader" object property for displaying a loading
 * indicator, disabling UI buttons and executing an asynchronous function or HTTP request when the "OK" button is pressed.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} The portal rendered to the DOM.
 * @public
 * @function
 * 
 */
const Dialog = ({

        content,
        okCallback,
        cancelCallback,
        dismountCallback,
        preloader
    }) => {

    /**
     * State
     * 
     */
    const [ isPreloading, setIsPreloading ] = useState(false);

    /**
     * Refs
     * 
     */
    const buttonTarget = useRef(null);
    const container = useRef(null);
    const portal = useRef(null);

    /**
     * @description Starts the "exit" animations for both the Dialog and Portal component containers.
     * Invokes the "okCallback" function while the Dialog is animating.
     * 
     * @private
     * @function
     * 
     */
    const exit = useCallback(() => {

        const dialog = container.current;
        dialog.classList.remove(C.Style.DIALOG_ANIMATION_ENTER);
        dialog.classList.add(C.Style.DIALOG_ANIMATION_EXIT);

        portal.current.exit();

        if (buttonTarget.current === C.Label.OK) {
            
            okCallback();
        }
    }, [okCallback]);

    /**
     * @description Handler for a dispatched "click" event on the OK button.
     * 
     * @function
     * @private
     *  
     */
    const okHandler = () => {

        buttonTarget.current = C.Label.OK;

        if (preloader && !preloader[C.Event.COMPLETE]) {

            portal.current.setIsAnimating(true);

            setIsPreloading(true);
            okCallback();
        }
        else {

            exit();
        }
    };

    /**
     * @description Handler for a dispatched "click" event on the Cancel button.
     * While the "Cancel" button is disabled during preloading, the evaluated condition insures that preloading is not interrupted by pressing the keyboard's Escape key or the browser's Back button.
     * 
     * @function
     * @private
     *  
     */
    const cancelHandler = () => {

        if (!isPreloading) {

            buttonTarget.current = C.Label.CANCEL;

            exit();
        }
    };

    /**
     * @description Executed when the "preloader" prop is updated to indicate the completion of an asynchronous function or HTTP request.
     * 
     * @private
     * @function
     *  
     */
    useEffect(() => {

        if (preloader && preloader[C.Event.COMPLETE]) {

            buttonTarget.current = C.Label.CANCEL;

            exit();
        }
    }, [exit, preloader]);

    /**
     * JSX markup
     * 
     */
    return (

        <Portal
            ref={portal}
            elementID={C.ID.ELEMENT_DIALOG}
            okCallback={okHandler}
            cancelCallback={cancelHandler}
            dismountCallback={dismountCallback}
        >
            <div 
                ref={container}
                className={
                    concatClassNames(
                        C.Style.DIALOG,
                        C.Style.DIALOG_ANIMATION_ENTER
                    )
                }
            >
                <div className={C.Style.DIALOG_CONTENT}>
                    {content}
                </div>

                <div className={C.Style.DIALOG_SUBMIT}>
                    {isPreloading &&
                        <div className={C.Style.DIALOG_SUBMIT_PRELOADER} />
                    }

                    <Button
                        style={C.Style.BUTTON_SUBMIT_EMPHASIS}
                        onClick={okHandler}
                        disabled={isPreloading}
                    >
                        {C.Label.OK}
                    </Button>

                    {cancelCallback &&
                        <Button
                            style={C.Style.BUTTON_SUBMIT}
                            onClick={cancelHandler}
                            disabled={isPreloading}
                        >
                            {C.Label.CANCEL}
                        </Button>
                    }
                </div>
            </div>
        </Portal>
    );
};

/**
 * Prop Types
 * 
 */
Dialog.propTypes = {

    content: PropTypes.node.isRequired,
    okCallback: PropTypes.func.isRequired,
    cancelCallback: PropTypes.func,
    dismountCallback: PropTypes.func.isRequired,

    preloader: PropTypes.shape({
        
        [C.Event.COMPLETE]: PropTypes.bool.isRequired
    }),
};

/**
 * Export module
 * 
 */
export default Dialog;