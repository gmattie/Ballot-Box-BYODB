/**
 * @description AdminContainer component.
 * 
 * @requires AddItems
 * @requires constants
 * @requires EditItems
 * @requires ManageVote
 * @requires react
 * @public
 * @module
 * 
 */

import * as C from "../../../../support/constants";
import AddItem from "./AddItem";
import EditItemsContainer from "./edit/EditItemsContainer";
import ManageVote from "./ManageVote";
import React from "react";

/**
 * @description The AdminContainer component contains the UI components of the application that are only accessible to users with admin privileges.
 * This component facilitates centralized voting and database Item document management through the following components:  ManageVote, AddItem and EditItemsContainer.
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
            <div className={C.Style.ADMIN_CONTAINER_MANAGE_VOTE}>
                <ManageVote />
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