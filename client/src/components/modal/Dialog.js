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
import React, { useEffect } from "react";

/**
 * @description Renders a dialog modal window inside a React Portal.
 * Dialogs must contain at least a "message" string and an "okCallback" function.
 * Optional "imageURL" and "cancelCallback" will respectively render either an image or a button when supplied.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} The portal rendered to the DOM.
 * @public
 * @function
 * 
 */
const Dialog = ({

        imageURL,
        message,
        okCallback,
        cancelCallback
    }) => {

    /**
     * Deactivates body scrolling while the Dialog component is visible 
     * 
     */
    useEffect(() => {

        document.body.style.overflow = C.Style.HIDDEN;

        return () => document.body.style.overflow = C.Style.VISIBLE;
    }, []);

    /**
     * JSX markup
     * 
     */
    return (

        <Portal elementID={C.ID.ELEMENT_DIALOG}>
            <div className={C.Style.DIALOG}>

                {imageURL && 
                    <img
                        src={imageURL}
                        alt={message}
                        onClick={okCallback}
                    />
                }
            
                <div className={C.Style.DIALOG_MESSAGE_CONTAINER}>
                    {message}
                </div>

                {!imageURL &&
                    <>
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
                    </>
                }
            </div>
        </Portal>
    );
};

/**
 * Prop Types
 * 
 */
Dialog.propTypes = {

    imageURL: PropTypes.string,
    message: PropTypes.string.isRequired,
    okCallback: PropTypes.func.isRequired,
    cancelCallback: PropTypes.func
};

/**
 * Export module
 * 
 */
export default Dialog;