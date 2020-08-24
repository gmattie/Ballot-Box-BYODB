/**
 * @description ItemDetail component.
 * 
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
import Portal from "./Portal";
import PropTypes from "prop-types";
import React from "react";
import ViewportImage from "../ViewportImage";

/**
 * @description Renders an modal window inside a React Portal.
 * ItemDetails must contain an "imageURL" and "title" for display and an "okCallback" that is called when the image is clicked.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} The portal rendered to the DOM.
 * @public
 * @function
 * 
 */
const ItemDetail = ({

        imageURL,
        title,
        result,
        okCallback
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

        okCallback();
    };
    /**
     * JSX markup
     * 
     */
    return (

        <Portal elementID={C.ID.ELEMENT_ITEM_DETAIL}>
            <div
                className={C.Style.ITEM_DETAIL}
                onClick={clickHandler}
            >
                <ViewportImage
                    src={imageURL}
                    alt={title}
                    placeholder={C.Image.TRANSPARENT_PLACEHOLDER}
                    imageStyle={C.Style.ITEM_DETAIL_IMAGE}
                    preIntersectionStyle={C.Style.TRANSPARENT}
                    intersectionStyle={C.Style.ITEM_DETAIL_IMAGE_INTERSECTION}
                    errorStyle={C.Style.ITEM_DETAIL_IMAGE_ERROR}
                    preloaderStyle={C.Style.ITEM_DETAIL_IMAGE_PRELOADER}
                />

                <div className={C.Style.ITEM_DETAIL_INFO}>
                    <div className={C.Style.ITEM_DETAIL_INFO_TITLE}>
                        {title}
                    </div>

                    {result && 
                        <div className={C.Style.ITEM_DETAIL_INFO_RESULT}>
                            <div className={C.Style.ITEM_DETAIL_INFO_RESULT_ENTRY}>
                                <span className={C.Style.ITEM_DETAIL_INFO_RESULT_ENTRY_KEY}>
                                    {C.Label.RANK}:
                                </span>

                                <span className={C.Style.ITEM_DETAIL_INFO_RESULT_ENTRY_VALUE}>
                                    {result[C.Model.RANK]}
                                </span>
                            </div>

                            <div className={C.Style.ITEM_DETAIL_INFO_RESULT_ENTRY}>
                                <span className={C.Style.ITEM_DETAIL_INFO_RESULT_ENTRY_KEY}>
                                    {C.Label.SCORE}:
                                </span>

                                <span className={C.Style.ITEM_DETAIL_INFO_RESULT_ENTRY_VALUE}>
                                    {result[C.Model.TOTAL]}
                                </span>
                            </div>
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
ItemDetail.propTypes = {

    imageURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    
    result: PropTypes.shape({

        [C.Model.RANK]: PropTypes.number.isRequired,
        [C.Model.TOTAL]: PropTypes.number.isRequired
    }),

    okCallback: PropTypes.func.isRequired,
};

/**
 * Export module
 * 
 */
export default ItemDetail;