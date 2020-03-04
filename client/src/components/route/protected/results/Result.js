/**
 * @description Result component.
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
import * as C from "../../../../support/constants";
import Moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import ResultActiveBadge from "./ResultActiveBadge";

/**
 * @description The Result component is a clickable list item representing a Vote document.
 * The component title displays the recorded date and, conditionally, the active status of the vote.
 * Clicking the Result component passes the Vote document prop up to the parent component.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const Result = ({

        voteDocument,
        clickCallback
    }) => {

    /**
     * @description Handler for dispatched "click" events.
     * Clicking the component passes the ID of the voteDocument prop back to the clickCallback function prop within the parent component.
     * 
     * @private
     * @function
     * 
     */
    const clickHandler = () => {

        clickCallback(voteDocument[C.Model.ID]);
    };

    /**
     * JSX markup
     * 
     */
    return (

        <div 
            className={C.Style.RESULT}
            onClick={clickHandler}
        >
            {Moment(voteDocument[C.Model.DATE]).format(C.Local.DATE_TIME_FORMAT)}

            {voteDocument[C.Model.ACTIVE] &&
                <ResultActiveBadge aggregate={voteDocument[C.Model.AGGREGATE]} />
            }
        </div>
    );
};

/**
 * Prop Types
 * 
 */
Result.propTypes = {

    voteDocument: PropTypes.object.isRequired,
    clickCallback: PropTypes.func.isRequired,
};

/**
 * Export module
 * 
 */
export default Result;