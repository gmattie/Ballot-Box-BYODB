/**
 * @description ResultDetailTableItemRow component.
 * 
 * @public
 * @requires Button
 * @requires constants
 * @requires ItemDetail
 * @requires prop-types
 * @requires react
 * @module
 * 
 */
import * as C from "../../../support/constants";
import Button from "../../controls/Button";
import ItemDetail from "../ItemDetail";
import PropTypes from "prop-types";
import React, { useState } from "react";

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

        itemName,
        itemImageURL,
        result,
        ranks
    }) => {

    /**
     * State
     * 
     */
    const [ showDialog, setShowDialog ] = useState(false);

    /**
     * @description Handler for dispatched "click" events.
     * 
     * @param {object} event - The event object. 
     * @private
     * @function
     * 
     */
    const clickHandler = (event) => {

        event.stopPropagation();

        setShowDialog(true);
    };

    /**
     * JSX markup
     * 
     */
    return (
        <>
            {showDialog &&
                <ItemDetail 
                    imageURL={itemImageURL}
                    title={itemName}
                    result={result}
                    dismountCallback={() => setShowDialog(false)}
                />
            }

            <tr className={C.Style.RESULT_DETAIL_TABLE_ITEM_ROW}>
                <th className={C.Style.RESULT_DETAIL_TABLE_ITEM_ROW_HEADER}>
                    <div className={C.Style.RESULT_DETAIL_TABLE_ITEM_ROW_HEADER_CONTAINER}>
                        <div className={C.Style.RESULT_DETAIL_TABLE_ITEM_ROW_HEADER_CONTAINER_ITEM}>
                            <div className={C.Style.RESULT_DETAIL_TABLE_ITEM_ROW_HEADER_CONTAINER_ITEM_NAME}>
                                <Button
                                    style={C.Style.BUTTON_SUBMIT}
                                    onClick={clickHandler}
                                >
                                    {itemName}
                                </Button>
                            </div>

                            <div className={C.Style.RESULT_DETAIL_TABLE_ITEM_ROW_HEADER_CONTAINER_ITEM_SCORE}>
                                <Button
                                    style={C.Style.BUTTON_SUBMIT_EMPHASIS}
                                    onClick={clickHandler}
                                >
                                    {result[C.Model.TOTAL]}
                                </Button>
                            </div>
                        </div>
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
        </>
    );
};

/**
 * Prop Types
 * 
 */
ResultDetailTableItemRow.propTypes = {

    itemName: PropTypes.string.isRequired,
    itemImageURL: PropTypes.string.isRequired,

    result: PropTypes.shape({

        [C.Model.RANK]: PropTypes.number.isRequired,
        [C.Model.TOTAL]: PropTypes.number.isRequired
    }),

    ranks: PropTypes.array
};

/**
 * Export module
 * 
 */
export default ResultDetailTableItemRow;