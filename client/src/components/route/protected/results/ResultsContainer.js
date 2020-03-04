/**
 * @description ResultsContainer component.
 * 
 * @requires constants
 * @requires prop-types
 * @requires react
 * @requires Result
 * @requires ResultDetail
 * @requires useAuth
 * @requires useMount
 * @requires useVotes
 * @requires useWebSocket

 * @public
 * @module
 * 
 */
import * as C from "../../../../support/constants";
import PropTypes from "prop-types";
import React, { memo, useRef, useState } from "react";
import Result from "./Result";
import ResultDetail from "../../../modal/result/ResultDetail";
import useAuth from "../../../../hooks/useAuth";
import useMount from "../../../../hooks/useMount";
import useVotes from "../../../../hooks/useVotes";
import useWebSocket from "../../../../hooks/useWebSocket";

/**
 * @description The memoized ResultsContainer component contains a list of Result components.
 * This component facilitates fetching all Vote documents from the database in order to populate the list of Result components.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const ResultsContainer =  ({ logout }) => {

    /**
     * State
     * 
     */
    const [ isLoading, setIsLoading ] = useState(true);
    const [ showDialog, setShowDialog ] = useState(false);

    /**
     * Refs
     * 
     */
    const resultDetailDocumentID = useRef(null);

    /**
     * Hooks
     * 
     */
    const { authError } = useAuth();
    const { onMount } = useMount();
    
    const {

        fetchAll,
        votesAll,
        setVotesAll,
    } = useVotes();

    const { webSocketMessage } = useWebSocket();

    /**
     * @description Fetch all Vote documents to populate the "votesAll" state.
     * 
     * @private
     * @function
     * 
     */
    const mount = () => {

        window[C.Global.WEB_SOCKET_MESSAGE_RESULTS_CONTAINER] = null;

        setIsLoading(true);

        setVotesAll(null);
        fetchAll();
    };

    onMount(mount);

    /**
     * WebSocket event handling
     * Resets the state of the component when "voteOpened" or "voteClosed" WebSocket messages are broadcast.
     * 
     */
    if (webSocketMessage &&
        webSocketMessage !== window[C.Global.WEB_SOCKET_MESSAGE_RESULTS_CONTAINER]) {
        
        const isMessageVoteOpened = (webSocketMessage === JSON.stringify({ [C.Event.Type.VOTE]: C.Event.VOTE_OPENED }));
        const isMessageVoteClosed = (webSocketMessage === JSON.stringify({ [C.Event.Type.VOTE]: C.Event.VOTE_CLOSED }));

        if (isMessageVoteOpened || isMessageVoteClosed) {

            setIsLoading(true);

            setVotesAll(null);
            fetchAll();

            window[C.Global.WEB_SOCKET_MESSAGE_RESULTS_CONTAINER] = webSocketMessage;
        }
    }

    /**
     * Auth failure
     * Logout user if authentication fails while fetching data.
     * 
     */
    if (authError) {

        setTimeout(() => logout());
    }

    /**
     * Fetch all votes success
     * Negate the isLoading local state and render the component.
     * 
     */
    if (votesAll && isLoading) {

        setIsLoading(false);
    }

    /**
     * @description Displays a ResultDetail modal dialog component.
     * 
     * @param {string} voteID - The ID of the target Vote document.
     * @private
     * @function
     * 
     */
    const showResultDetails = (voteID) => {

        resultDetailDocumentID.current = voteID;

        setShowDialog(true);
    };

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.RESULTS_CONTAINER}>
            {showDialog &&
                <ResultDetail 
                    voteID={resultDetailDocumentID.current}
                    okCallback={() => setShowDialog(false)}
                    logout={logout}
                />
            }

            {!isLoading &&
                <>
                    {votesAll && votesAll.map((vote) => {

                        return (
                        
                            <Result
                                key={vote._id}
                                voteDocument={vote}
                                clickCallback={showResultDetails}
                            />
                        );
                    })}
                </>
            }

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
ResultsContainer.propTypes = {

    logout: PropTypes.func.isRequired
};

/**
 * Export module
 * 
 */
export default memo(ResultsContainer);