/**
 * @description AdminContainer component.
 * 
 * @requires prop-types
 * @requires react
 * @requires ManagePolls
 * @requires AddItems
 * @requires EditItems
 * @public
 * @module
 * 
 */

import PropTypes from "prop-types";
import React from "react";
import ManagePolls from "./ManagePolls";
import AddItem from "./AddItem";
import EditItemsContainer from "./edit/EditItemsContainer";

/**
 * @description The AdminContainer component contains the UI components of the application that are only accessible to users with admin privileges.
 * This component facilitates polling and database Item document management by containing the following components:  ManagePolls, AddItem and EditItemsContainer.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const AdminContainer = ({ logout }) => {

    /**
     * JSX markup
     * 
     */
    return (

        <>
            <ManagePolls logout={logout} />
            <AddItem logout={logout} />
            <EditItemsContainer logout={logout} />
        </>
    );
};

/**
 * Prop Types
 * 
 */
AdminContainer.propTypes = {

    logout: PropTypes.func.isRequired
};

/**
 * Export module
 * 
 */
export default AdminContainer;