/**
 * @description ResultActiveLabel component.
 * 
 * @requires constants
 * @requires prop-types
 * @requires react
 * @requires SpanOverflow
 * @requires Wifi

 * @public
 * @module
 * 
 */
import * as C from "../../../../support/constants";
import React from "react";
import PropTypes from "prop-types";
import SpanOverflow from "../../../SpanOverflow";
import Wifi from "../../../../icons/Wifi";

/**
 * @description The ResultActiveLabel component displays either live or pending results for an active vote.
 * During an active vote, the live results option will aggregate cast votes and display updated results in real time
 * while the pending results option will aggregate cast votes and display results when the vote is closed.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const ResultActiveLabel = ({ aggregate }) => {

    const label = (aggregate)
        ? C.Label.LIVE_UPDATES
        : C.Label.PENDING_RESULTS;

    return (

        <div className={C.Style.RESULT_ACTIVE_LABEL}>
            <div className={C.Style.RESULT_ACTIVE_LABEL_TEXT}>
                <SpanOverflow
                    longText={`${C.Label.ACTIVE} ${C.Label.VOTE} - ${label}`}
                    shortText={
                        
                        <SpanOverflow
                            longText={`${C.Label.ACTIVE} - ${label}`}
                            shortText={label}
                        />
                    }
                />
            </div>
            
            <div className={C.Style.RESULT_ACTIVE_LABEL_ICON}>
                <Wifi />
            </div>
        </div>
    );
};

/**
 * Prop Types
 * 
 */
ResultActiveLabel.propTypes = {

    aggregate: PropTypes.bool.isRequired
};

/**
 * Export module
 * 
 */
export default ResultActiveLabel;