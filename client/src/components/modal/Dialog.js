/**
 * @description Dialog component.
 * 
 * @requires constants
 * @requires Portal
 * @requires prop-types
 * @requires react
 * @public
 * @module
 * 
 */
import * as C from "../../support/constants";
import Portal from "./Portal";
import PropTypes from "prop-types";
import React, { useState } from "react";

/**
 * @description Renders a modal window inside a React Portal.
 * Dialogs must contain at least a "message" to display and an "okCallback" function while supplying a "cancelCallback" function and "preloader" boolean optional.
 * A supplied truthy value for the "preloader" prop will display a loading indicator and disable all buttons when the OK button is pressed.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} The portal rendered to the DOM.
 * @public
 * @function
 * 
 */
const Dialog = ({

        message,
        okCallback,
        cancelCallback,
        preloader
    }) => {

    /**
     * State
     * 
     */
    const [ isLoading, setIsLoading ] = useState(false);

    /**
     * @description Handler for a dispatched "click" event on the OK button.
     * 
     * @function
     * @private
     *  
     */
    const okButtonHandler = () => {

        if (preloader) {

            setIsLoading(true);
        }
        
        okCallback();
    };

    /**
     * JSX markup
     * 
     */
    return (

        <Portal elementID={C.ID.ELEMENT_DIALOG}>
            <div className={C.Style.DIALOG}>
            
                <div className={C.Style.DIALOG_MESSAGE_CONTAINER}>
                    {message}
                </div>

                {
                    //TODO: Replace with style animation
                    isLoading && <div>LOADING...</div>
                }

                <div className={C.Style.DIALOG_BUTTONS_CONTAINER}>
                    <button
                        onClick={okButtonHandler}
                        disabled={isLoading}
                    >
                        {C.Label.OK}
                    </button>
                    
                    {cancelCallback &&
                        <button
                            onClick={cancelCallback}
                            disabled={isLoading}
                        >
                            {C.Label.CANCEL}
                        </button>
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

    message: PropTypes.string.isRequired,
    okCallback: PropTypes.func.isRequired,
    cancelCallback: PropTypes.func,
    preloader: PropTypes.bool
};

/**
 * Export module
 * 
 */
export default Dialog;