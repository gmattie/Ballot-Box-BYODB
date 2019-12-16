/**
 * @description VoteResultDetail component.
 * 
 * @requires constants
 * @requires Portal
 * @requires prop-types
 * @requires react
 * @public
 * @module
 * 
 */
import * as C from "../../support/constants";
import Portal from "./Portal";
import PropTypes from "prop-types";
import React from "react";

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
     * JSX markup
     * 
     */
    return (

        <Portal elementID={C.ID.ELEMENT_VOTE_RESULT_DETAIL}>
            <div className={C.Style.VOTE_RESULT_DETAIL} onClick={okCallback}>

                {JSON.stringify(voteDocument)}
            
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