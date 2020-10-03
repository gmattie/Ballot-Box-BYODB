/**
 * @description DashboardContainer component.
 * 
 * @requires AddCandidate
 * @requires AdminCredentials
 * @requires Button
 * @requires constants
 * @requires Dialog
 * @requires EditCandidatesContainer
 * @requires EditUser
 * @requires ManageVote
 * @requires ProtectedContainer
 * @requires react
 * @requires useUsers
 * @public
 * @module
 * 
 */

import { LogoutAPI } from "../ProtectedContainer";
import * as C from "../../../../support/constants";
import AddCandidate from "./AddCandidate";
import AdminCredentials from "./AdminCredentials";
import Button from "../../../controls/Button";
import Dialog from "../../../modal/Dialog";
import EditCandidatesContainer from "./editCandidate/EditCandidatesContainer";
import EditUser from "./EditUser";
import ManageVote from "./ManageVote";
import React, { useContext, useState } from "react";
import useUsers from "../../../../hooks/useUsers";
/**
 * @description The DashboardContainer component contains the UI components of the application that are only accessible to users with admin privileges.
 * This component facilitates editing User documents, authenticating User document admin privileges, managing votes and adding or editing Item documents through the following components:
 * EditUser, AdminCredentials, ManageVote, AddCandidate and EditCandidatesContainer.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const DashboardContainer = () => {

    /**
     * Context
     * 
     */
    const logout = useContext(LogoutAPI);

    /**
     * State
     * 
     */
    const [ showDialog, setShowDialog ] = useState(false);

    /**
     * Hooks
     * 
     */
    const { usersSelf } = useUsers();

    /**
     * @description Handler for a dispatched "click" event on the Cancel button.
     * 
     * @function
     * @private
     *  
     */
    const cancelHandler = () => {

        setShowDialog(false);
    };

    /**
     * JSX markup
     * 
     */
    return (
        <div className={C.Style.DASHBOARD_CONTAINER}>
            {showDialog &&
                <Dialog 
                    content={C.Label.CONFIRM_LOGOUT}
                    okCallback={logout}
                    cancelCallback={cancelHandler}
                    dismountCallback={cancelHandler}
                    preloader={{ [C.Event.COMPLETE]: false }}
                />
            }

            <div className={C.Style.DASHBOARD_CONTAINER_EDIT_USER}>
                <EditUser />
            </div>

            {(!usersSelf[C.Model.USER][C.Model.ADMIN])
                ?   <div className={C.Style.DASHBOARD_CONTAINER_ADMIN_CREDENTIALS}>
                        <AdminCredentials />
                    </div>
                :   <>
                        <div className={C.Style.DASHBOARD_CONTAINER_MANAGE_VOTE}>
                            <ManageVote />
                        </div>

                        <div className={C.Style.DASHBOARD_CONTAINER_ADD_CANDIDATE}>
                            <AddCandidate />
                        </div>
                        
                        <div className={C.Style.DASHBOARD_CONTAINER_EDIT_CANDIDATES_CONTAINER}>
                            <EditCandidatesContainer />
                        </div>
                    </>
            }

            <div className={C.Style.DASHBOARD_CONTAINER_LOGOUT}>
                <Button
                    style={C.Style.BUTTON_SUBMIT_EMPHASIS}
                    onClick={() => setShowDialog(true)}
                >
                    {C.Label.LOGOUT}
                </Button>
            </div>
        </div>
    );
};

/**
 * Export module
 * 
 */
export default DashboardContainer;