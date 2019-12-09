/**
 * @description AddItem component.
 * 
 * @requires Collapsible
 * @requires constants
 * @requires Dialog
 * @requires prop-types
 * @requires react
 * @requires useAuth
 * @requires useInputText
 * @requires useItems
 * @public
 * @module
 * 
 */
import * as C from "../../../../../support/constants";
import Collapsible from "../../../../Collapsible";
import Dialog from "../../../../modal/Dialog";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import useAuth from "../../../../../hooks/useAuth";
import useInputText from "../../../../../hooks/useInputText";
import useItems from "../../../../../hooks/useItems";

/**
 * @description The EditItem component contains UI elements that are required to edit Item documents on the database.
 * The UI elements include text input fields for optionally setting the "name" and/or "image" URL, a button to reset the text fields to their default values
 * and a button for submitting the input data to the server.
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
        itemImage,
        logout,
    }) => {

    /**
     * State
     * 
     */
    const [ invalidName, setInvalidName ] = useState(false);
    const [ invalidImage, setInvalidImage ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ showDialog, setShowDialog ] = useState(false);

    /**
     * Refs
     * 
     */
    const isSubmittable = useRef(false);
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
    } = useInputText(null, null, itemName);

    const {

        binding: bindImage,
        clearValue: clearImage,
        value: image
    } = useInputText(null, null, itemImage);

    /**
     * Set isSubmittable flag
     * Determines if the present state of text field data is sufficient for submitting to the server.
     * 
     */
    isSubmittable.current = (
        
        (name || image) && (

            (name !== itemName) ||
            (image !== itemImage)
        )
    );

    /**
     * Edit item success
     * Clear appropriate text input elements.
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

                    case C.ID.NAME_IMAGE:
                        setInvalidImage(error[C.ID.ERROR_MESSAGE]);

                        break;

                    default:
                        throw new Error(error[C.ID.ERROR_MESSAGE]);
                }
            });
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

        setShowDialog(false);
        setIsLoading(true);

        setAuthError(null);
        setItemsEdit(null);

        setInvalidName(null);
        setInvalidImage(null);

        responseUpdate.current = true;
        await fetchEdit(itemID, name, image);

        setIsLoading(false);
    };

    /**
     * @description Resets the "name" and "image" text fields back to their default values.
     * 
     * @private
     * @function
     * 
     */
    const resetHandler = () => {

        clearName();
        clearImage();
    };

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

            <Collapsible
                title={itemName}
                headerStyle={C.Style.COLLAPSIBLE_HEADER_LIST_ITEM}
            >
                <>
                    <div>
                        {invalidName && <div>{invalidName}</div>}
                        <label>
                            {C.Label.NAME}
                            <input 
                                type={C.HTMLElement.InputType.TEXT}
                                name={C.ID.NAME_NAME}
                                disabled={isLoading}
                                {...bindName}
                            />
                        </label>
                    </div>

                    <div>
                        {invalidImage && <div>{invalidImage}</div>}
                        <label>
                            {C.Label.IMAGE}
                            <input 
                                type={C.HTMLElement.InputType.TEXT}
                                name={C.ID.NAME_IMAGE}
                                disabled={isLoading}
                                {...bindImage}
                            />
                        </label>
                    </div>

                    <button
                        onClick={() => setShowDialog(true)}
                        disabled={isLoading || !isSubmittable.current}
                    >
                        {C.Label.EDIT.toUpperCase()}
                    </button>

                    <button
                        onClick={resetHandler}
                        disabled={isLoading || !isSubmittable.current}
                    >
                        {C.Label.RESET.toUpperCase()}
                    </button>

                    {
                        //TODO: Replace with style animation
                        isLoading && <div>LOADING...</div>
                    }
                </>
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