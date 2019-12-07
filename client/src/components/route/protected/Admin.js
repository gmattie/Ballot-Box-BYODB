/**
 * @description Admin component.
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
import * as C from "../../../support/constants";
import Collapsible from "../../Collapsible";
import Dialog from "../../modal/Dialog";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useInputText from "../../../hooks/useInputText";
import useVotes from "../../../hooks/useVotes";
import useMount from "../../../hooks/useMount";

/**
 * @description
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const Admin = ({ logout }) => {

    /**
     * State
     * 
     */
    const [ invalidDeadline, setInvalidDeadline ] = useState(false);
    const [ invalidQuantity, setInvalidQuantity ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isPollsLoading, setIsPollsLoading ] = useState(true);
    const [ showDialog, setShowDialog ] = useState(false);

    /**
     * Refs
     * 
     */
    const isPollsModifiable = useRef(false);
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
    } = useInputText(null, confirmPollsHandler);

    const {

        binding: bindQuantity,
        clearValue: clearQuantity,
        value: quantity
    } = useInputText(null, confirmPollsHandler);

    const { onMount } = useMount();

    /**
     * Constants
     * 
     */
    const pollsOpenButton = `${C.Label.OPEN} ${C.Label.POLLS}`;
    const pollsCloseButton = `${C.Label.CLOSE} ${C.Label.POLLS}`;

    /**
     * @description Retrieve the active vote if it exists.
     * The existence of an active vote indicates that polls are currently open.
     * 
     * @private
     * @function
     * 
     */
    const mount = () => {
        
        (async () => {
            
            await fetchActive();

            setIsPollsLoading(false);
        })();
    };

    onMount(mount);

    /**
     * Set isPollsModifiable flag
     * Determines if the present state of text field data is sufficient for submitting to the server.
     * 
     */
    isPollsModifiable.current = (
        
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

        if (submitTarget.current === pollsOpenButton) {

            setAuthError(null);
            setVotesActive(null);

            setInvalidDeadline(null);
            setInvalidQuantity(null);

            responseUpdate.current = true;
            await fetchOpen(deadline, quantity);
        }

        if (submitTarget.current === pollsCloseButton) {

            await fetchClose();
        }

        setIsLoading(false);
    };

    /**
     * @description Displays the confirmation dialog.
     * The ID of the event's target is assigned to the "submitTarget" reference that is used in the dialog's "submitHandler" callback.
     * Written as a function declaration in order to be hoisted and accessible to the custom hooks above.
     * 
     * @param {object} event - The event object. 
     * @function
     * @private
     * 
     */
    function confirmPollsHandler(event) {

        if (isPollsModifiable.current) {

            submitTarget.current = event.target.id;

            setShowDialog(true);
        }
    }

    /**
     * JSX markup
     * 
     */
    return (

        <div>
            {showDialog &&
                <Dialog 
                    message={C.Label.CONFIRM_ADMIN}
                    okCallback={submitHandler}
                    cancelCallback={() => setShowDialog(false)}
                />
            }

            <Collapsible
                title={C.Label.POLLS}
                headerStyle={C.Style.COLLAPSIBLE_HEADER_SECTION}
            >
                {!isPollsLoading &&
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
                                    id={pollsOpenButton}
                                    onClick={confirmPollsHandler}
                                    disabled={isLoading || !isPollsModifiable.current}
                                >
                                    {pollsOpenButton.toUpperCase()}
                                </button>
                            </>
                        }

                        {(votesActive && votesActive.vote) &&
                            <button
                                id={pollsCloseButton}
                                onClick={confirmPollsHandler}
                                disabled={isLoading}
                            >
                                {pollsCloseButton.toUpperCase()}
                            </button>
                        }
                    </>
                }

                {
                    //TODO: Replace with style animation
                    isPollsLoading && <div>LOADING...</div>
                }
            </Collapsible>

            {
                //TODO: Replace with style animation
                isLoading && <div>LOADING...</div>
            }
        </div>
    );
};

/**
 * Prop Types
 * 
 */
Admin.propTypes = {

    logout: PropTypes.func.isRequired
};

/**
 * Export module
 * 
 */
export default Admin;