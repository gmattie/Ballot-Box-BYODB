/**
 * @description AdminContainer component.
 * 
 * @requires AddItems
 * @requires constants
 * @requires EditItems
 * @requires ManagePolls
 * @requires prop-types
 * @requires react
 * @public
 * @module
 * 
 */

import * as C from "../../../../support/constants";
import AddItem from "./AddItem";
import EditItemsContainer from "./edit/EditItemsContainer";
import ManagePolls from "./ManagePolls";
import PropTypes from "prop-types";
import React from "react";

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
        <div className={C.Style.ADMIN_CONTAINER}>
            <div className={C.Style.ADMIN_CONTAINER_MANAGE_POLLS}>
                <ManagePolls logout={logout}/>
            </div>

            <div className={C.Style.ADMIN_CONTAINER_ADD_ITEM}>
                <AddItem logout={logout}/>
            </div>
            
            <div className={C.Style.ADMIN_CONTAINER_EDIT_ITEMS_CONTAINER}>
                <EditItemsContainer logout={logout}/>
            </div>
        </div>
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