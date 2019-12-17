/**
 * @description TableUserHeader component.
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
 * @description The header cells displayed within the table of the VoteResultDetail.
 * This table cell displays user information including name, email and IP address.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} The portal rendered to the DOM.
 * @public
 * @function
 * 
 */
const TableUserHeader = ({

        name,
        email,
        ip
    }) => {

    /**
     * JSX markup
     * 
     */
    return (

        <th className={C.Style.TABLE_USER_HEADER}>
            <div className={C.Style.TABLE_USER_HEADER_USER}>
                <span className={C.Style.TABLE_USER_HEADER_USER_NAME}>
                    {name}
                </span>
                <span className={C.Style.TABLE_USER_HEADER_USER_EMAIL}>
                    {email}
                </span>
                <span className={C.Style.TABLE_USER_HEADER_USER_IP}>
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
TableUserHeader.propTypes = {

    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    ip: PropTypes.string.isRequired
};

/**
 * Export module
 * 
 */
export default TableUserHeader;