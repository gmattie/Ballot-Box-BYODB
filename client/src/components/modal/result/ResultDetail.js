/**
 * @description ResultDetail component.
 * 
 * @requires constants
 * @requires Portal
 * @requires prop-types
 * @requires react
 * @requires ResultDetailTableInfo
 * @requires ResultDetailTableItemRow
 * @requires ResultDetailTableUserHeader
 * @requires useAuth
 * @requires useMount
 * @requires useVotes
 * @requires useWebSocket
 * @public
 * @module
 * 
 */
import * as C from "../../../support/constants";
import Portal from "../Portal";
import PropTypes from "prop-types";
import React, { useState } from "react";
import ResultDetailTableInfo from "./ResultDetailTableInfo";
import ResultDetailTableItemRow from "./ResultDetailTableItemRow";
import ResultDetailTableUserHeader from "./ResultDetailTableUserHeader";
import useAuth from "../../../hooks/useAuth";
import useMount from "../../../hooks/useMount";
import useVotes from "../../../hooks/useVotes";
import useWebSocket from "../../../hooks/useWebSocket";

/**
 * @description Renders an modal window inside a React Portal.
 * ResultDetail components must contain a "voteID" to create and display details of the target Vote document and an "okCallback" that is called when the details are clicked.
 * Vote documents that are flagged as active will continue to fetch data and render when new data is received.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} The portal rendered to the DOM.
 * @public
 * @function
 * 
 */
const ResultDetail = ({

        voteID,
        okCallback,
        logout
    }) => {

    /**
     * State
     * 
     */
    const [ isLoading, setIsLoading ] = useState(true);

    /**
     * Hooks
     * 
     */
    const { authError } = useAuth();
    const { onMount } = useMount();

    const {
        
        fetchOne,
        setVotesError,
        setVotesOne,
        votesError,
        votesOne
    } = useVotes();

    const { webSocketMessage } = useWebSocket();

    /**
     * @description Fetch the target Vote document to populate the "votesOne" state.
     * 
     * @private
     * @function
     * 
     */
    const mount = () => {

        window[C.Global.WEB_SOCKET_MESSAGE_RESULT_DETAIL] = null;

        setIsLoading(true);

        setVotesOne(null);
        fetchOne(voteID);
    };

    onMount(mount);

    /**
     * WebSocket event handling
     * Fetches the component data when "voteCast" or "voteClosed" WebSocket messages are broadcast.
     * 
     */
    if (webSocketMessage &&
        webSocketMessage !== window[C.Global.WEB_SOCKET_MESSAGE_RESULT_DETAIL]) {
        
        const isMessageVoteCast = (webSocketMessage === JSON.stringify({ [C.Event.Type.VOTE]: C.Event.VOTE_CAST }));
        const isMessageVoteClosed = (webSocketMessage === JSON.stringify({ [C.Event.Type.VOTE]: C.Event.VOTE_CLOSED }));

        if (isMessageVoteCast || isMessageVoteClosed) {

            fetchOne(voteID);

            window[C.Global.WEB_SOCKET_MESSAGE_RESULT_DETAIL] = (isMessageVoteCast)
                ? null
                : webSocketMessage;
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
     * Vote error
     * Close the component model if the poll is closed without having any cast votes.
     * 
     */
    if (votesError) {

        if (votesError.error === C.Error.VOTE_DOES_NOT_EXIST) {

            setVotesError(null);
            okCallback();
        }
        else {

            setTimeout(() => logout());    
        }
    }

    /**
     * Fetch one vote success
     * Negate the isLoading local state and render the component.
     * 
     */
    if (votesOne && isLoading) {

        setIsLoading(false);
    }

    /**
     * @description Retrieves and array of rank values for the target Item document ID per user.
     * 
     * @param {string} itemID - The ID of the target Item document.
     * @returns {array|null} An array of rank values.
     * @private
     * @function
     *  
     */
    const getCastRanks = (itemID) => {

        if (votesOne[C.Model.ANONYMOUS]) {

            return null;
        }

        const result = [];
        const quantity = votesOne[C.Model.QUANTITY];

        votesOne[C.Model.VOTE].forEach((vote) => {
        
            result.push("");

            for (const cast of vote[C.Model.CAST]) {

                if (cast[C.Model.ITEM][C.Model.ID] === itemID) {

                    result.splice(result.length - 1, 1, quantity - cast[C.Model.RANK]);

                    break;
                }
            }
        });
    
        return result;
    };

    /**
     * JSX markup
     * 
     */
    return (

        <Portal elementID={C.ID.ELEMENT_RESULT_DETAIL}>
            <div className={C.Style.RESULT_DETAIL} onClick={okCallback}>
                <div className={C.Style.RESULT_DETAIL_CONTAINER}>
                    {isLoading &&
                        <div className={C.Style.RESULT_DETAIL_CONTAINER_PRELOADER} />
                    }
                    
                    {votesOne && 
                        <table className={C.Style.RESULT_DETAIL_CONTAINER_TABLE}>
                            <thead>
                                <tr>
                                    <ResultDetailTableInfo
                                        aggregate={votesOne[C.Model.AGGREGATE]}
                                        date={votesOne[C.Model.DATE]}
                                        isActive={votesOne[C.Model.ACTIVE]}
                                        isAnonymous={votesOne[C.Model.ANONYMOUS]}
                                        quantity={votesOne[C.Model.QUANTITY]}
                                        totalCastVotes={votesOne[C.Model.VOTE].length}
                                    />

                                    {(votesOne[C.Model.AGGREGATE] || !votesOne[C.Model.ACTIVE]) &&
                                     !votesOne[C.Model.ANONYMOUS] &&
                                        votesOne[C.Model.VOTE].map((vote) => {

                                            return (

                                                <ResultDetailTableUserHeader
                                                    key={vote[C.Model.ID]}
                                                    name={vote[C.Model.USER][C.Model.NAME]}
                                                    email={vote[C.Model.USER][C.Model.EMAIL]}
                                                    ip={vote[C.Model.USER][C.Model.IP]}
                                                />
                                            );
                                        })
                                    }
                                </tr>
                            </thead>

                            <tbody>
                                {votesOne[C.Model.TOTAL].map((total) => {

                                    return (

                                        <ResultDetailTableItemRow
                                            key={total[C.Model.ID]}
                                            score={total[C.Model.RANK]}
                                            itemName={total[C.Model.ITEM][C.Model.NAME]}
                                            ranks={getCastRanks(total[C.Model.ITEM][C.Model.ID])}
                                        />
                                    );
                                })}
                            </tbody>    
                        </table>
                    }
                </div>
            </div>
        </Portal>
    );
};

/**
 * Prop Types
 * 
 */
ResultDetail.propTypes = {

    voteID: PropTypes.string.isRequired,
    okCallback: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};

/**
 * Export module
 * 
 */
export default ResultDetail;