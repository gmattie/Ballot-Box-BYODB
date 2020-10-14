/**
 * @description VoteInfo component
 * 

 * @requires constants
 * @requires prop-types
 * @requires react
 * @requires useVotes
 * @requires utilities

 * @public
 * @module
 * 
 */

import { concatClassNames } from "../../../../support/utilities";
import * as C from "../../../../support/constants";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import useVotes from "../../../../hooks/useVotes";

/**
 * @description The VoteInfo component displays information concerning a vote.
 * The status of a vote may be either C.Event.VOTE_OPENED, with optional deadline information,
 * or C.Event.VOTE_CLOSED depending on the "votesActive" state and the WebSocket derived "deadline" prop.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const VoteInfo = ({ deadline }) => {

    /**
     * State
     * 
     */
    const [ days, setDays ] = useState(C.Deadline.ZEROS);
    const [ hours, setHours ] = useState(C.Deadline.ZEROS);
    const [ minutes, setMinutes ] = useState(C.Deadline.ZEROS);
    const [ seconds, setSeconds ] = useState(C.Deadline.ZEROS);

    /**
     * Hooks
     * 
     */
    const { votesActive } = useVotes();

    /**
     * @description Populate the local state by extracting the data from the "deadline" prop.
     * 
     * @private
     * @function
     *  
     */
    useEffect(() => {

        setDays(
            
            (deadline)
                ? deadline[C.Deadline.DAYS]
                : C.Deadline.ZEROS
        );

        setHours(
            
            (deadline)
                ? deadline[C.Deadline.HOURS]
                : C.Deadline.ZEROS
        );
        
        setMinutes(
            
            (deadline)
                ? deadline[C.Deadline.MINUTES]
                : C.Deadline.ZEROS
        );

        setSeconds(
            
            (deadline)
                ? deadline[C.Deadline.SECONDS]
                : C.Deadline.ZEROS
        );
    }, [deadline]);

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.VOTE_INFO}>
            <div className={C.Style.VOTE_INFO_SHADOW_TOP} />

            <div className={C.Style.VOTE_INFO_STATUS}>
                <span className={C.Style.VOTE_INFO_STATUS_KEY}>
                    {C.Label.VOTE_STATUS}:
                </span>
                
                <span className={
                    concatClassNames(
                        C.Style.VOTE_INFO_STATUS_VALUE,
                        (votesActive && votesActive[C.Model.VOTE])
                            ? C.Style.VOTE_INFO_STATUS_VALUE_ACTIVE
                            : C.Style.VOTE_INFO_STATUS_VALUE_INACTIVE
                        )
                    }
                >
                    {(votesActive && votesActive[C.Model.VOTE])
                        ? `${C.Label.ACTIVE} - ${(votesActive[C.Model.VOTE][C.Model.AGGREGATE])
                              ? C.Label.LIVE_UPDATES
                              : C.Label.PENDING_RESULTS
                          }`
                        : C.Label.INACTIVE
                    }
                </span>
            </div>
            
            <div className={
                concatClassNames(
                    C.Style.VOTE_INFO_DEADLINE,
                    ((days    !== C.Deadline.ZEROS) ||
                     (hours   !== C.Deadline.ZEROS) ||
                     (minutes !== C.Deadline.ZEROS) ||
                     (seconds !== C.Deadline.ZEROS))
                        ? C.Style.VOTE_INFO_DEADLINE_SHOW
                        : C.Style.VOTE_INFO_DEADLINE_HIDE
                    )
                }
            >
                <table>
                    <thead>
                        <tr>
                            <td>{C.Label.DAYS}</td>
                            <td>{C.Label.HOURS}</td>
                            <td>{C.Label.MINUTES}</td>
                            <td>{C.Label.SECONDS}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{days}</td>
                            <td>{hours}</td>
                            <td>{minutes}</td>
                            <td>{seconds}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className={C.Style.VOTE_INFO_SHADOW_BOTTOM} />
        </div>
    );
};

/**
 * Prop Types
 * 
 */
VoteInfo.propTypes = {

    deadline: PropTypes.shape({
        
        [C.Deadline.DAYS]: PropTypes.string.isRequired,
        [C.Deadline.HOURS]: PropTypes.string.isRequired,
        [C.Deadline.MINUTES]: PropTypes.string.isRequired,
        [C.Deadline.SECONDS]: PropTypes.string.isRequired,
    })
};

/**
 * Export module
 * 
 */
export default VoteInfo;