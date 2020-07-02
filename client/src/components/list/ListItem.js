/**
 * @description ListItem component.
 * 
 * @requires constants
 * @requires prop-types
 * @requires react
 * @requires ViewportImage
 * @public
 * @module
 * 
 */
import * as C from "../../support/constants";
import PropTypes from "prop-types";
import React, { memo } from "react";
import ViewportImage from "../ViewportImage";

/**
 * @description The ListItem component displays data passed down as props from the List parent component.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */

const ListItem = ({
    
        data,
        draggableProvided,
        virtualStyle,
        isDragging,
        clickHandler,
    }) => {

    /**
     * JSX markup
     * 
     */
    return (

        <div
            {...draggableProvided.draggableProps}
            {...draggableProvided.dragHandleProps}
            ref={draggableProvided.innerRef}
            className={(isDragging)
                ? C.Style.LIST_ITEM_ACTIVE
                : C.Style.LIST_ITEM
            }
            style={{
                
                ...draggableProvided.draggableProps.style,
                ...virtualStyle
            }}
            onClick={() => clickHandler(data[C.Model.NAME], data[C.Model.IMAGE])}
        >
            <ViewportImage
                src={data[C.Model.THUMBNAIL]}
                alt={data[C.Model.NAME]}
                placeholder={C.Image.TRANSPARENT_PLACEHOLDER}
                imageStyle={C.Style.LIST_ITEM_IMAGE}
                preIntersectionStyle={C.Style.TRANSPARENT}
                intersectionStyle={C.Style.LIST_ITEM_IMAGE_INTERSECTION}
                errorStyle={C.Style.LIST_ITEM_IMAGE_ERROR}
            />

            <div className={C.Style.LIST_ITEM_TITLE}>
                {data[C.Model.NAME]}
            </div>
        </div>
    );
};

/**
 * Prop Types
 * 
 */

ListItem.propTypes = {

    data: PropTypes.shape({
        
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string,
        date: PropTypes.string
    }).isRequired,

    draggableProvided: PropTypes.shape({

        innerRef: PropTypes.func.isRequired,
        draggableProps: PropTypes.object,
        dragHandleProps: PropTypes.object
    }).isRequired,

    virtualStyle: PropTypes.object,
    isDragging: PropTypes.bool,
    clickHandler: PropTypes.func
};

/**
 * Export module
 * 
 */
export default memo(ListItem);