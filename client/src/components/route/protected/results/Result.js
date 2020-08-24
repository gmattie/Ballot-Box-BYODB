/**
 * @description Result component.
 * 
 * @requires Button
 * @requires constants
 * @requires prop-types
 * @requires react
 * @requires ResultActiveLabel
 * @requires ResultDateFormat

 * @public
 * @module
 * 
 */
import * as C from "../../../../support/constants";
import Button from "../../../controls/Button";
import PropTypes from "prop-types";
import React from "react";
import ResultActiveLabel from "./ResultActiveLabel";
import ResultDateFormat from "./ResultDateFormat";

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

        <div className={C.Style.RESULT}>
            <Button
                style={(voteDocument[C.Model.ACTIVE])
                    ? C.Style.BUTTON_SUBMIT_EMPHASIS
                    : C.Style.BUTTON_SUBMIT
                }
                onClick={clickHandler}
            >
                {(voteDocument[C.Model.ACTIVE])
                    ? <ResultActiveLabel aggregate={voteDocument[C.Model.AGGREGATE]} />
                    : <ResultDateFormat ISODate={voteDocument[C.Model.DATE]} />
                }
            </Button>
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