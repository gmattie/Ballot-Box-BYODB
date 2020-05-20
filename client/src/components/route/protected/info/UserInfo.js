/**
 * @description UserInfo component
 * 

 * @requires constants
 * @requires react
 * @requires useUsers

 * @public
 * @module
 * 
 */

import * as C from "../../../../support/constants";
import React from "react";
import useUsers from "../../../../hooks/useUsers";

/**
 * @description The UserInfo component displays information about the user.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const UserInfo = () => {

    /**
     * Hooks
     * 
     */
    const { usersSelf } = useUsers();

    /**
     * @description An array of selected keys from the User document model used to display information specific to each key.
     * 
     * @private
     * @constant
     * 
     */
    const infoKeys = [

        C.Model.NAME,
        C.Model.EMAIL,
        C.Model.IP
    ];

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.USER_INFO}>    
            <table className={C.Style.USER_INFO_TABLE}>
                <tbody>
                    {infoKeys.map((item, index) => {

                        return (

                            <tr key={index}>
                                <td>
                                    <span className={C.Style.USER_INFO_TABLE_LABEL}>
                                        {item}:
                                    </span>
                                </td>
                                <td>
                                    {usersSelf.user[item]}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

/**
 * Export module
 * 
 */
export default UserInfo;