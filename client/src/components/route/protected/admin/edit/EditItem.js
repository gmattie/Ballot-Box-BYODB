/**
 * @description EditItem component.
 * 
 * @requires Button
 * @requires Collapsible
 * @requires constants
 * @requires Dialog
 * @requires prop-types
 * @requires react
 * @requires TextField
 * @requires useAuth
 * @requires useInputText
 * @requires useItems
 * @public
 * @module
 * 
 */
import * as C from "../../../../../support/constants";
import Button from "../../../../controls/Button";
import Collapsible from "../../../../controls/Collapsible";
import Dialog from "../../../../modal/Dialog";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import TextField from "../../../../controls/TextField";
import useAuth from "../../../../../hooks/useAuth";
import useInputText from "../../../../../hooks/useInputText";
import useItems from "../../../../../hooks/useItems";

/**
 * @description The EditItem component contains UI elements that are required to edit Item documents on the database.
 * The UI elements include text input fields for optionally updating "name", "thumbnail" and "image",
 * a button to reset the text fields to their default values and a button for submitting the input data to the server.
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
        logout,
    }) => {

    /**
     * State
     * 
     */
    const [ invalidName, setInvalidName ] = useState(null);
    const [ invalidThumbnail, setInvalidThumbnail ] = useState(null);
    const [ invalidImage, setInvalidImage ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ showDialog, setShowDialog ] = useState(false);

    /**
     * Refs
     * 
     */
    const isSubmittable = useRef(false);
    const isResettable = useRef(false);
    const isUpdating = useRef(false);
    const responseUpdate = useRef(false);

    /**
     * Hooks
     * 
     */
    const { authError, setAuthError } = useAuth();

    const {

        itemsEdit,
        setItemsEdit,
        fetchEdit
    } = useItems();

    const {

        binding: bindName,
        clearValue: clearName,
        value: name
    } = useInputText(C.Label.NAME, confirmHandler, itemName);

    const {

        binding: bindThumbnail,
        clearValue: clearThumbnail,
        value: thumbnail
    } = useInputText(C.Label.THUMBNAIL, confirmHandler, itemThumbnail);

    const {

        binding: bindImage,
        clearValue: clearImage,
        value: image
    } = useInputText(C.Label.IMAGE, confirmHandler, itemImage);

    /**
     * @description Negate the "isUpdating" flag after the Items state updates and triggers a refresh of the component props. 
     * 
     * @private
     * @function
     * 
     */
    useEffect(() => {

        isUpdating.current = false;
    }, [itemName, itemThumbnail, itemImage]);

    /**
     * Set isSubmittable flag
     * Determines if the present state of text data is sufficient for submitting to the server.
     * 
     */
    isSubmittable.current = (
        
        (name && name !== itemName) ||
        (thumbnail && thumbnail !== itemThumbnail) ||
        (image && image !== itemImage)
    );

    /**
     * Set isResettable flag
     * Determines if the present state of text data is sufficient for enabling the "Reset" button and clearing the form.
     * 
     */
    isResettable.current = (

        (name !== itemName) ||
        (thumbnail !== itemThumbnail) ||
        (image !== itemImage)
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

                switch (error[C.ID.ERROR_PARAM]) {

                    case C.ID.NAME_NAME:
                        setInvalidName(error[C.ID.ERROR_MESSAGE]);

                        break;

                    case C.ID.NAME_THUMBNAIL:
                        setInvalidThumbnail(error[C.ID.ERROR_MESSAGE]);

                        break;

                    case C.ID.NAME_IMAGE:
                        setInvalidImage(error[C.ID.ERROR_MESSAGE]);

                        break;

                    default:
                        throw new Error(error[C.ID.ERROR_MESSAGE]);
                }
            });

            isUpdating.current = false;
            setAuthError(null);
        }
        else {

            if (authError.error.includes(C.Error.DUPLICATE_KEY)) {

                setInvalidName(C.Error.DUPLICATE_KEY);
            }
            else {

                setTimeout(() => logout());
            }
        }
    }

    /**
     * @description Posts the request body to the server.
     * Resets to the initial render by nullifying the "authError" and "itemsEdit" states and clearing all local error states.
     * Function executes asynchronously to facilitate the local loading state.
     * 
     * @async
     * @function
     * @private
     *  
     */
    const submitHandler = async () => {

        if (isSubmittable.current) {

            setShowDialog(false);
            setIsLoading(true);

            setAuthError(null);
            setItemsEdit(null);

            setInvalidName(null);
            setInvalidThumbnail(null);
            setInvalidImage(null);

            isUpdating.current = true;
            responseUpdate.current = true;
            await fetchEdit(
                
                itemID,
                name,
                thumbnail,
                image
            );
                
            setIsLoading(false);
        }
    };

    /**
     * @description Resets the "name", "thumbnail" and "image" text fields back to their default values.
     * 
     * @private
     * @function
     * 
     */
    const resetHandler = () => {

        clearName();
        clearThumbnail();
        clearImage();
    };

    /**
     * @description Displays the confirmation dialog.
     * Written as a function declaration in order to be hoisted and accessible to the custom hooks above.
     * 
     * @function
     * @private
     * 
     */
    function confirmHandler() {

        if (isSubmittable.current && !isUpdating.current) {

            setShowDialog(true);
        }
    }

    /**
     * JSX markup
     * 
     */
    return (

        <>
            {showDialog &&
                <Dialog 
                    message={C.Label.CONFIRM_EDIT_ITEM}
                    okCallback={submitHandler}
                    cancelCallback={() => setShowDialog(false)}
                />
            }

            <Collapsible title={itemName}>
                <div className={C.Style.EDIT_ITEM}>
                    <div className={C.Style.EDIT_ITEM_NAME}>
                        <TextField
                            name={C.ID.NAME_NAME}
                            disabled={isLoading}
                            errorMessage={invalidName}
                            {...bindName}
                        />
                    </div>

                    <div className={C.Style.EDIT_ITEM_THUMBNAIL}>
                        <TextField
                            name={C.ID.NAME_THUMBNAIL}
                            disabled={isLoading}
                            errorMessage={invalidThumbnail}
                            {...bindThumbnail}
                        />
                    </div>

                    <div className={C.Style.EDIT_ITEM_IMAGE}>
                        <TextField
                            name={C.ID.NAME_IMAGE}
                            disabled={isLoading}
                            errorMessage={invalidImage}
                            {...bindImage}
                        />
                    </div>

                    <div className={C.Style.EDIT_ITEM_BUTTONS_CONTAINER}>
                        <Button
                            style={C.Style.BUTTON_SUBMIT_EMPHASIS}
                            onClick={confirmHandler}
                            disabled={isLoading || isUpdating.current || !isSubmittable.current}
                        >
                            {C.Label.EDIT}
                        </Button>

                        <Button
                            style={C.Style.BUTTON_SUBMIT}
                            onClick={resetHandler}
                            disabled={isLoading || isUpdating.current || !isResettable.current}
                        >
                            {C.Label.RESET}
                        </Button>
                    </div>

                    {
                        //TODO: Replace with style animation
                        isLoading && <div>LOADING...</div>
                    }
                </div>
            </Collapsible>
        </>
    );
};

/**
 * Prop Types
 * 
 */
EditItem.propTypes = {

    itemID: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
    itemImage: PropTypes.string.isRequired
};

/**
 * Export module
 * 
 */
export default EditItem;