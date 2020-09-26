/**
 * @description UserInfo component
 * 

 * @requires Avatar
 * @requires constants
 * @requires react
 * @requires UserDetail
 * @requires useUsers
 * @requires ViewportImage

 * @public
 * @module
 * 
 */

import * as C from "../../../../support/constants";
import Avatar from "../../../../icons/Avatar";
import React, { useState } from "react";
import UserDetail from "../../../../components/modal/UserDetail";
import useUsers from "../../../../hooks/useUsers";
import ViewportImage from "../../../ViewportImage";

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
     * @description Handler for dispatched "click" events.
     * 
     * @private
     * @function
     * 
     */
    const clickHandler = () => {

        setShowDialog(true);
    };

    /**
     * JSX markup
     * 
     */
    return (

        <>
            {showDialog &&
                <UserDetail
                    avatarURL={usersSelf[C.Model.USER][C.Model.AVATAR]}
                    name={usersSelf[C.Model.USER][C.Model.NAME]}
                    email={usersSelf[C.Model.USER][C.Model.EMAIL]}
                    ip={usersSelf[C.Model.USER][C.Model.IP]}
                    dismountCallback={() => setShowDialog(false)}
                />
            }
            
            <div className={C.Style.USER_INFO}>
                <div
                    className={C.Style.USER_INFO_AVATAR}
                    onClick={clickHandler}
                >
                    {(usersSelf[C.Model.USER][C.Model.AVATAR])
                        ?   <ViewportImage
                                src={usersSelf[C.Model.USER][C.Model.AVATAR]}
                                alt={usersSelf[C.Model.USER][C.Model.NAME]}
                                placeholder={C.Image.TRANSPARENT_PLACEHOLDER}
                                imageStyle={C.Style.USER_INFO_AVATAR_IMAGE}
                                intersectionStyle={C.Style.USER_INFO_AVATAR_IMAGE_INTERSECTION}
                                errorStyle={C.Style.USER_INFO_AVATAR_IMAGE_ERROR}
                                preloaderStyle={C.Style.USER_INFO_AVATAR_IMAGE_PRELOADER}
                            />
                        :   <div className={C.Style.USER_INFO_AVATAR_ICON}>
                                <Avatar />
                            </div>
                    }
                </div>

                <div className={C.Style.USER_INFO_DESCRIPTION}>
                    <div className={C.Style.USER_INFO_DESCRIPTION_NAME}>
                        {usersSelf[C.Model.USER][C.Model.NAME]}
                    </div>

                    <div className={C.Style.USER_INFO_DESCRIPTION_EMAIL}>
                        <div className={C.Style.USER_INFO_DESCRIPTION_EMAIL_ENTRY}>
                            <span className={C.Style.USER_INFO_DESCRIPTION_EMAIL_ENTRY_KEY}>
                                {C.Label.EMAIL}:
                            </span>

                            <span className={C.Style.USER_INFO_DESCRIPTION_EMAIL_ENTRY_VALUE}>
                                {usersSelf[C.Model.USER][C.Model.EMAIL]}
                            </span>
                        </div>
                    </div>

                    <div className={C.Style.USER_INFO_DESCRIPTION_IP}>
                        <div className={C.Style.USER_INFO_DESCRIPTION_IP_ENTRY}>
                            <span className={C.Style.USER_INFO_DESCRIPTION_IP_ENTRY_KEY}>
                                {C.Label.IP}:
                            </span>

                            <span className={C.Style.USER_INFO_DESCRIPTION_IP_ENTRY_VALUE}>
                                {usersSelf[C.Model.USER][C.Model.IP]}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

/**
 * Export module
 * 
 */
export default UserInfo;