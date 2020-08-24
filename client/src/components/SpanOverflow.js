/**
 * @description SpanOverflow component.
 * 
 * @requires constants
 * @requires prop-types
 * @requires react
 * @public
 * @module
 * 
 */
import * as C from "../support/constants";
import PropTypes from "prop-types";
import React from "react";

/**
 * @description The SpanOverflow component is a responsive HTMLSpanElement that substitutes long overflown text content with short text content.
 * After the "longText" prop is replaced with the "shortText" prop the text can continue to overflow with an ellipsis. 
 * This component supports nesting itself as a "shortText" prop to allow for multiple text content lengths.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const SpanOverflow = ({

        longText,
        shortText
    }) => {

    /**
     * JSX markup
     * 
     */
    return (

        <span className={C.Style.SPAN_OVERFLOW}>
            <span
                className={C.Style.SPAN_OVERFLOW_SHORT}
                aria-hidden={true}
                title={longText}
            >
                {shortText}
            </span>

            <span className={C.Style.SPAN_OVERFLOW_LONG}>
                {longText}
            </span>
        </span>
    );
};

/**
 * Prop Types
 * 
 */
SpanOverflow.propTypes = {

    longText: PropTypes.oneOfType([

        PropTypes.string,
        PropTypes.element
    ]).isRequired,

    shortText: PropTypes.oneOfType([

        PropTypes.string,
        PropTypes.element
    ]).isRequired,
};

/**
 * Export module
 * 
 */
export default SpanOverflow;