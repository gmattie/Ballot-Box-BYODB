/**
 * @description ItemDetail component.
 * 
 * @requires constants
 * @requires Portal
 * @requires prop-types
 * @requires react
 * @public
 * @module
 * 
 */
import * as C from "../../support/constants";
import Portal from "./Portal";
import PropTypes from "prop-types";
import React from "react";

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
        okCallback
    }) => {

    /**
     * JSX markup
     * 
     */
    return (

        <Portal elementID={C.ID.ELEMENT_ITEM_DETAIL}>
            <div className={C.Style.ITEM_DETAIL}>

                <img
                    src={imageURL}
                    alt={title}
                    onClick={okCallback}
                />
            
                <div className={C.Style.ITEM_DETAIL_TITLE}>
                    {title}
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

    imageURL: PropTypes.string,
    title: PropTypes.string.isRequired,
    okCallback: PropTypes.func.isRequired,
};

/**
 * Export module
 * 
 */
export default ItemDetail;