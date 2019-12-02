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
import React from "react";
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
const ListItem = ({ data, index }) => {

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
                
                const className = snapshot.isDragging ? C.Style.LIST_ITEM_ACTIVE : C.Style.LIST_ITEM;
          
                return (

                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={className}
                        style={provided.draggableProps.style}
                    >
                        <ViewportImage
                            src={data.image}
                            alt={data.name}
                            style={C.Style.VIEWPORT_IMAGE}
                            intersectionStyle={C.Style.VIEWPORT_IMAGE_INTERSECTION}
                            errorStyle={C.Style.VIEWPORT_IMAGE_ERROR}
                        />
                        <span>{data.name}</span>
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
};

/**
 * Export module
 * 
 */
export default ListItem;