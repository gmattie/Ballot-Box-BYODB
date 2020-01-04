/**
 * @description VoteActiveBadge component.
 * 
 * @requires constants
 * @requires prop-types
 * @requires react

 * @public
 * @module
 * 
 */
import * as C from "../../../../support/constants";
import React from "react";
import PropTypes from "prop-types";

/**
 * @description The VoteActiveBadge component denotes either "live" or "pending" results for the active vote.
 * During an open poll, the "live" results option will aggregate cast votes and display updated results in real time
 * while the "pending" results option will aggregate cast votes and display results when the poll is closed.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const VoteActiveBadge = ({ aggregate }) => {

    const style = (aggregate)
        ? C.Style.VOTE_ACTIVE_BADGE_LIVE
        : C.Style.VOTE_ACTIVE_BADGE_PENDING;
    
    const label = (aggregate)
        ? C.Label.LIVE
        : C.Label.PENDING;

    return (

        <div className={`${C.Style.VOTE_ACTIVE_LABEL} ${style}`}>
            {label.toUpperCase()}
        </div>
    );
};

/**
 * Prop Types
 * 
 */
VoteActiveBadge.propTypes = {

    aggregate: PropTypes.bool.isRequired
};

/**
 * Export module
 * 
 */
export default VoteActiveBadge;