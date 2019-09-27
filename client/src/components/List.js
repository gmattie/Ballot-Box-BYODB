/**
 * @description List component.
 * 
 * @requires constants
 * @requires ListItem
 * @requires react
 * @requires useItems
 * @public
 * @module
 * 
 */
import * as C from "../support/constants";
import ListItem from "./ListItem";
import React, { useRef, useState } from "react";
import useItems from "../hooks/useItems";

/**
 * @description The List component displays a list of items fetched from from /api/items.
 * Fetched item data and event handlers are passed as props to ListItem child components.
 * ListItem child components can be reordered via drag and drop functionality.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const List = () => {

    /**
     * State and references
     * 
     */
    const [ items, itemsError, setItems ] = useItems();
    const [ renderListItem, setRenderListItem ] = useState({ target: null });
    const targetItemData = useRef(null);

    /**
     * @description Handler called when "dragstart" events are dispatched within ListItem child components.
     * Sets the "targetItemData" reference to the "items" index of the event target ListItem component.
     * 
     * @param {number} index - The current index of the target ListItem component.
     * @private
     * @function
     * 
     */
    const dragStartHandler = (index) => {

        targetItemData.current = items[index];
    };

    /**
     * @description Handler called when "dragenter" events are dispatched within ListItem child components.
     * Updates the order of items within the "items" application state according to both the dragged and entered ListItem components.
     * 
     * @param {index} index - The current index of the target ListItem component.
     * @private
     * @function
     * 
     */
    const dragEnterHandler = (index) => {
        
        const dragData = targetItemData.current;
        const dropData = items[index];

        if (dragData.name !== dropData.name) {

            const reorderedItemData = items.filter((item) => item.name !== dragData.name);
            reorderedItemData.splice(index, 0, dragData);

            setItems(reorderedItemData);
        }
    };

    /**
     * @description Handler called when "drop" events are dispatched within ListItem child components.
     * Resets the "targetItemData" reference to null.
     * 
     * @private
     * @function
     * 
     */
    const dropHandler = () => {

        targetItemData.current = null;
    };

    /**
     * @description Handler for all dispatched mouse events ("mouseup" and "mouseleave").
     * Ensures that the target LitItem components will be re-rendered if it is dropped outside of the List component.
     * 
     * @param {object} event - The mouse event object.
     * @private
     * @function
     * 
     */
    const mouseHandler = (event) => {

        let dragData = targetItemData.current;

        if (dragData) {

            setRenderListItem({ target: dragData });
            dragData = null;
        }
    };

    /**
     * JSX markup
     * 
     */
    return (

        <div
            className={C.Style.LIST}
            onMouseLeave={mouseHandler}
        >
            {(itemsError !== null) && (
                <>
                    {JSON.stringify(itemsError)}
                </>
            )}

            {(items !== null) && (
                <ul>
                    {items.map((item, index) => (
                        <ListItem
                            key={item.name}
                            data={item}
                            index={index}
                            dragStartHandler={dragStartHandler}
                            dragEnterHandler={dragEnterHandler}
                            dropHandler={dropHandler}
                            render={renderListItem}                     
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

/**
 * Export module
 * 
 */
export default List;