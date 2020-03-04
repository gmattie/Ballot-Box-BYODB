/**
 * @description ResultDetailTableUserHeader component.
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
 * @description The table header displayed within the ResultDetail component that displays user information including name, email and IP address.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} The portal rendered to the DOM.
 * @public
 * @function
 * 
 */
const ResultDetailTableUserHeader = ({

        name,
        email,
        ip
    }) => {

    /**
     * JSX markup
     * 
     */
    return (

        <th className={C.Style.RESULT_DETAIL_TABLE_USER_HEADER}>
            <div className={C.Style.RESULT_DETAIL_TABLE_USER_HEADER_USER}>
                <span className={C.Style.RESULT_DETAIL_TABLE_USER_HEADER_USER_NAME}>
                    {name}
                </span>
                <span className={C.Style.RESULT_DETAIL_TABLE_USER_HEADER_USER_EMAIL}>
                    {email}
                </span>
                <span className={C.Style.RESULT_DETAIL_TABLE_USER_HEADER_USER_IP}>
                    {ip}
                </span>
            </div>
        </th>
    );
};

/**
 * Prop Types
 * 
 */
ResultDetailTableUserHeader.propTypes = {

    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    ip: PropTypes.string.isRequired
};

/**
 * Export module
 * 
 */
export default ResultDetailTableUserHeader;