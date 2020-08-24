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
import ms from "ms";
import Radio from "../../../controls/Radio";
import React, { useContext, useEffect, useRef, useState } from "react";
import TextField from "../../../controls/TextField";
import Toggle from "../../../controls/Toggle";
import useAuth from "../../../../hooks/useAuth";
import useInputText from "../../../../hooks/useInputText";
import usePersist from "../../../../hooks/usePersist";
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
    const [ invalidDeadline, setInvalidDeadline ] = useState(null);
    const [ invalidQuantity, setInvalidQuantity ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isVoteActive, setIsVoteActive ] = useState(false);
    const [ showDialog, setShowDialog ] = useState(false);

    /**
     * Refs
     * 
     */
    const isMounted = useRef(false);
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

        persistCollapsedManageVote: collapsed,
        persistRadioAggregate: aggregate,
        persistTextDeadline: deadline,
        persistTextQuantity: quantity,
        persistToggleAnonymous: anonymous,

        setPersistCollapsedManageVote: setCollapsed,
        setPersistRadioAggregate: setAggregate,
        setPersistTextDeadline: setDeadline,
        setPersistTextQuantity: setQuantity,
        setPersistToggleAnonymous: setAnonymous,
    } = usePersist();

    const { binding: bindDeadline } = useInputText(
        
        C.Label.DEADLINE,
        confirmHandler,
        null,
        {
            value: deadline,
            setValue: setDeadline
        }
    );

    const { binding: bindQuantity } = useInputText(
        
        C.Label.RANK_SELECTIONS,
        confirmHandler,
        null,
        {
            value: quantity,
            setValue: setQuantity
        }
    );
    
    /**
     * @description Converts a value of milliseconds into a descriptive unit of time.
     * 
     * @param {number} deadline - The value in milliseconds.
     * @returns {string} A descriptive unit of time.
     * @private
     * @function
     * 
     * @example
     * 
     *      const deadlineDescription = createDeadlineDescription(60000)
     *      console.log(deadlineDescription);  // 2 minutes
     * 
     */
    const createDeadlineDescription = (deadline) => {

        const result = (deadline !== 0)
            ? ms(deadline, { long: true })
            : "0";

        return result;
    };

    /**
     * @description Set local state according to the presence of an active vote.
     * 
     * @private
     * @function
     * 
     */
    useEffect(() => {

        setIsVoteActive(
            
            Boolean(votesActive && votesActive[C.Model.VOTE])
        );
    }, [votesActive]);

    /**
     * Persist values on mount
     * Assign the values of UI control components to match the properties of an active vote.
     * 
     */
    if (isVoteActive && !isMounted.current) {

        isMounted.current = true;

        if (deadline === null) {

            const vote = votesActive[C.Model.VOTE];
            const deadlineDescription = createDeadlineDescription(vote[C.Model.DEADLINE]);

            setDeadline(deadlineDescription);
            setQuantity(vote[C.Model.QUANTITY].toString());
            setAggregate(vote[C.Model.AGGREGATE]);
            setAnonymous(vote[C.Model.ANONYMOUS]);
        }
    }

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
     * Vote modification success
     * Clear appropriate text input elements.
     * 
     */
    if (votesActive && votesActive[C.Model.VOTE] && responseUpdate.current) {

        responseUpdate.current = false;

        if (submitTarget.current === C.Label.OPEN) {

            const vote = votesActive[C.Model.VOTE];
            const deadlineDescription = createDeadlineDescription(vote[C.Model.DEADLINE]);

            setDeadline(deadlineDescription);
        }
    }

    /**
     * Vote modification failure
     * Parse the error object to set the appropriate local error states.
     * 
     */
    if (authError && responseUpdate.current) {

        responseUpdate.current = false;

        if (Array.isArray(authError.error)) {
            
            authError.error.forEach((error) => {
                
                const errorMessage = error[C.Error.ERROR_MESSAGE];

                switch (error[C.Error.ERROR_PARAM]) {

                    case C.ID.NAME_DEADLINE:
                        setInvalidDeadline(errorMessage);

                        break;

                    case C.ID.NAME_QUANTITY:
                        setInvalidQuantity(errorMessage);

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
     * @description Displays the confirmation dialog.
     * This callback is assigned to both Button and TextField control components.
     * If the event's target type is C.HTML.InputType.BUTTON, the Button's label is assigned to the "submitTarget" reference.
     * Otherwise, the "submitTarget" reference will default to C.Label.OPEN.
     * Written as a function declaration in order to be hoisted and accessible to the custom hooks above.
     * 
     * @param {object} event - The event object. 
     * @function
     * @private
     * 
     */
    function confirmHandler(event) {

        if (isSubmittable.current) {

            submitTarget.current = (event.target.type === C.HTMLElement.InputType.BUTTON)
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

        setIsLoading(false);
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
                    content={
                        
                        (submitTarget.current === C.Label.OPEN)
                            ? C.Label.CONFIRM_OPEN_VOTE
                            : C.Label.CONFIRM_CLOSE_VOTE
                    }
                    okCallback={submitHandler}
                    cancelCallback={() => setShowDialog(false)}
                />
            }

            <Collapsible
                title={C.Label.MANAGE_VOTE}
                eventHandler={collapsibleHandler}
                collapsed={collapsed}
            >
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