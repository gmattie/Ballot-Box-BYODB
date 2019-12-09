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
import React from "react";

/**
 * @description Renders a dialog modal window inside a React Portal.
 * Dialogs must contain textual content and a callback function for the "OK" button.
 * An additional "Cancel" button will only be rendered if a related callback function is supplied.
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
        cancelCallback
    }) => {

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

                <div className={C.Style.DIALOG_BUTTONS_CONTAINER}>
                    <button onClick={okCallback}>
                        {C.Label.OK}
                    </button>
                    
                    {cancelCallback &&
                        <button onClick={cancelCallback}>
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
    cancelCallback: PropTypes.func
};

/**
 * Export module
 * 
 */
export default Dialog;