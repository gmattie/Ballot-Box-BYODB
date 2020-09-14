/**
 * @description ResultDetailTableUser component.
 * 
 * @requires Avatar
 * @requires Button
 * @requires constants
 * @requires prop-types
 * @requires react
 * @requires UserDetail
 * @requires ViewportImage
 * @public
 * @module
 * 
 */
import * as C from "../../../support/constants";
import Avatar from "../../../icons/Avatar";
import Button from "../../controls/Button";
import PropTypes from "prop-types";
import React, { useState } from "react";
import UserDetail from "../UserDetail";
import ViewportImage from "../../ViewportImage";

/**
 * @description The table header displayed within the ResultDetail component that displays user information including name, email and IP address.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} The portal rendered to the DOM.
 * @public
 * @function
 * 
 */
const ResultDetailTableUser = ({ user }) => {

    /**
     * State
     * 
     */
    const [ showDialog, setShowDialog ] = useState(false);

    /**
     * @description Handler for dispatched "click" events.
     * 
     * @param {object} event - The event object. 
     * @private
     * @function
     * 
     */
    const clickHandler = (event) => {

        event.stopPropagation();

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
                    avatarURL={user[C.Model.AVATAR]}
                    name={user[C.Model.NAME]}
                    email={user[C.Model.EMAIL]}
                    ip={user[C.Model.IP]}
                    dismountCallback={() => setShowDialog(false)}
                />
            }

            <th className={C.Style.RESULT_DETAIL_TABLE_USER}>
                <div className={C.Style.RESULT_DETAIL_TABLE_USER_INFO}>
                    <div className={C.Style.RESULT_DETAIL_TABLE_USER_INFO_NAME}>
                        {user[C.Model.NAME] &&
                            <Button
                                style={C.Style.BUTTON_SUBMIT}
                                onClick={clickHandler}
                            >
                                {user[C.Model.NAME]}
                            </Button>
                        }
                    </div>
                    <div className={C.Style.RESULT_DETAIL_TABLE_USER_INFO_AVATAR}>
                        <Button
                            style={C.Style.BUTTON_SUBMIT}
                            onClick={clickHandler}
                        >
                            {(user[C.Model.AVATAR])
                                ?   <ViewportImage
                                        src={user[C.Model.AVATAR]}
                                        alt={user[C.Model.NAME]}
                                        placeholder={C.Image.TRANSPARENT_PLACEHOLDER}
                                        imageStyle={C.Style.RESULT_DETAIL_TABLE_USER_INFO_AVATAR_IMAGE}
                                        preIntersectionStyle={C.Style.TRANSPARENT}
                                        intersectionStyle={C.Style.RESULT_DETAIL_TABLE_USER_INFO_AVATAR_IMAGE_INTERSECTION}
                                        errorStyle={C.Style.RESULT_DETAIL_TABLE_USER_INFO_AVATAR_IMAGE_ERROR}
                                        preloaderStyle={C.Style.RESULT_DETAIL_TABLE_USER_INFO_AVATAR_IMAGE_PRELOADER}
                                    />
                                :   <Avatar />
                            }
                        </Button>
                    </div>
                </div>
            </th>
        </>
    );
};

/**
 * Prop Types
 * 
 */
ResultDetailTableUser.propTypes = {

    user: PropTypes.shape({

        [C.Model.AVATAR]: PropTypes.string.isRequired,
        [C.Model.NAME]: PropTypes.string.isRequired,
        [C.Model.EMAIL]: PropTypes.string.isRequired,
        [C.Model.IP]: PropTypes.string.isRequired
    }).isRequired
};

/**
 * Export module
 * 
 */
export default ResultDetailTableUser;