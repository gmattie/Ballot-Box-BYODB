/**
 * @description Admin component.
 * 
 * @requires prop-types
 * @requires react
 * @requires ManagePolls
 * @public
 * @module
 * 
 */

import PropTypes from "prop-types";
import React from "react";
import ManagePools from "./ManagePolls";
import AddItems from "./AddItems";

/**
 * @description
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const Admin = ({ logout }) => {

    /**
     * JSX markup
     * 
     */
    return (

        <>
            <ManagePools logout={logout} />
            <AddItems logout={logout} />
        </>
    );
};

/**
 * Prop Types
 * 
 */
Admin.propTypes = {

    logout: PropTypes.func.isRequired
};

/**
 * Export module
 * 
 */
export default Admin;