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
    const [ days, setDays ] = useState(null);
    const [ hours, setHours ] = useState(null);
    const [ minutes, setMinutes ] = useState(null);
    const [ seconds, setSeconds ] = useState(null);

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
                : null
        );

        setHours(
            
            (deadline)
                ? deadline[C.Deadline.HOURS]
                : null
        );
        
        setMinutes(
            
            (deadline)
                ? deadline[C.Deadline.MINUTES]
                : null
        );

        setSeconds(
            
            (deadline)
                ? deadline[C.Deadline.SECONDS]
                : null
        );
    }, [deadline]);

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
            
            {(days || hours || minutes || seconds) &&
                <div className={C.Style.VOTE_INFO_DEADLINE}>
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
            }
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