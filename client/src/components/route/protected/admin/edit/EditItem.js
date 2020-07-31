/**
 * @description EditItem component.
 * 
 * @requires Button
 * @requires constants
 * @requires Dialog
 * @requires prop-types
 * @requires ProtectedContainer
 * @requires react
 * @requires TextField
 * @requires Toggle
 * @requires useAuth
 * @requires useInputText
 * @requires useItems
 * @requires useVotes
 * @public
 * @module
 * 
 */
import { LogoutAPI } from "../../ProtectedContainer";
import * as C from "../../../../../support/constants";
import Button from "../../../../controls/Button";
import Dialog from "../../../../modal/Dialog";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useRef, useState } from "react";
import TextField from "../../../../controls/TextField";
import Toggle from "../../../../controls/Toggle";
import useAuth from "../../../../../hooks/useAuth";
import useInputText from "../../../../../hooks/useInputText";
import useItems from "../../../../../hooks/useItems";
import useVotes from "../../../../../hooks/useVotes";

/**
 * @description The EditItem component contains UI elements that are required to toggle availability or edit Item documents.
 * The UI elements include a toggle switch with a non-editable "name" for the label, text input fields for optionally
 * editing "thumbnail" and "image" properties and buttons to reset edited input data or submit edited input data to the server.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const EditItem = ({

        itemID,
        itemName,
        itemThumbnail,
        itemImage,
        itemActive,
    }) => {

    /**
     * Context
     * 
     */
    const logout = useContext(LogoutAPI);

    /**
     * State
     * 
     */
    const [ active, setActive ] = useState(itemActive);
    const [ invalidThumbnail, setInvalidThumbnail ] = useState(null);
    const [ invalidImage, setInvalidImage ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ showDialog, setShowDialog ] = useState(false);

    /**
     * Refs
     * 
     */
    const isMounted = useRef(false);
    const isResettable = useRef(false);
    const isSubmittable = useRef(false);
    const isVoteOpen = useRef(false);
    const responseUpdate = useRef(false);

    /**
     * Hooks
     * 
     */
    const { authError, setAuthError } = useAuth();
    
    const {
        
        binding: bindThumbnail,
        clearValue: clearThumbnail,
        value: thumbnail
    } = useInputText(
        
        `${C.Label.THUMBNAIL} ${C.Label.URL}`,
        confirmHandler,
        itemThumbnail
    );
    
    const {
        
        binding: bindImage,
        clearValue: clearImage,
        value: image
    } = useInputText(
        
        `${C.Label.IMAGE} ${C.Label.URL}`,
        confirmHandler,
        itemImage
    );
    
    const {

        itemsEdit,
        setItemsEdit,
        fetchEdit
    } = useItems();

    const { votesActive } = useVotes();

    /**
     * @description Sets the "active" component state to match the "itemActive" prop when the prop is updated.
     * While the "active" component state is initialized with the "itemActive" prop, updating the prop does not automatically reinitialize the state.
     * This ensures a synchronized UI between users with admin privileges.
     * 
     * @private
     * @function
     * 
     */
    useEffect(() => {

        if (isMounted.current) {

            setActive(itemActive);
        }
        else {

            isMounted.current = true;
        }
    }, [itemActive]);

    /**
     * Set isSubmittable flag
     * Determines if the present state of text data is sufficient for submitting to the server.
     * 
     */
    isSubmittable.current = (
        
        (thumbnail !== itemThumbnail) ||
        (image !== itemImage)
    );

    /**
     * Set isResettable flag
     * Determines if the present state of text data is sufficient for enabling the "Reset" button and clearing the form.
     * 
     */
    isResettable.current = (

        (thumbnail !== itemThumbnail) ||
        (image !== itemImage)
    );

    /**
     * Set isVoteOpen flag
     * Determines if there is an open vote in order to disable all control components.
     *  
     */
    isVoteOpen.current = Boolean(
        
        votesActive &&
        votesActive[C.Model.VOTE]
    );

    /**
     * Edit item success
     * 
     */
    if (itemsEdit && responseUpdate.current) {

        responseUpdate.current = false;
    }
    
    /**
     * Edit item failure
     * Parse the error object to set the appropriate local error states.
     * 
     */
    if (authError && responseUpdate.current) {

        responseUpdate.current = false;

        if (Array.isArray(authError.error)) {
            
            authError.error.forEach((error) => {

                const errorMessage = error[C.Error.ERROR_MESSAGE];

                switch (error[C.Error.ERROR_PARAM]) {

                    case C.ID.NAME_THUMBNAIL:
                        setInvalidThumbnail(errorMessage);

                        break;

                    case C.ID.NAME_IMAGE:
                        setInvalidImage(errorMessage);

                        break;

                    default:
                        throw new Error(errorMessage);
                }
            });

            setAuthError(null);
        }
        else {

            setTimeout(() => logout());
        }
    }

    /**
     * @description Posts the request body to the server.
     * Function executes asynchronously to facilitate the local loading state.
     * 
     * @param {string|null} thumbnail - The image URL for the Item's "thumbnail" property.
     * @param {string|null} image - The image URL for the Item's "image" property.
     * @param {boolean|null} active - The value for the Item's "active" property.
     * @async
     * @function
     * @private
     *  
     */
    const submitData = async (thumbnail, image, active) => {

        setIsLoading(true);

        responseUpdate.current = true;
        await fetchEdit(
            
            itemID,
            thumbnail,
            image,
            active
        );
            
        setIsLoading(false);
    };

    /**
     * @description Handler for a dispatched "change" event from the Toggle component.
     * Negates the value of the "active" local state and forwards the negated value to be submitted to the server.
     * 
     * @function
     * @private
     *  
     */
    const activeHandler = () => {

        const value = !active;

        setActive(value);
        submitData(undefined, undefined, value);
    };

    /**
     * @description Handler for a dispatched "click" event from the OK button in the confirmation Dialog component.
     * Resets to the initial render by nullifying the "authError" and "itemsEdit" states and clearing all local error states.
     * Forwards the "thumbnail" and/or "image" values to be submitted to the server.
     * 
     * @function
     * @private
     *  
     */
    const editHandler = () => {

        if (isSubmittable.current) {

            setShowDialog(false);

            setAuthError(null);
            setItemsEdit(null);

            setInvalidThumbnail(null);
            setInvalidImage(null);

            submitData(thumbnail, image, undefined);
        }
    };

    /**
     * @description Handler for a dispatched "click" event from the Reset button.
     * Resets the "thumbnail" and "image" text fields back to their default values.
     * 
     * @private
     * @function
     * 
     */
    const resetHandler = () => {

        clearThumbnail();
        clearImage();
    };

    /**
     * @description Handler for a dispatched "click" event from the Edit button.
     * Displays the confirmation Dialog component.
     * Written as a function declaration in order to be hoisted and accessible to the custom hooks above.
     * 
     * @function
     * @private
     * 
     */
    function confirmHandler() {

        setShowDialog(true);
    }

    /**
     * JSX markup
     * 
     */
    return (

        <>
            {showDialog &&
                <Dialog 
                    content={C.Label.CONFIRM_EDIT_ITEM}
                    okCallback={editHandler}
                    cancelCallback={() => setShowDialog(false)}
                />
            }

            <div className={C.Style.EDIT_ITEM}>
                <div className={C.Style.EDIT_ITEM_NAME}>
                    <Toggle
                        label={itemName}
                        checked={active}
                        disabled={isLoading || isVoteOpen.current}
                        onChange={activeHandler}
                    />
                </div>

                <div className={C.Style.EDIT_ITEM_THUMBNAIL}>
                    <TextField
                        name={C.ID.NAME_THUMBNAIL}
                        disabled={isLoading || !active || isVoteOpen.current}
                        errorMessage={invalidThumbnail}
                        {...bindThumbnail}
                    />
                </div>

                <div className={C.Style.EDIT_ITEM_IMAGE}>
                    <TextField
                        name={C.ID.NAME_IMAGE}
                        disabled={isLoading || !active || isVoteOpen.current}
                        errorMessage={invalidImage}
                        {...bindImage}
                    />
                </div>

                <div className={C.Style.EDIT_ITEM_SUBMIT}>
                    {isLoading &&
                        <div className={C.Style.EDIT_ITEM_SUBMIT_PRELOADER} />
                    }

                    <div className={C.Style.EDIT_ITEM_SUBMIT_BUTTONS}>
                        <Button
                            style={C.Style.BUTTON_SUBMIT_EMPHASIS}
                            onClick={confirmHandler}
                            disabled={isLoading || !isSubmittable.current || !active || isVoteOpen.current}
                        >
                            {C.Label.EDIT}
                        </Button>

                        <Button
                            style={C.Style.BUTTON_SUBMIT}
                            onClick={resetHandler}
                            disabled={isLoading || !isResettable.current || !active || isVoteOpen.current}
                        >
                            {C.Label.RESET}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

/**
 * Default Props
 * 
 */
EditItem.defaultProps = {

    itemThumbnail: null,
    itemImage: null,
};

/**
 * Prop Types
 * 
 */
EditItem.propTypes = {

    itemID: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
    itemThumbnail: PropTypes.string,
    itemImage: PropTypes.string,
    itemActive: PropTypes.bool.isRequired
};

/**
 * Export module
 * 
 */
export default EditItem;