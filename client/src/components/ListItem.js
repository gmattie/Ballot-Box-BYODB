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
import * as C from "../support/constants";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import ViewportImage from "./ViewportImage";

/**
 * @description The ListItem component displays data passed down as props from the parent component.
 * To support drag and drop reordering of ListItem components within the parent component, each ListItem component is both a draggable element and a valid drop target.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const ListItem = ({

        data,
        index,
        dragStartHandler,
        dragEnterHandler,
        dropHandler,
        render
    }) => {

    /**
     * State and references
     * 
     */
    const [ style, setStyle ] = useState(C.Style.LIST_ITEM);
    const emptyImage = useRef(new Image());

    /**
     * @description Sets the "style" state to the default value if the component is re-rendered.
     * Re-rendering will occur if the ListItem component is dropped outside the bounds of the parent component.
     * 
     * @private
     * @function
     * 
     */
    useEffect(() => {

        if (data === render.target) {
            
            setStyle(C.Style.LIST_ITEM);
        }
    }, [data, render]);

    /**
     * @description Handler for all dispatched drag events ("dragenter", "dragover", "dragstart" and "drop").
     * Sets the "style" state and/or sends arguments to event handler function props populated by the parent component.
     * 
     * @param {object} event - The drag event object.
     * @private
     * @function
     * 
     */
    const dragHandler = (event) => {

        switch (event.type) {

            case C.Event.DRAG_ENTER:
                event.preventDefault();
                dragEnterHandler(index);

                break;

            case C.Event.DRAG_OVER:
                event.preventDefault();

                break;

            case C.Event.DRAG_START:
                event.dataTransfer.setDragImage(emptyImage.current, 0, 0);
                setStyle(C.Style.LIST_ITEM_ACTIVE);
                dragStartHandler(index);

                break; 

            case C.Event.DROP:
                event.preventDefault();
                setStyle(C.Style.LIST_ITEM);
                dropHandler();

                break;

            default:
                setStyle(C.Style.LIST_ITEM);
        }        
    };

    /**
     * JSX markup
     * 
     */
    return (

        <li
            className={style}
            draggable={true}
            onDragEnter={dragHandler}
            onDragOver={dragHandler}
            onDragStart={dragHandler}
            onDrop={dragHandler}
        >
            <ViewportImage
                src={data.image}
                alt={data.name}
                placeholder={C.Image.PLACEHOLDER}
                style={C.Style.VIEWPORT_IMAGE}
                intersectionStyle={C.Style.VIEWPORT_IMAGE_INTERSECTION}
                errorStyle={C.Style.VIEWPORT_IMAGE_ERROR}
            />
            <span>{data.name}</span>
        </li>
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
    dragStartHandler: PropTypes.func.isRequired,
    dragEnterHandler: PropTypes.func.isRequired,
    dropHandler: PropTypes.func.isRequired,
    render: PropTypes.object
};

/**
 * Export module
 * 
 */
export default ListItem;