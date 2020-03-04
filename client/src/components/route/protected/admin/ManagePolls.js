/**
 * @description ManagePolls component.
 * 
 * @requires Button
 * @requires Collapsible
 * @requires constants
 * @requires Dialog
 * @requires InputText
 * @requires ms
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
import Button from "../../../controls/Button";
import Collapsible from "../../../controls/Collapsible";
import Dialog from "../../../modal/Dialog";
import InputText from "../../../controls/InputText";
import ms from "ms";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useInputText from "../../../../hooks/useInputText";
import useVotes from "../../../../hooks/useVotes";

/**
 * @description The ManagePolls component contains UI elements that are required to open and close voting polls.
 * The UI elements include text input fields for setting the "deadline" and "quantity", radio and checkbox inputs for setting the "aggregate" and "anonymous" values, and buttons for opening and closing the polls.
 * The "deadline" field accepts a string describing either milliseconds or a time span (https://github.com/zeit/ms).  Example:  "10000", "1h", "2.5 days", etc.
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
    const [ invalidDeadline, setInvalidDeadline ] = useState(null);
    const [ invalidQuantity, setInvalidQuantity ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isMounting, setIsMounting ] = useState(true);
    const [ showDialog, setShowDialog ] = useState(false);
    const [ aggregate, setAggregate ] = useState(false);
    const [ anonymous, setAnonymous ] = useState(false);

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
    } = useInputText(C.Label.DEADLINE, confirmHandler);

    const {

        binding: bindQuantity,
        clearValue: clearQuantity,
        value: quantity
    } = useInputText(C.Label.QUANTITY, confirmHandler);

    /**
     * Set isSubmittable flag
     * Determines if the present state of text data is sufficient for submitting to the server.
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

            setAuthError(null);
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
     * The event target's text content is assigned to the "submitTarget" reference that is used in the "submitHandler" callback.
     * This function is also assigned to the "keyPressEnterCallback" from UseInputText hooks that do not supply an "event" argument.
     * Written as a function declaration in order to be hoisted and accessible to the custom hooks above.
     * 
     * @param {object|null} event - The event object. 
     * @function
     * @private
     * 
     */
    function confirmHandler(event = null) {

        if (isSubmittable.current) {

            submitTarget.current = (event)
                ? event.target.textContent
                : C.Label.OPEN;

            setShowDialog(true);
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

        if (submitTarget.current === C.Label.OPEN) {

            setAuthError(null);
            setVotesActive(null);

            setInvalidDeadline(null);
            setInvalidQuantity(null);

            responseUpdate.current = true;

            await fetchOpen(
                
                ms(deadline),
                quantity,
                aggregate,
                anonymous
            );
        }

        if (submitTarget.current === C.Label.CLOSE) {

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
                        
                        (submitTarget.current === C.Label.OPEN)
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
                <div className={C.Style.MANAGE_POLLS}>
                    {!isMounting &&
                        <>
                            {!(votesActive && votesActive.vote) &&
                                <>
                                    <div className={C.Style.MANAGE_POLLS_DEADLINE}>
                                        <InputText
                                            name={C.ID.NAME_DEADLINE}
                                            disabled={isLoading}
                                            errorMessage={invalidDeadline}
                                            {...bindDeadline}
                                        />
                                    </div>

                                    <div className={C.Style.MANAGE_POLLS_QUANTITY}>
                                        <InputText
                                            name={C.ID.NAME_QUANTITY}
                                            disabled={isLoading}
                                            errorMessage={invalidQuantity}
                                            {...bindQuantity}
                                        />
                                    </div>

                                    <fieldset className={C.Style.MANAGE_POLLS_RESULTS}>
                                        <legend>
                                            {C.Label.RESULTS}
                                        </legend>

                                        <div className={C.Style.MANAGE_POLLS_RESULTS_PENDING}>
                                            <label>
                                                <input
                                                    type={C.HTMLElement.InputType.RADIO}
                                                    name={C.ID.NAME_RESULTS}
                                                    checked={!aggregate}
                                                    onChange={() => setAggregate(false)}
                                                />
                                                {C.Label.PENDING}
                                            </label>
                                        </div>

                                        <div className={C.Style.MANAGE_POLLS_RESULTS_LIVE}>
                                            <label>
                                                <input
                                                    type={C.HTMLElement.InputType.RADIO}
                                                    name={C.ID.NAME_RESULTS}
                                                    checked={aggregate}
                                                    onChange={() => setAggregate(true)}
                                                />
                                                {C.Label.LIVE}
                                            </label>
                                        </div>

                                        <div className={C.Style.MANAGE_POLLS_RESULTS_ANONYMOUS}>
                                            <label>
                                                <input
                                                    type={C.HTMLElement.InputType.CHECKBOX}
                                                    name={C.ID.NAME_ANONYMOUS}
                                                    checked={anonymous}
                                                    onChange={() => setAnonymous(!anonymous)}
                                                />
                                                {C.Label.ANONYMOUS}
                                            </label>
                                        </div>
                                    </fieldset>

                                    <div className={C.Style.MANAGE_POLLS_BUTTON_OPEN}>
                                        <Button
                                            style={C.Style.BUTTON_SUBMIT_EMPHASIS}
                                            onClick={confirmHandler}
                                            disabled={isLoading || !isSubmittable.current}
                                        >
                                            {C.Label.OPEN}
                                        </Button>
                                    </div>
                                </>
                            }

                            {(votesActive && votesActive.vote) &&
                                <div className={C.Style.MANAGE_POLLS_BUTTON_CLOSE}>
                                    <Button
                                        style={C.Style.BUTTON_SUBMIT_EMPHASIS}
                                        onClick={confirmHandler}
                                        disabled={isLoading}
                                    >
                                        {C.Label.CLOSE}
                                    </Button>
                                </div>
                            }
                        </>
                    }

                    {
                        //TODO: Replace with style animation
                        (isMounting || isLoading) && <div>LOADING...</div>
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
ManagePolls.propTypes = {

    logout: PropTypes.func.isRequired
};

/**
 * Export module
 * 
 */
export default ManagePolls;