/**
 * @description AddItem component.
 * 
 * @requires Button
 * @requires Collapsible
 * @requires constants
 * @requires Dialog
 * @requires ProtectedContainer
 * @requires react
 * @requires TextField
 * @requires useAuth
 * @requires useInputText
 * @requires useItems
 * @requires usePersist
 * @requires useVotes
 * @public
 * @module
 * 
 */
import { LogoutAPI } from "../ProtectedContainer";
import * as C from "../../../../support/constants";
import Button from "../../../controls/Button";
import Collapsible from "../../../controls/Collapsible";
import Dialog from "../../../modal/Dialog";
import React, { useContext, useRef, useState } from "react";
import TextField from "../../../controls/TextField";
import useAuth from "../../../../hooks/useAuth";
import useInputText from "../../../../hooks/useInputText";
import useItems from "../../../../hooks/useItems";
import usePersist from "../../../../hooks/usePersist";
import useVotes from "../../../../hooks/useVotes";

/**
 * @description The AddItem component contains UI elements that are required to add Item documents to the database.
 * The UI elements include text input fields for setting the "name" with optional "thumbnail" and "image" URLs and a button for submitting the input data to the server.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const AddItem = () => {

    /**
     * Context
     * 
     */
    const logout = useContext(LogoutAPI);

    /**
     * State
     * 
     */
    const [ invalidImage, setInvalidImage ] = useState(null);
    const [ invalidName, setInvalidName ] = useState(null);
    const [ invalidThumbnail, setInvalidThumbnail ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ showDialog, setShowDialog ] = useState(false);

    /**
     * Refs
     * 
     */
    const isSubmittable = useRef(false);
    const isVoteOpen = useRef(false);
    const responseUpdate = useRef(false);

    /**
     * Hooks
     * 
     */
    const { authError, setAuthError } = useAuth();

    const {
        
        persistCollapsedAddItem: collapsed,
        persistTextImage: image,
        persistTextName: name,
        persistTextThumbnail: thumbnail,

        setPersistCollapsedAddItem: setCollapsed,
        setPersistTextImage: setImage,
        setPersistTextName: setName,
        setPersistTextThumbnail: setThumbnail,
    } = usePersist();

    const { binding: bindImage, clearValue: clearImage } = useInputText(
        
        `${C.Label.IMAGE} ${C.Label.URL}`,
        confirmHandler,
        null,
        {
            value: image,
            setValue: setImage
        }
    );

    const { binding: bindName, clearValue: clearName } = useInputText(
        
        C.Label.NAME,
        confirmHandler,
        null,
        {
            value: name,
            setValue: setName
        }
    );

    const { binding: bindThumbnail, clearValue: clearThumbnail } = useInputText(
        
        `${C.Label.THUMBNAIL} ${C.Label.URL}`,
        confirmHandler,
        null,
        {
            value: thumbnail,
            setValue: setThumbnail
        }
    );
    
    const {
        
        fetchAdd,
        itemsAdd,
        setItemsAdd
    } = useItems();
    
    const { votesActive } = useVotes();
    
    /**
     * Set isSubmittable flag
     * Determines if the present state of text data is sufficient for submitting to the server.
     * 
     */
    isSubmittable.current = name;

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
     * Add item success
     * Clear appropriate text input elements.
     * 
     */
    if (itemsAdd && responseUpdate.current) {

        responseUpdate.current = false;

        clearName();
        clearThumbnail();
        clearImage();
    }
    
    /**
     * Add item failure
     * Parse the error object to set the appropriate local error states.
     * 
     */
    if (authError && responseUpdate.current) {

        responseUpdate.current = false;

        if (Array.isArray(authError.error)) {

            authError.error.forEach((error) => {

                const errorMessage = error[C.Error.ERROR_MESSAGE];

                switch (/[^.]*$/.exec(error[C.Error.ERROR_PARAM])[0]) {

                    case C.ID.NAME_NAME:
                        setInvalidName(errorMessage);

                        break;

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
            
            if (authError.error.includes(C.Error.DUPLICATE_KEY)) {

                setInvalidName(C.Error.ITEM_NAME_ALREADY_EXISTS);
            }
            else {

                setTimeout(() => logout());
            }
        }
    }

    /**
     * @description Displays the confirmation dialog.
     * Written as a function declaration in order to be hoisted and accessible to the custom hooks above.
     * 
     * @function
     * @private
     * 
     */
    function confirmHandler() {

        if (isSubmittable.current) {

            setShowDialog(true);
        }
    }

    /**
     * @description Posts the request body to the server.
     * Resets to the initial render by nullifying the "authError" and "itemsAdd" states and clearing all local error states.
     * Function executes asynchronously to facilitate the local loading state.
     * 
     * @async
     * @function
     * @private
     *  
     */
    const submitHandler = async () => {

        setIsLoading(true);

        setAuthError(null);
        setItemsAdd(null);

        setInvalidName(null);
        setInvalidThumbnail(null);
        setInvalidImage(null);

        responseUpdate.current = true;
        await fetchAdd(name, thumbnail, image);

        setIsLoading(false);
    };

    /**
     * @description Handler for a dispatched "click" event on the Cancel button.
     * 
     * @function
     * @private
     *  
     */
    const cancelHandler = () => {

        setShowDialog(false);
    };

    /**
     * @description Callback executed when the "collapsed" state of the Collapsible component is updated.
     * 
     * @param {boolean} collapsed - the "collapsed" state of the Collapsible component.
     * @private
     * @function
     *  
     */
    const collapsibleHandler = (collapsed) => {

        setCollapsed(collapsed);
    };

    /**
     * JSX markup
     * 
     */
    return (

        <>
            {showDialog &&
                <Dialog 
                    content={C.Label.CONFIRM_ADD_ITEM}
                    okCallback={submitHandler}
                    cancelCallback={cancelHandler}
                    dismountCallback={cancelHandler}
                />
            }

            <Collapsible
                title={C.Label.ADD_ITEM}
                eventHandler={collapsibleHandler}
                collapsed={collapsed}
            >
                <div className={C.Style.ADD_ITEM}>
                    <div className={C.Style.ADD_ITEM_NAME}>
                        <TextField
                            name={C.ID.NAME_NAME}
                            disabled={isLoading || isVoteOpen.current}
                            errorMessage={invalidName}
                            {...bindName}
                        />
                    </div>

                    <div className={C.Style.ADD_ITEM_THUMBNAIL}>
                        <TextField
                            name={C.ID.NAME_THUMBNAIL}
                            disabled={isLoading || isVoteOpen.current}
                            errorMessage={invalidThumbnail} 
                            {...bindThumbnail}
                        />
                    </div>

                    <div className={C.Style.ADD_ITEM_IMAGE}>
                        <TextField
                            name={C.ID.NAME_IMAGE}
                            disabled={isLoading || isVoteOpen.current}
                            errorMessage={invalidImage}
                            {...bindImage}
                        />
                    </div>

                    <div className={C.Style.ADD_ITEM_SUBMIT}>
                        {isLoading &&
                            <div className={C.Style.ADD_ITEM_SUBMIT_PRELOADER} />
                        }

                        <div className={C.Style.ADD_ITEM_SUBMIT_BUTTON}>
                            <Button
                                style={C.Style.BUTTON_SUBMIT_EMPHASIS}
                                onClick={confirmHandler}
                                disabled={isLoading || !isSubmittable.current || isVoteOpen.current}
                            >
                                {C.Label.ADD}
                            </Button>
                        </div>
                    </div>
                </div>
            </Collapsible>
        </>
    );
};

/**
 * Export module
 * 
 */
export default AddItem;