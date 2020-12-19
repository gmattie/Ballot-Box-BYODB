/**
 * @description UserDetail component.
 * 
 * @requires Avatar
 * @requires constants
 * @requires Portal
 * @requires prop-types
 * @requires react
 * @requires ViewportImage
 * @public
 * @module
 * 
 */
import * as C from "../../support/constants";
import Avatar from "../../icons/Avatar";
import Portal from "./Portal";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import ViewportImage from "../ViewportImage";

/**
 * @description Renders an modal window inside a React Portal.
 * UserDetail components must contain an "avatarURL", "name", "email" and "ip" for display and a a "dismountCallback" function
 * that is passed down to the Portal child component for removal of the modal window from the DOM.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} The portal rendered to the DOM.
 * @public
 * @function
 * 
 */
const UserDetail = ({

        avatarURL,
        name,
        email,
        ip,
        dismountCallback
    }) => {

    /**
     * Refs
     */
    const portal = useRef(null);

    /**
     * @description Handler for dispatched "click" events.
     * Since this modal component may have sibling modal components it is necessary to stop the propagation of the click event. 
     * 
     * @param {object} event - The event object. 
     * @private
     * @function
     * 
     */
    const clickHandler = (event) => {

        event.stopPropagation();

        portal.current.exit();
    };

    /**
     * JSX markup
     * 
     */
    return (

        <Portal
            ref={portal}
            elementID={C.ID.ELEMENT_ITEM_DETAIL}
            dismountCallback={dismountCallback}
        >
            <div
                className={C.Style.USER_DETAIL}
                onClick={clickHandler}
            >
                {(avatarURL)
                    ?   <ViewportImage
                            src={avatarURL}
                            alt={name}
                            placeholder={C.Image.TRANSPARENT_PLACEHOLDER}
                            imageStyle={C.Style.USER_DETAIL_IMAGE}
                            preIntersectionStyle={C.Style.TRANSPARENT}
                            intersectionStyle={C.Style.USER_DETAIL_IMAGE_INTERSECTION}
                            errorStyle={C.Style.USER_DETAIL_IMAGE_ERROR}
                            preloaderStyle={C.Style.USER_DETAIL_IMAGE_PRELOADER}
                        />
                    :   <div className={C.Style.USER_DETAIL_ICON}>
                            <Avatar />
                        </div>
                }

                <div className={C.Style.USER_DETAIL_INFO}>
                    {(name && email && ip)
                        ?   <>
                                <div className={C.Style.USER_DETAIL_INFO_NAME}>
                                    {name}
                                </div>

                                <div className={C.Style.USER_DETAIL_INFO_EMAIL}>
                                    <div className={C.Style.USER_DETAIL_INFO_EMAIL_ENTRY}>
                                        <span className={C.Style.USER_DETAIL_INFO_EMAIL_ENTRY_KEY}>
                                            {C.Label.EMAIL}:
                                        </span>

                                        <span className={C.Style.USER_DETAIL_INFO_EMAIL_ENTRY_VALUE}>
                                            {email}
                                        </span>
                                    </div>
                                </div>

                                <div className={C.Style.USER_DETAIL_INFO_IP}>
                                    <div className={C.Style.USER_DETAIL_INFO_IP_ENTRY}>
                                        <span className={C.Style.USER_DETAIL_INFO_IP_ENTRY_KEY}>
                                            {C.Label.IP}:
                                        </span>

                                        <span className={C.Style.USER_DETAIL_INFO_IP_ENTRY_VALUE}>
                                            {ip}
                                        </span>
                                    </div>
                                </div>
                            </>
                        :   <div className={C.Style.USER_DETAIL_INFO_MISSING_DATA}>
                                {C.Error.MISSING_DATA}
                            </div>
                    }
                </div>
            </div>
        </Portal>
    );
};

/**
 * Prop Types
 * 
 */
UserDetail.propTypes = {

    avatarURL: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    ip: PropTypes.string,
    dismountCallback: PropTypes.func.isRequired,
};

/**
 * Export module
 * 
 */
export default UserDetail;