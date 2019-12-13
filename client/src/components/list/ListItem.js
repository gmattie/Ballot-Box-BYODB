/**
 * @description ListItem component.
 * 
 * @requires constants
 * @requires prop-types
 * @requires react
 * @requires react-beautiful-dnd
 * @requires ViewportImage
 * @public
 * @module
 * 
 */
import { Draggable } from "react-beautiful-dnd";
import * as C from "../../support/constants";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import ViewportImage from "../ViewportImage";

/**
 * @description The ListItem component displays data passed down as props from the LitItemContainer parent component.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const ListItem = ({ data, index, showItemDetails }) => {

    /**
     * Refs
     * 
     */
    const previousClick = useRef(null);

    /**
     * @description Simulates a double-click event on all devices.
     * A double-click is determined by two clicks occurring within the standard time of 500 milliseconds.
     * 
     * @private
     * @function
     * 
     */
    const doubleClickHandler = () => {

        if (data.image) {

            const currentClick = Date.now();

            if (currentClick - previousClick.current < 500) {

                showItemDetails(data.name, data.image);
            }
            else {

                previousClick.current = currentClick;
            }
        }
    };
 
    /**
     * JSX markup
     * 
     */
    return (
    
        <Draggable
            draggableId={data._id}
            index={index}
        >
            {(provided, snapshot) => {
                
                const className = snapshot.isDragging
                    ? C.Style.LIST_ITEM_ACTIVE
                    : C.Style.LIST_ITEM;
          
                return (

                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={className}
                        style={provided.draggableProps.style}
                        onClick={doubleClickHandler}
                    >
                        <ViewportImage
                            src={data.image}
                            alt={data.name}
                            style={C.Style.VIEWPORT_IMAGE}
                            intersectionStyle={C.Style.VIEWPORT_IMAGE_INTERSECTION}
                            errorStyle={C.Style.VIEWPORT_IMAGE_ERROR}
                        />

                        <div className={C.Style.LIST_ITEM_TITLE}>
                            {data.name}
                        </div>
                    </div>
                );
            }}
        </Draggable>
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

    index: PropTypes.number.isRequired,
    showItemDetails: PropTypes.func.isRequired
};

/**
 * Export module
 * 
 */
export default ListItem;