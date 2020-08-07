/**
 * @description ResultDetailTableInfo component.
 * 
 * @requires constants
 * @requires moment
 * @requires prop-types
 * @requires react
 * @requires ResultActiveBadge
 * @public
 * @module
 * 
 */
import * as C from "../../../support/constants";
import Moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import ResultActiveBadge from "../../route/protected/results/ResultActiveBadge";

/**
 * @description Displays Vote document information within the table header of the ResultDetail component.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} The portal rendered to the DOM.
 * @public
 * @function
 * 
 */
const ResultDetailTableInfo = ({

        aggregate,
        date,
        isActive,
        isAnonymous,
        quantity,
        totalCastVotes
    }) => {

    /**
     * JSX markup
     * 
     */
    return (

        <th className={C.Style.RESULT_DETAIL_TABLE_INFO}>
            <div className={C.Style.RESULT_DETAIL_TABLE_INFO_DATE}>
                {Moment(date).format(C.Local.DATE_FORMAT)}
            </div>

            <div className={C.Style.RESULT_DETAIL_TABLE_INFO_QUANTITY}>
                {`${C.Label.QUANTITY}: ${quantity}`}
            </div>

            <div className={C.Style.RESULT_DETAIL_TABLE_INFO_TOTAL}>
                {`${C.Label.TOTAL_VOTES_CAST} ${totalCastVotes}`}
            </div>

            {isAnonymous &&
                <div className={C.Style.RESULT_DETAIL_TABLE_INFO_ANONYMOUS}>
                    {C.Label.SECRET_BALLOT}
                </div>
            }

            {isActive &&
                <div className={C.Style.RESULT_DETAIL_TABLE_INFO_ACTIVE}>
                    <ResultActiveBadge aggregate={aggregate} />
                </div>
            }
        </th>
    );
};

/**
 * Prop Types
 * 
 */
ResultDetailTableInfo.propTypes = {

    aggregate: PropTypes.bool.isRequired,
    date: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    isAnonymous: PropTypes.bool.isRequired,
    quantity: PropTypes.number.isRequired,
    totalCastVotes: PropTypes.number.isRequired
};

/**
 * Export module
 * 
 */
export default ResultDetailTableInfo;




