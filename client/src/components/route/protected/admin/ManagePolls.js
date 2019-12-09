/**
 * @description ManagePolls component.
 * 
 * @requires Collapsible
 * @requires constants
 * @requires Dialog
 * @requires prop-types
 * @requires react
 * @requires useAuth
 * @requires useInputText
 * @requires useVotes
 * @public
 * @module
 * 
 */
import * as C from "../../../../support/constants";
import Collapsible from "../../../Collapsible";
import Dialog from "../../../modal/Dialog";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useInputText from "../../../../hooks/useInputText";
import useVotes from "../../../../hooks/useVotes";

/**
 * @description The ManagePolls component contains UI elements that are required to open and close voting polls.
 * The UI elements include text input fields for setting the "deadline" (in seconds) and "quantity" and buttons for opening and closing the polls.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const ManagePolls = ({ logout }) => {

    /**
     * State
     * 
     */
    const [ invalidDeadline, setInvalidDeadline ] = useState(false);
    const [ invalidQuantity, setInvalidQuantity ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isMounting, setIsMounting ] = useState(true);
    const [ showDialog, setShowDialog ] = useState(false);

    /**
     * Refs
     * 
     */
    const isSubmittable = useRef(false);
    const responseUpdate = useRef(false);
    const submitTarget = useRef(null);

    /**
     * Hooks
     * 
     */
    const { authError, setAuthError } = useAuth();

    const {

        fetchActive,
        fetchClose,
        fetchOpen,
        votesActive,
        setVotesActive
    } = useVotes();

    const {

        binding: bindDeadline,
        clearValue: clearDeadline,
        value: deadline
    } = useInputText();

    const {

        binding: bindQuantity,
        clearValue: clearQuantity,
        value: quantity
    } = useInputText();

    /**
     * Set isSubmittable flag
     * Determines if the present state of text field data is sufficient for submitting to the server.
     * 
     */
    isSubmittable.current = (
        
        (deadline && quantity) ||
        (votesActive && votesActive.vote)
    );    

    /**
     * Polls modification success
     * Clear appropriate text input elements.
     * 
     */
    if (votesActive && responseUpdate.current) {

        responseUpdate.current = false;

        clearDeadline();
        clearQuantity();
    }
    
    /**
     * Polls modification failure
     * Parse the error object to set the appropriate local error states.
     * 
     */
    if (authError && responseUpdate.current) {

        responseUpdate.current = false;

        if (Array.isArray(authError.error)) {
            
            authError.error.forEach((error) => {

                switch (error[C.ID.ERROR_PARAM]) {

                    case C.ID.NAME_DEADLINE:
                        setInvalidDeadline(error[C.ID.ERROR_MESSAGE]);

                        break;

                    case C.ID.NAME_QUANTITY:
                        setInvalidQuantity(error[C.ID.ERROR_MESSAGE]);

                        break;

                    default:
                        throw new Error(error[C.ID.ERROR_MESSAGE]);
                }
            });
        }
        else {

            setTimeout(() => logout());
        }
    }

    /**
     * @description Callback executed each time the collapsed or expanded state of the Collapsible component is updated.
     * 
     * @param {boolean} isCollapsed - Indicates the state of the Collapsible component.
     * @async
     * @private
     * @function
     *  
     */
    const collapsibleHandler = async (isCollapsed) => {

        if (isMounting && !isCollapsed) {

            await fetchActive();
    
            setIsMounting(false);
        }
    };

    /**
     * @description Displays the confirmation dialog.
     * The ID of the event's target is assigned to the "submitTarget" reference that is used in the dialog's "submitHandler" callback.
     * 
     * @param {object} event - The event object. 
     * @function
     * @private
     * 
     */
    const confirmHandler = (event) => {

        if (isSubmittable.current) {

            submitTarget.current = event.target.id;

            setShowDialog(true);
        }
    };

    /**
     * @description Posts the request body to the server.
     * Resets to the initial render by nullifying the "authError" and "votesActive" states and clearing all local error states.
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

        if (submitTarget.current === C.Label.OPEN_POLLS) {

            setAuthError(null);
            setVotesActive(null);

            setInvalidDeadline(null);
            setInvalidQuantity(null);

            responseUpdate.current = true;
            await fetchOpen(deadline, quantity);
        }

        if (submitTarget.current === C.Label.CLOSE_POOLS) {

            await fetchClose();
        }

        setIsLoading(false);
    };

    /**
     * JSX markup
     * 
     */
    return (

        <>
            {showDialog &&
                <Dialog 
                    message={
                        
                        (submitTarget.current === C.Label.OPEN_POLLS)
                            ? C.Label.CONFIRM_OPEN_POLLS
                            : C.Label.CONFIRM_CLOSE_POLLS
                    }
                    okCallback={submitHandler}
                    cancelCallback={() => setShowDialog(false)}
                />
            }

            <Collapsible
                title={C.Label.MANAGE_POOLS}
                headerStyle={C.Style.COLLAPSIBLE_HEADER_SECTION}
                eventHandler={collapsibleHandler}
            >
                {!isMounting &&
                    <>
                        {!(votesActive && votesActive.vote) &&
                            <>
                                <div>
                                    {invalidDeadline && <div>{invalidDeadline}</div>}
                                    <label>
                                        {C.Label.DEADLINE}
                                        <input 
                                            type={C.HTMLElement.InputType.TEXT}
                                            name={C.ID.NAME_DEADLINE}
                                            disabled={isLoading}
                                            {...bindDeadline}
                                        />
                                    </label>
                                </div>

                                <div>
                                    {invalidQuantity && <div>{invalidQuantity}</div>}
                                    <label>
                                        {C.Label.QUANTITY}
                                        <input 
                                            type={C.HTMLElement.InputType.TEXT}
                                            name={C.ID.NAME_QUANTITY}
                                            disabled={isLoading}
                                            {...bindQuantity}
                                        />
                                    </label>
                                </div>

                                <button
                                    id={C.Label.OPEN_POLLS}
                                    onClick={confirmHandler}
                                    disabled={isLoading || !isSubmittable.current}
                                >
                                    {C.Label.OPEN_POLLS.toUpperCase()}
                                </button>
                            </>
                        }

                        {(votesActive && votesActive.vote) &&
                            <button
                                id={C.Label.CLOSE_POOLS}
                                onClick={confirmHandler}
                                disabled={isLoading}
                            >
                                {C.Label.CLOSE_POOLS.toUpperCase()}
                            </button>
                        }
                    </>
                }

                {
                    //TODO: Replace with style animation
                    (isMounting || isLoading) && <div>LOADING...</div>
                }
            </Collapsible>
        </>
    );
};

/**
 * Prop Types
 * 
 */
ManagePolls.propTypes = {

    logout: PropTypes.func.isRequired
};

/**
 * Export module
 * 
 */
export default ManagePolls;