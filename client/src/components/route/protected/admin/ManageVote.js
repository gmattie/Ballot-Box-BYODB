/**
 * @description ManageVote component.
 * 
 * @requires Button
 * @requires Collapsible
 * @requires constants
 * @requires Dialog
 * @requires ms
 * @requires ProtectedContainer
 * @requires Radio
 * @requires react
 * @requires TextField
 * @requires Toggle
 * @requires useAuth
 * @requires useInputText
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
import ms from "ms";
import Radio from "../../../controls/Radio";
import React, { useContext, useEffect, useRef, useState } from "react";
import TextField from "../../../controls/TextField";
import Toggle from "../../../controls/Toggle";
import useAuth from "../../../../hooks/useAuth";
import useInputText from "../../../../hooks/useInputText";
import useVotes from "../../../../hooks/useVotes";

/**
 * @description The ManageVote component contains UI elements that are required to open and close a vote.
 * The UI elements include text input fields for setting the "deadline" and "quantity", radio and checkbox inputs for setting the "aggregate" and "anonymous" values, and buttons for opening and closing a vote.
 * The "deadline" field accepts a string describing either milliseconds or a time span (https://github.com/zeit/ms).  Example:  "10000", "1h", "2.5 days", etc.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const ManageVote = () => {

    /**
     * Context
     * 
     */
    const logout = useContext(LogoutAPI);

    /**
     * State
     * 
     */
    const [ aggregate, setAggregate ] = useState(false);
    const [ anonymous, setAnonymous ] = useState(false);
    const [ invalidDeadline, setInvalidDeadline ] = useState(null);
    const [ invalidQuantity, setInvalidQuantity ] = useState(null);
    const [ isVoteActive, setIsVoteActive ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
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

        fetchClose,
        fetchOpen,
        votesActive,
        setVotesActive
    } = useVotes();

    const {
        
        binding: bindDeadline,
        setValue: setDeadline,
        value: deadline
    } = useInputText(C.Label.DEADLINE, confirmHandler);

    const {
        
        binding: bindQuantity,
        setValue: setQuantity,
        value: quantity
    } = useInputText(C.Label.QUANTITY, confirmHandler);
    
    /**
     * @description Persists local state according to the properties of an active vote.
     * 
     * @private
     * @function
     * 
     */
    useEffect(() => {

        if (votesActive && votesActive[C.Model.VOTE]) {

            const activeVote = votesActive[C.Model.VOTE];
            const deadlineTimeFormat = (activeVote[C.Model.DEADLINE] !== 0)
                ? ms(activeVote[C.Model.DEADLINE], { long: true })
                : "0";

            setIsVoteActive(true);
            setDeadline(deadlineTimeFormat);
            setQuantity(activeVote[C.Model.QUANTITY].toString());
            setAggregate(activeVote[C.Model.AGGREGATE]);
            setAnonymous(activeVote[C.Model.ANONYMOUS]);
        }
        else {

            setIsVoteActive(false);
        }
    }, [setDeadline, setQuantity, votesActive]);

    /**
     * Set isSubmittable flag
     * Determines if the present state of text data is sufficient for submitting to the server.
     * 
     */
    isSubmittable.current = (
        
        (deadline && quantity) ||
        isVoteActive
    );    
    
    /**
     * Vote modification failure
     * Parse the error object to set the appropriate local error states.
     * 
     */
    if (authError && responseUpdate.current) {

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
        responseUpdate.current = true;

        if (submitTarget.current === C.Label.OPEN) {

            setAuthError(null);
            setVotesActive(null);

            setInvalidDeadline(null);
            setInvalidQuantity(null);


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

        responseUpdate.current = false;
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
                    content={
                        
                        (submitTarget.current === C.Label.OPEN)
                            ? C.Label.CONFIRM_OPEN_VOTE
                            : C.Label.CONFIRM_CLOSE_VOTE
                    }
                    okCallback={submitHandler}
                    cancelCallback={() => setShowDialog(false)}
                />
            }

            <Collapsible title={C.Label.MANAGE_VOTE}>
                <div className={C.Style.MANAGE_VOTE}>
                    <div className={C.Style.MANAGE_VOTE_DEADLINE}>
                        <TextField
                            name={C.ID.NAME_DEADLINE}
                            disabled={isLoading || isVoteActive}
                            errorMessage={invalidDeadline}
                            {...bindDeadline}
                        />
                    </div>

                    <div className={C.Style.MANAGE_VOTE_QUANTITY}>
                        <TextField
                            name={C.ID.NAME_QUANTITY}
                            disabled={isLoading || isVoteActive}
                            errorMessage={invalidQuantity}
                            {...bindQuantity}
                        />
                    </div>

                    <div className={C.Style.MANAGE_VOTE_PENDING}>
                        <Radio
                            label={C.Label.PENDING_RESULTS}
                            name={C.ID.NAME_RESULTS}
                            checked={!aggregate}
                            disabled={isLoading || isVoteActive}
                            onChange={setAggregate.bind(null, false)}
                        />
                    </div>

                    <div className={C.Style.MANAGE_VOTE_LIVE}>
                        <Radio
                            label={C.Label.LIVE_UPDATES}
                            name={C.ID.NAME_RESULTS}
                            checked={aggregate}
                            disabled={isLoading || isVoteActive}
                            onChange={setAggregate.bind(null, true)}
                        />
                    </div>

                    <div className={C.Style.MANAGE_VOTE_SECRET}>
                        <Toggle
                            label={C.Label.SECRET_BALLOT}
                            checked={anonymous}
                            disabled={isLoading || isVoteActive}
                            onChange={setAnonymous.bind(null, !anonymous)}
                        />
                    </div>

                    <div className={C.Style.MANAGE_VOTE_SUBMIT}>
                        {isLoading &&
                            <div className={C.Style.MANAGE_VOTE_SUBMIT_PRELOADER} />
                        }

                        <div className={C.Style.MANAGE_VOTE_SUBMIT_BUTTON}>
                            <Button
                                style={C.Style.BUTTON_SUBMIT_EMPHASIS}
                                onClick={confirmHandler}
                                disabled={isLoading || !isSubmittable.current}
                            >
                                {(isVoteActive)
                                    ? C.Label.CLOSE
                                    : C.Label.OPEN
                                }
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
export default ManageVote;