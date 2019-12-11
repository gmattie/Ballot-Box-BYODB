/**
 * @description Vote component
 * 
 * @requires constants
 * @requires Dialog
 * @requires ListContainer
 * @requires prop-types
 * @requires react
 * @requires useAuth
 * @requires useItems
 * @requires useMount
 * @requires useVotes
 * @public
 * @module
 * 
 */
import * as C from "../../../support/constants";
import Dialog from "../../modal/Dialog";
import ListContainer from "../../list/ListContainer";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useItems from "../../../hooks/useItems";
import useMount from "../../../hooks/useMount";
import useVotes from "../../../hooks/useVotes";

/**
 * @description The Vote component contains UI elements that are required to browse votable items and/or cast votes.
 * The UI elements include List components for displaying and sorting draggable Item documents,
 * a button to reset the "itemsCandidate" and "itemsVote" states to their default values and a button for casting votes to the server.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const Vote = ({
    
        logout,
        webSocketMessage
    }) => {

    /**
     * State
     * 
     */
    const [ invalidCast, setInvalidCast ] = useState(null);
    const [ invalidItem, setInvalidItem ] = useState(null);
    const [ invalidRank, setInvalidRank ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isMounting, setIsMounting ] = useState(true);
    const [ showDialog, setShowDialog ] = useState(false);

    /**
     * Refs
     * 
     */
    const previousWebSocketMessage = useRef(null);
    const responseUpdate = useRef(false);
    const isVotable = useRef(false);

    /**
     * Hooks
     * 
     */
    const { authError, setAuthError } = useAuth();
    const { onMount } = useMount();
    
    const {
        
        fetchAll,
        itemsAdd,
        itemsAll,
        itemsCandidate,
        itemsEdit,
        itemsVote,
        setItemsAdd,
        setItemsCandidate,
        setItemsEdit,
        setItemsVote,
    } = useItems();
    
    const {

        fetchActive,
        fetchCast,
        setVotesCast,
        votesActive,
        votesCast
    } = useVotes();

    /**
     * Set isVotable flag
     * Determines if the present state of both "votesActive" and "itemsVote" are sufficient for allowing users to cast votes to the server.
     * 
     */
    if ((webSocketMessage === C.Event.VOTE_OPENED && previousWebSocketMessage.current !== C.Event.VOTE_OPENED) || 
        (webSocketMessage === C.Event.VOTE_CLOSED && previousWebSocketMessage.current !== C.Event.VOTE_CLOSED)) {
        
        previousWebSocketMessage.current = webSocketMessage;
        
        fetchActive();
    }

    isVotable.current = (
        
        (votesActive && votesActive[C.ID.NAME_VOTE]) &&
        (itemsVote && itemsVote.length) &&
        (votesActive[C.ID.NAME_VOTE][C.ID.NAME_QUANTITY] <= itemsVote.length)
    );

    /**
     * @description Retrieves all Item documents if List data is null or if Item documents contain additions and/or updates.
     * Fetching all Item documents is required to initialize the "itemsCandidate" state.
     * 
     * @private
     * @function
     * 
     */
    const mount = () => {

        if (!itemsCandidate) {

            responseUpdate.current = true;
            fetchAll();
        }
        else if (itemsAdd || itemsEdit) {

            setItemsAdd(null);
            setItemsEdit(null);

            responseUpdate.current = true;
            fetchAll();
        }
        else {

            setIsMounting(false);
        }
    };

    onMount(mount);

    /**
     * Initialize or reset List data
     * Sets the "itemsCandidate" and "itemsVote" states to the default values. 
     * 
     */
    if (isMounting && itemsAll && responseUpdate.current) {

        resetHandler();

        responseUpdate.current = false;
        setIsMounting(false);
    }

    /**
     * Vote cast success
     * Sets the "itemsCandidate" and "itemsVote" states to the default values. 
     * 
     */
    if (votesCast && responseUpdate.current) {

        responseUpdate.current = false;

        resetHandler();
    }

    /**
     * Vote cast failure
     * Parse the error object to set the appropriate local error states.
     * 
     */
    if (authError && responseUpdate.current) {

        responseUpdate.current = false;

        if (Array.isArray(authError.error)) {
            
            authError.error.forEach((error) => {

                switch (error[C.ID.ERROR_PARAM]) {

                    case C.ID.NAME_CAST:
                        setInvalidCast(error[C.ID.ERROR_MESSAGE]);

                        break;

                    default:
                        switch (/[^.]*$/.exec(error[C.ID.ERROR_PARAM])[0]) {

                            case C.ID.NAME_ITEM:
                                setInvalidItem(error[C.ID.ERROR_MESSAGE]);

                                break;

                            case C.ID.NAME_RANK:
                                setInvalidRank(error[C.ID.ERROR_MESSAGE]);

                                break;

                            default:
                                throw new Error(error[C.ID.ERROR_MESSAGE]);
                        }
                }
            });
        }
        else {

            setTimeout(() => logout());
        }
    }

    /**
     * @description Posts the request body to the server.
     * Resets to the initial render by nullifying the "authError" and "votesCast" states and clearing all local error states.
     * Function executes asynchronously to facilitate the local loading state.
     * 
     * @async
     * @function
     * @private
     *  
     */
    const submitHandler = async () => {

        if (isVotable.current) {

            setShowDialog(false);

            setAuthError(null);
            setVotesCast(null);

            setInvalidCast(null);
            setInvalidItem(null);
            setInvalidRank(null);
            setIsLoading(true);

            responseUpdate.current = true;
            await fetchCast(itemsVote);

            setIsLoading(false);
        }
    };

    /**
     * @description Displays the confirmation dialog.
     * 
     * @function
     * @private
     * 
     */
    const confirmHandler = () => {

        if (isVotable.current) {

            setShowDialog(true);
        }
    };

    /**
     * @description Reset the candidates and votes list to their default values.
     * Written as a function declaration in order to be hoisted and accessible to the custom hooks above.
     * 
     * @function
     * @private
     * 
     */
    function resetHandler() {
        
        setItemsCandidate(itemsAll);
        setItemsVote(null);
    }

    /**
     * JSX markup
     * 
     */
    return (

        <div>
            {showDialog &&
                <Dialog 
                    message={C.Label.CONFIRM_VOTE}
                    okCallback={submitHandler}
                    cancelCallback={() => setShowDialog(false)}
                />
            }
            
            {!isMounting &&
                <>
                    {invalidCast && <div>{invalidCast}</div>}
                    {invalidItem && <div>{invalidItem}</div>}
                    {invalidRank && <div>{invalidRank}</div>}

                    <ListContainer />

                    <button
                        onClick={confirmHandler}
                        disabled={isLoading || !isVotable.current}
                    >
                        {C.Label.CAST_VOTE.toUpperCase()}
                    </button>

                    <button
                        onClick={resetHandler}
                        disabled={isLoading}
                    >
                        {C.Label.RESET.toUpperCase()}
                    </button>
                </>
            }

            {
                //TODO: Replace with style animation
                (isMounting || isLoading) && <div>LOADING...</div>
            }
        </div>
    );
};

/**
 * Prop Types
 * 
 */
Vote.propTypes = {

    logout: PropTypes.func.isRequired,
    webSocketMessage: PropTypes.string.isRequired
};

/**
 * Export module
 * 
 */
export default Vote;