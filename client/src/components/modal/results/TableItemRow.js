/**
 * @description TableItemRow component.
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
 * @description The body row displayed within the table of the VoteResultDetail.
 * This table row displays score and rank information for an item.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} The portal rendered to the DOM.
 * @public
 * @function
 * 
 */
const TableItemRow = ({

        score,
        itemName,
        ranks
    }) => {

    /**
     * JSX markup
     * 
     */
    return (

        <tr className={C.Style.TABLE_ITEM_ROW}>
            <th className={C.Style.TABLE_ITEM_ROW_HEADER}>
                <div className={C.Style.TABLE_ITEM_ROW_HEADER_ITEM}>
                    {itemName}
                </div>

                <div className={C.Style.TABLE_ITEM_ROW_HEADER_SCORE}>
                    {score}
                </div>
            </th>

            {ranks && ranks.map((rank, index) => {

                return (

                    <td
                        key={index}
                        className={C.Style.TABLE_ITEM_ROW_RANK}
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
TableItemRow.propTypes = {

    score: PropTypes.number.isRequired,
    itemName: PropTypes.string.isRequired,
    ranks: PropTypes.array
};

/**
 * Export module
 * 
 */
export default TableItemRow;