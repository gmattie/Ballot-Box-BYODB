/**
 * @description ResultDateFormat component.
 * 
 * @requires constants
 * @requires date-fns
 * @requires prop-types
 * @requires react
 * @requires SpanOverflow
 * @public
 * @module
 * 
 */
import { format, parseISO } from "date-fns";
import * as C from "../../../../support/constants";
import PropTypes from "prop-types";
import React from "react";
import SpanOverflow from "../../../SpanOverflow";

/**
 * @description The ResultDateFormat component parses and formats an ISO date string.
 * The component contains nested SpanOverflow components to support multiple format lengths.
 * As the component is responsive, the format used is dependant on the available container width. 
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const ResultDateFormat = ({ ISODate }) => {

    const parsedDate = parseISO(ISODate);

    /**
     * JSX markup
     * 
     */
    return (

        <SpanOverflow
            longText={format(parsedDate, C.Date.FORMAT_LONG)}
            shortText={
                
                <SpanOverflow
                    longText={format(parsedDate, C.Date.FORMAT_MEDIUM)}
                    shortText={
                
                        <SpanOverflow
                            longText={format(parsedDate, C.Date.FORMAT_SHORT)}
                            shortText={format(parsedDate, C.Date.FORMAT_COMPACT)}
                        />
                    }
                />
            }
        />
    );
};

/**
 * Prop Types
 * 
 */
ResultDateFormat.propTypes = {

    ISODate: PropTypes.string.isRequired
};

/**
 * Export module
 * 
 */
export default ResultDateFormat;