/**
 * @description ResultDetailTableItemRow component.
 * 
 * @requires constants
 * @requires prop-types
 * @requires react
 * @public
 * @module
 * 
 */
import * as C from "../../../support/constants";
import PropTypes from "prop-types";
import React from "react";

/**
 * @description The table body row displayed within the ResultDetail component that displays score and rank information for an item.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} The portal rendered to the DOM.
 * @public
 * @function
 * 
 */
const ResultDetailTableItemRow = ({

        score,
        itemName,
        ranks
    }) => {

    /**
     * JSX markup
     * 
     */
    return (

        <tr className={C.Style.RESULT_DETAIL_TABLE_ITEM_ROW}>
            <th className={C.Style.RESULT_DETAIL_TABLE_ITEM_ROW_HEADER}>
                <div className={C.Style.RESULT_DETAIL_TABLE_ITEM_ROW_HEADER_ITEM}>
                    {itemName}
                </div>

                <div className={C.Style.RESULT_DETAIL_TABLE_ITEM_ROW_HEADER_SCORE}>
                    {score}
                </div>
            </th>

            {ranks && ranks.map((rank, index) => {

                return (

                    <td
                        key={index}
                        className={C.Style.RESULT_DETAIL_TABLE_ITEM_ROW_RANK}
                    >
                        {rank}
                    </td>
                );
            })}
        </tr>
    );
};

/**
 * Prop Types
 * 
 */
ResultDetailTableItemRow.propTypes = {

    score: PropTypes.number.isRequired,
    itemName: PropTypes.string.isRequired,
    ranks: PropTypes.array
};

/**
 * Export module
 * 
 */
export default ResultDetailTableItemRow;