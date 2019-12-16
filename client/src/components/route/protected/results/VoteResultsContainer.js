/**
 * @description VoteResultsContainer component.
 * 
 * @requires constants
 * @requires prop-types
 * @requires react
 * @requires useAuth
 * @requires useMount
 * @requires useVotes
 * @requires useWebSocket
 * @requires voteResult
 * @requires VoteResultDetail

 * @public
 * @module
 * 
 */
import * as C from "../../../../support/constants";
import PropTypes from "prop-types";
import React, { memo, useRef, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useMount from "../../../../hooks/useMount";
import useVotes from "../../../../hooks/useVotes";
import useWebSocket from "../../../../hooks/useWebSocket";
import VoteResult from "./VoteResult";
import VoteResultDetail from "../../../modal/VoteResultDetail";

/**
 * @description The memoized VoteResultsContainer component contains a list of VoteResult components.
 * This component facilitates fetching all Vote documents from the database in order to populate the list of VoteResult components.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const VoteResultsContainer =  ({ logout }) => {

    /**
     * State
     * 
     */
    const [ isMounting, setIsMounting ] = useState(true);
    const [ showDialog, setShowDialog ] = useState(false);

    /**
     * Refs
     * 
     */
    const responseUpdate = useRef(false);
    const voteResultDetailDocument = useRef(null);

    /**
     * Hooks
     * 
     */
    
    const { authError } = useAuth();
    const { onMount } = useMount();
    
    const {

        fetchAll,
        votesAll,
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

        responseUpdate.current = true;

        fetchAll();
    };

    onMount(mount);

    /**
     * WebSocket event handling
     * Resets the state of the component when "voteOpened", "voteClosed" or "voteComplete" WebSocket messages are broadcast.
     * 
     */
    if (webSocketMessage && webSocketMessage !== window[C.Global.WEB_SOCKET_MESSAGE_VOTE_RESULTS_CONTAINER]) {

        const voteOpened = JSON.stringify({ [C.Event.Type.VOTE]: C.Event.VOTE_OPENED });
        const voteClosed = JSON.stringify({ [C.Event.Type.VOTE]: C.Event.VOTE_CLOSED });
        const voteComplete = JSON.stringify({ [C.Event.Type.VOTE]: C.Event.VOTE_COMPLETE });

        if (webSocketMessage === voteOpened ||
            webSocketMessage === voteClosed ||
            webSocketMessage === voteComplete) {

            responseUpdate.current = true;

            fetchAll();

            window[C.Global.WEB_SOCKET_MESSAGE_VOTE_RESULTS_CONTAINER] = webSocketMessage;
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
     * Fetch All Votes Success
     * Negate the responseUpdate ref and render the component
     * 
     */
    if (votesAll && responseUpdate.current) {

        responseUpdate.current = false;

        if (isMounting) {

            setIsMounting(false);
        }
    }

    /**
     * @description Displays visual details based on the Vote document data.
     * 
     * @param {string} voteDocument - The target Vote document.
     * @private
     * @function
     * 
     */
    const showVoteResultDetails = (voteDocument) => {

        voteResultDetailDocument.current = voteDocument;

        setShowDialog(true);
    };

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.VOTE_RESULTS_CONTAINER}>
            {showDialog &&
                <VoteResultDetail 
                    voteDocument={voteResultDetailDocument.current}
                    okCallback={() => setShowDialog(false)}
                />
            }

            {votesAll &&
                <>
                    {votesAll.map((vote) => {

                        return (
                        
                            <VoteResult
                                key={vote._id}
                                voteDocument={vote}
                                clickCallback={showVoteResultDetails}
                            />
                        );
                    })}
                </>
            }

            {
                //TODO: Replace with style animation
                (isMounting) && <div>LOADING...</div>
            }
        </div>
    );
};

/**
 * Prop Types
 * 
 */
VoteResultsContainer.propTypes = {

    logout: PropTypes.func.isRequired
};

/**
 * Export module
 * 
 */
export default memo(VoteResultsContainer);