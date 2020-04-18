/**
 * @description AdminContainer component.
 * 
 * @requires AddItems
 * @requires constants
 * @requires EditItems
 * @requires ManagePolls
 * @requires react
 * @public
 * @module
 * 
 */

import * as C from "../../../../support/constants";
import AddItem from "./AddItem";
import EditItemsContainer from "./edit/EditItemsContainer";
import ManagePolls from "./ManagePolls";
import React from "react";

/**
 * @description The AdminContainer component contains the UI components of the application that are only accessible to users with admin privileges.
 * This component facilitates polling and database Item document management by containing the following components:  ManagePolls, AddItem and EditItemsContainer.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const AdminContainer = () => {

    /**
     * JSX markup
     * 
     */
    return (
        <div className={C.Style.ADMIN_CONTAINER}>
            <div className={C.Style.ADMIN_CONTAINER_MANAGE_POLLS}>
                <ManagePolls />
            </div>

            <div className={C.Style.ADMIN_CONTAINER_ADD_ITEM}>
                <AddItem />
            </div>
            
            <div className={C.Style.ADMIN_CONTAINER_EDIT_ITEMS_CONTAINER}>
                <EditItemsContainer />
            </div>
        </div>
    );
};

/**
 * Export module
 * 
 */
export default AdminContainer;