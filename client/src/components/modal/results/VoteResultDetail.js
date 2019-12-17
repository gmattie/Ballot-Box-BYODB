/**
 * @description VoteResultDetail component.
 * 
 * @requires constants
 * @requires moment
 * @requires Portal
 * @requires prop-types
 * @requires react
 * @requires TableItemRow
 * @requires TableUserHeader
 * @public
 * @module
 * 
 */
import * as C from "../../../support/constants";
import Moment from "moment";
import Portal from "../Portal";
import PropTypes from "prop-types";
import React from "react";
import TableItemRow from "./TableItemRow";
import TableUserHeader from "./TableUserHeader";

/**
 * @description Renders an modal window inside a React Portal.
 * VoteResultDetails must contain a "voteDocument" object to create visual details based on its data and an "okCallback" that is called when the details are clicked.
 * Vote documents that are still flagged as active will continue to fetch data and create updated visual details as new data is received.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} The portal rendered to the DOM.
 * @public
 * @function
 * 
 */
const VoteResultDetail = ({

        voteDocument,
        okCallback
    }) => {

    /**
     * @description Retrieves and array of rank values for the target Item document ID per user.
     * 
     * @param {string} itemID - The ID of the target Item document.
     * @returns {array} An array of rank values.
     * @private
     * @function
     *  
     */
    const getCastRanks = (itemID) => {

        const result = [];
        const quantity = voteDocument[C.Model.QUANTITY];

        voteDocument[C.Model.VOTE].forEach((vote) => {
        
            result.push("");

            for (const cast of vote[C.Model.CAST]) {

                if (cast[C.Model.ITEM][C.Model.ID] === itemID) {

                    result.splice(result.length - 1, 1, quantity - cast[C.Model.RANK]);

                    break;
                }
            }
        });
    
        return result;
    };

    /**
     * JSX markup
     * 
     */
    return (

        <Portal elementID={C.ID.ELEMENT_VOTE_RESULT_DETAIL}>
            <div className={C.Style.VOTE_RESULT_DETAIL} onClick={okCallback}>
                <table className={C.Style.VOTE_RESULT_DETAIL_TABLE}>
                    <thead>
                        <tr>
                            <td colSpan={2} className={C.Style.VOTE_RESULT_DETAIL_TABLE_INFO}>
                                <div className={C.Style.VOTE_RESULT_DETAIL_TABLE_INFO_DATE}>
                                    {Moment(voteDocument[C.Model.DATE]).format(C.Local.DATE_FORMAT)}
                                </div>

                                <div className={C.Style.VOTE_RESULT_DETAIL_TABLE_INFO_QUANTITY}>
                                    {`${C.Label.QUANTITY}: ${voteDocument[C.Model.QUANTITY]}`}
                                </div>
                                
                                {voteDocument[C.Model.ACTIVE] &&
                                    <div className={C.Style.VOTE_RESULT_DETAIL_TABLE_INFO_ACTIVE}>
                                        {C.Label.LIVE.toUpperCase()}
                                    </div>
                                }
                            </td>
                            
                            {voteDocument[C.Model.VOTE].map((vote) => {

                                return (

                                    <TableUserHeader
                                        key={vote[C.Model.ID]}
                                        name={vote[C.Model.USER][C.Model.NAME]}
                                        email={vote[C.Model.USER][C.Model.EMAIL]}
                                        ip={vote[C.Model.USER][C.Model.IP]}
                                    />
                                );
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {voteDocument[C.Model.TOTAL].map((total) => {

                            return (

                                <TableItemRow
                                    key={total[C.Model.ID]}
                                    score={total[C.Model.RANK]}
                                    itemName={total[C.Model.ITEM][C.Model.NAME]}
                                    ranks={getCastRanks(total[C.Model.ITEM][C.Model.ID])}
                                />
                            );
                        })}
                    </tbody>    
                </table>            
            </div>
        </Portal>
    );
};

/**
 * Prop Types
 * 
 */
VoteResultDetail.propTypes = {

    voteDocument: PropTypes.object.isRequired,
    okCallback: PropTypes.func.isRequired,
};

/**
 * Export module
 * 
 */
export default VoteResultDetail;