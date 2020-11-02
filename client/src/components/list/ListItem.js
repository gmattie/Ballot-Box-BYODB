/**
 * @description ListItem component.
 * 
 * @requires constants
 * @requires List
 * @requires prop-types
 * @requires react
 * @requires utilities
 * @requires ViewportImage
 * @public
 * @module
 * 
 */
import { getStyleVariable } from "../../support/utilities";
import { ResizeAPI } from "./List";
import * as C from "../../support/constants";
import PropTypes from "prop-types";
import React, { memo, useContext } from "react";
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
     * Context
     * 
     */
    const isCompactWidth = useContext(ResizeAPI);

    /**
     * @description Combines mandatory List component styling with additional custom styling in order to support spacing between ListItem components.
     * 
     * @param {object} draggableStyle - List component styling provided by the React Beautiful DND library.
     * @param {object} virtualStyle - List component styling provided by the React Window virtualization library.
     * @param {bool} isDragging - A flag set according to user interaction.
     * 
     * @returns {object}
     * @private
     * @function
     * 
     */
    const getStyle = (draggableStyle, virtualStyle, isDragging) => {

        const combined = {

            ...virtualStyle,
            ...draggableStyle
        };
        
        if (!window[C.Global.STYLE_VARIABLE_FORM_GAP]) {

            window[C.Global.STYLE_VARIABLE_FORM_GAP] = parseInt(getStyleVariable(C.StyleVariable.FORM_GAP));
        }

        const gap = window[C.Global.STYLE_VARIABLE_FORM_GAP];

        const result = {

            ...combined,
            height: isDragging
                ? combined.height
                : combined.height - gap,
            left: isDragging
                ? combined.left
                : combined.left + gap,
            width: isDragging
                ? draggableStyle.width
                : `calc(${combined.width} - ${gap * 2}${C.CSS.PX})`,
            marginTop: gap
        };
        
        return result;
    };

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
                ?   (isCompactWidth)
                        ? C.Style.LIST_ITEM_SMALL_ACTIVE
                        : C.Style.LIST_ITEM_ACTIVE
                :   (isCompactWidth)
                        ? C.Style.LIST_ITEM_SMALL
                        : C.Style.LIST_ITEM
            }
            style={getStyle(

                draggableProvided.draggableProps.style,
                virtualStyle,
                isDragging
            )}
            onClick={() => clickHandler(data[C.Model.NAME], data[C.Model.IMAGE])}
        >
            {data[C.Model.THUMBNAIL] &&
                <ViewportImage
                    src={data[C.Model.THUMBNAIL]}
                    alt={data[C.Model.NAME]}
                    placeholder={C.Image.TRANSPARENT_PLACEHOLDER}
                    imageStyle={(isCompactWidth)
                        ? C.Style.LIST_ITEM_SMALL_IMAGE
                        : C.Style.LIST_ITEM_IMAGE
                    }
                    preIntersectionStyle={C.Style.TRANSPARENT}
                    intersectionStyle={C.Style.LIST_ITEM_IMAGE_INTERSECTION}
                    errorStyle={C.Style.LIST_ITEM_IMAGE_ERROR}
                />
            }

            <div
                className={(isDragging)
                    ?   (isCompactWidth) 
                            ? C.Style.LIST_ITEM_SMALL_ACTIVE_TITLE
                            : C.Style.LIST_ITEM_ACTIVE_TITLE
                    :   (isCompactWidth)
                            ? C.Style.LIST_ITEM_SMALL_TITLE
                            : C.Style.LIST_ITEM_TITLE
                }
            >
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