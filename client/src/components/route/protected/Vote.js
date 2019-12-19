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
 * @requires useUsers
 * @requires useVotes
 * @requires useWebSocket
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
import useUsers from "../../../hooks/useUsers";
import useVotes from "../../../hooks/useVotes";
import useWebSocket from "../../../hooks/useWebSocket";

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
const Vote = ({ logout }) => {

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
    const isVotable = useRef(false);
    const responseUpdate = useRef(false);

    /**
     * Hooks
     * 
     */
    const { authError, setAuthError } = useAuth();
    
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
    
    const { onMount } = useMount();
    const { usersSelf } = useUsers();

    const {

        fetchActive,
        fetchCast,
        setVotesActive,
        setVotesCast,
        votesActive,
        votesCast
    } = useVotes();

    const { webSocketMessage } = useWebSocket();

    /**
     * WebSocket event handling
     * Resets the state of the component when "voteOpened", "voteClosed" or "voteComplete" WebSocket messages are broadcast.
     * 
     */
    
    if (webSocketMessage) {

        const isMessageTypeVote = JSON.parse(webSocketMessage)[C.Event.Type.VOTE];
        const voteCast = JSON.stringify({ [C.Event.Type.VOTE]: C.Event.VOTE_CAST });

        if (isMessageTypeVote &&
            webSocketMessage !== voteCast &&
            webSocketMessage !== window[C.Global.WEB_SOCKET_MESSAGE_VOTE]) {

            setVotesCast(null);
            resetItemLists();
            
            setVotesActive(null);
            fetchActive();

            window[C.Global.WEB_SOCKET_MESSAGE_VOTE] = webSocketMessage;
        }
    }
    
    /**
     * Set isVotable flag
     * Determines if the present state of both "votesActive" and "itemsVote" are sufficient for allowing users to cast votes to the server.
     * 
     */
    isVotable.current = (
        
        (votesActive && votesActive.vote) &&
        (itemsVote && itemsVote.length) &&
        (Math.min(itemsAll.length, votesActive.vote[C.Model.QUANTITY]) <= itemsVote.length)
    );

    /**
     * @description Check if there is an active vote and conditionally update "itemsCandidate" state.
     * Fetching all Item documents is required to initialize or update the "itemsCandidate" state if there are any additions or edits to the Item documents.
     * 
     * @private
     * @function
     * 
     */
    const mount = () => {

        responseUpdate.current = true;

        setVotesActive(null);
        fetchActive();

        if (!itemsCandidate || itemsAdd || itemsEdit) {

            fetchAll();
        }
        else {

            responseUpdate.current = false;
            setIsMounting(false);
        }
    };

    onMount(mount);

    /**
     * Initialize or reset Item data during mount
     * Conditionally populates "votesCast" if a user has already voted and/or resets the "itemsCandidate" and "itemsVote" states to the default values. 
     * 
     */
    if (isMounting &&
        responseUpdate.current &&
        votesActive &&
        itemsAll) {

        if (votesActive && votesActive.vote) {

            const currentUserVote = votesActive.vote[C.Model.VOTE]
                .find((vote) => vote.user === usersSelf.user._id);

            if (currentUserVote) {

                const cast = {

                    [C.Model.CAST]: currentUserVote.cast.map((vote) => {

                        return {
                    
                            [C.Model.ITEM]: vote[C.Model.ITEM],
                            [C.Model.RANK]: vote[C.Model.RANK]
                        };
                    })
                };

                setVotesCast(cast);
            }
            else {

                setVotesCast(null);
            }
        }
        
        if (!itemsCandidate || itemsAdd || itemsEdit) {

            resetItemLists();
        }

        if (itemsAdd) {

            setItemsAdd(null);
        }

        if (itemsEdit) {

            setItemsEdit(null);
        }

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

        resetItemLists();
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
    };

    /**
     * @description Sets the "itemsCandidate" and "itemsVote" states to the default values.
     * Written as a function declaration in order to be hoisted and accessible to the custom hooks above.
     * 
     * @function
     * @private
     * 
     */
    function resetItemLists() {
        
        setItemsCandidate(itemsAll);
        setItemsVote(null);
    }

    /**
     * JSX markup
     * 
     */
    if (votesCast) {

        return (
        
            <div>
                {C.Label.VOTE_CAST}
            </div>
        );
    }

    return (

        <div className={C.Style.VOTE}>
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

                    {(votesActive && votesActive[C.Model.VOTE]) &&
                        <>
                            <button
                                onClick={() => setShowDialog(true)}
                                disabled={isLoading || !isVotable.current}
                            >
                                {C.Label.CAST_VOTE.toUpperCase()}
                            </button>

                            <button
                                onClick={resetItemLists}
                                disabled={isLoading}
                            >
                                {C.Label.RESET.toUpperCase()}
                            </button>
                        </>
                    }
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

    logout: PropTypes.func.isRequired
};

/**
 * Export module
 * 
 */
export default Vote;