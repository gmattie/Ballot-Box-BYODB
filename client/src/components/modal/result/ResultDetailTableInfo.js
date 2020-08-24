/**
 * @description ResultDetailTableInfo component.
 * 
 * @requires constants
 * @requires prop-types
 * @requires react
 * @requires ResultActiveLabel
 * @requires ResultDateFormat
 * 
 * @public
 * @module
 * 
 */
import * as C from "../../../support/constants";
import PropTypes from "prop-types";
import React from "react";
import ResultActiveLabel from "../../route/protected/results/ResultActiveLabel";
import ResultDateFormat from "../../route/protected/results/ResultDateFormat";

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

    const voteCastLabel = (isAnonymous)
        ? `${C.Label.SECRET_BALLOT} ${C.Label.VOTES_CAST}`
        : C.Label.VOTES_CAST;

    /**
     * JSX markup
     * 
     */
    return (

        <th className={C.Style.RESULT_DETAIL_TABLE_INFO}>
            {(isActive)
                ?   <div className={C.Style.RESULT_DETAIL_TABLE_INFO_ACTIVE}>
                        <ResultActiveLabel aggregate={aggregate} />
                    </div>
                :   <div className={C.Style.RESULT_DETAIL_TABLE_INFO_DATE}>
                        <ResultDateFormat ISODate={date} />
                    </div>
            }

            <div className={C.Style.RESULT_DETAIL_TABLE_INFO_QUANTITY}>
                {`${C.Label.RANK_SELECTIONS}: ${quantity}`}
            </div>

            <div className={C.Style.RESULT_DETAIL_TABLE_INFO_TOTAL}>
                {`${voteCastLabel}: ${totalCastVotes}`}
            </div>
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




