/**
 * @description Dialog component.
 * 
 * @requires Button
 * @requires constants
 * @requires Portal
 * @requires prop-types
 * @requires react
 * @public
 * @module
 * 
 */
import * as C from "../../support/constants";
import Button from "../controls/Button";
import Portal from "./Portal";
import PropTypes from "prop-types";
import React, { useState } from "react";

/**
 * @description Renders a modal window inside a React Portal.
 * Dialog components must contain a "content" property to display text or element nodes and an "okCallback" function to handle affirmatively closing the dialog.
 * Optional properties include a "cancelCallback" function to handle cancelling the dialog action as well as a "preloader" boolean property to will display a
 * loading indicator and disable all Dialog buttons when the "OK" button is pressed.
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

        <Portal
            elementID={C.ID.ELEMENT_DIALOG}
            okCallback={okButtonHandler}
            closeCallback={cancelCallback}
        >
            <div className={C.Style.DIALOG}>
                <div className={C.Style.DIALOG_CONTENT}>
                    {content}
                </div>

                <div className={C.Style.DIALOG_SUBMIT}>
                    {isLoading &&
                        <div className={C.Style.DIALOG_SUBMIT_PRELOADER} />
                    }

                    <Button
                        style={C.Style.BUTTON_SUBMIT_EMPHASIS}
                        onClick={okButtonHandler}
                        disabled={isLoading}
                    >
                        {C.Label.OK}
                    </Button>

                    {cancelCallback &&
                        <Button
                            style={C.Style.BUTTON_SUBMIT}
                            onClick={cancelCallback}
                            disabled={isLoading}
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
    preloader: PropTypes.bool
};

/**
 * Export module
 * 
 */
export default Dialog;