/**
 * @description VoteInfo component
 * 

 * @requires constants
 * @requires prop-types
 * @requires react
 * @requires useVotes

 * @public
 * @module
 * 
 */

import * as C from "../../../../support/constants";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import useVotes from "../../../../hooks/useVotes";

/**
 * @description The VoteInfo component displays information concerning a vote.
 * The status of a vote may be either "Open", with optional deadline information, or "Closed,
 * which is dependant on the "votesActive" state and the WebSocket derived "deadlineMessage" prop.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const VoteInfo = ({ deadlineMessage }) => {

    /**
     * State
     * 
     */
    const [ deadlineDays, setDeadlineDays ] = useState(null);
    const [ deadlineHours, setDeadlineHours ] = useState(null);
    const [ deadlineMinutes, setDeadlineMinutes ] = useState(null);
    const [ deadlineSeconds, setDeadlineSeconds ] = useState(null);

    /**
     * Hooks
     * 
     */
    const { votesActive } = useVotes();

    /**
     * @description Extract time data from a JSON stringified websocket "deadline" message.
     * The websocket "deadline" message string resembles the following:
     * 
     *     "{"deadline":{"days":"00","hours":"00","minutes":"00","seconds":"00"}}"
     * 
     * @param {string|null} message - The websocket message to parse.
     * @private
     * @function
     *  
     */
    useEffect(() => {

        const deadline = (deadlineMessage)
            ? JSON.parse(deadlineMessage)[C.Event.Type.DEADLINE]
            : { 
                  [C.ID.DEADLINE_DAYS]: null,
                  [C.ID.DEADLINE_HOURS]: null,
                  [C.ID.DEADLINE_MINUTES]: null,
                  [C.ID.DEADLINE_SECONDS]: null
              };

        setDeadlineDays(deadline[C.ID.DEADLINE_DAYS]);
        setDeadlineHours(deadline[C.ID.DEADLINE_HOURS]);
        setDeadlineMinutes(deadline[C.ID.DEADLINE_MINUTES]);
        setDeadlineSeconds(deadline[C.ID.DEADLINE_SECONDS]);
    }, [deadlineMessage]);

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.VOTE_INFO}>
            <div className={C.Style.VOTE_INFO_STATUS}>
                <span className={C.Style.VOTE_INFO_STATUS_LABEL}>
                    {C.Label.VOTE_STATUS}
                </span>
                
                {    
                    (votesActive && votesActive[C.Model.VOTE])
                        ? C.Label.OPEN
                        : C.Label.CLOSED
                }
            </div>
            
            {(deadlineDays || deadlineHours || deadlineMinutes || deadlineSeconds) &&
                <div className={C.Style.VOTE_INFO_DEADLINE}>
                    <table>
                        <thead>
                            <tr>
                                <td>{C.Label.DEADLINE_DAYS}</td>
                                <td>{C.Label.DEADLINE_HOURS}</td>
                                <td>{C.Label.DEADLINE_MINUTES}</td>
                                <td>{C.Label.DEADLINE_SECONDS}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{deadlineDays}</td>
                                <td>{deadlineHours}</td>
                                <td>{deadlineMinutes}</td>
                                <td>{deadlineSeconds}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
};

/**
 * Prop Types
 * 
 */
VoteInfo.propTypes = {

    deadlineMessage: PropTypes.string,
};

/**
 * Export module
 * 
 */
export default VoteInfo;