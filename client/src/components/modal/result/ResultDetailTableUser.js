/**
 * @description ResultDetailTableUser component.
 * 
 * @requires Avatar
 * @requires Button
 * @requires constants
 * @requires prop-types
 * @requires react
 * @requires ViewportImage
 * @public
 * @module
 * 
 */
import * as C from "../../../support/constants";
import Avatar from "../../../icons/Avatar";
import Button from "../../controls/Button";
import PropTypes from "prop-types";
import React from "react";
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
const ResultDetailTableUser = ({

        name,
        avatarURL
    }) => {

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

        console.log(name);
    };

    /**
     * JSX markup
     * 
     */
    return (

        <th className={C.Style.RESULT_DETAIL_TABLE_USER}>
            <div className={C.Style.RESULT_DETAIL_TABLE_USER_INFO}>
                <div className={C.Style.RESULT_DETAIL_TABLE_USER_INFO_NAME}>
                    <Button
                        style={C.Style.BUTTON_SUBMIT}
                        onClick={clickHandler}
                    >
                        {name}
                    </Button>
                </div>
                <div className={C.Style.RESULT_DETAIL_TABLE_USER_INFO_AVATAR}>
                    <Button
                        style={C.Style.BUTTON_SUBMIT}
                        onClick={clickHandler}
                    >
                        {(avatarURL)
                            ?   <ViewportImage
                                    src={avatarURL}
                                    alt={name}
                                    placeholder={C.Image.TRANSPARENT_PLACEHOLDER}
                                    imageStyle={C.Style.RESULT_DETAIL_TABLE_USER_INFO_AVATAR_IMAGE}
                                    preIntersectionStyle={C.Style.TRANSPARENT}
                                    intersectionStyle={C.Style.RESULT_DETAIL_TABLE_USER_INFO_AVATAR_IMAGE_INTERSECTION}
                                    errorStyle={C.Style.RESULT_DETAIL_TABLE_USER_INFO_AVATAR_IMAGE_ERROR}
                                    preloaderStyle={C.Style.ITEM_DETAIL_IMAGE_PRELOADER}
                                />
                            :   <Avatar />
                        }
                    </Button>
                </div>
            </div>
        </th>
    );
};

/**
 * Prop Types
 * 
 */
ResultDetailTableUser.propTypes = {

    name: PropTypes.string.isRequired,
    avatarURL: PropTypes.string
};

/**
 * Export module
 * 
 */
export default ResultDetailTableUser;