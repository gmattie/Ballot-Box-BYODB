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
import React, { useState } from "react";
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
     * Applications state
     * 
     */
    const [ items, itemsError, setItems ] = useItems();

    /**
     * Component state
     * 
     */
    const [ targetItem, setTargetItem ] = useState(null);
    const [ renderListItem, setRenderListItem ] = useState({ target: null });

    /**
     * @description Handler for dispatched "dragstart" events from ListItem child components.
     * Sets the "targetItem" component state according to the target ListItem component.
     * 
     * @param {object} event - The drag event object.
     * @param {number} index - The current index of the target ListItem component.
     * @private
     * @function
     * 
     */
    const dragStartHandler = (event, index) => {

        setTargetItem(items[index]);
    };

    /**
     * @description Handler for dispatched "dragenter" events from LitItem child components.
     * Updates the order of items within the "items" application state according to both the dragged and entered ListItem components.
     * 
     * @param {object} event - The drag event object.
     * @param {index} index - The current index of the target ListItem component.
     * @private
     * @function
     * 
     */
    const dragEnterHandler = (event, index) => {
        
        event.preventDefault();
        
        const eventTargetItem = items[index];

        if (targetItem._id !== eventTargetItem._id) {

            const reorderedItems = items.filter((item) => item._id !== targetItem._id);
            reorderedItems.splice(index, 0, targetItem);

            setItems(reorderedItems);
        }
    };

    /**
     * @description Handler for dispatched "mouseleave" events.
     * Ensures that dragged LitItem components will be re-rendered if they are dropped outside of the List component.
     * 
     * @param {object} event - The mouse event object.
     * @private
     * @function
     * 
     */
    const mouseLeaveHandler = (event) => {

        if (targetItem) {

            setRenderListItem({ target: targetItem });
            setTargetItem(null);
        }
    };

    /**
     * JSX markup
     * 
     */
    return (

        <div
            className={C.Style.LIST}
            onMouseLeave={mouseLeaveHandler}
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
                            key={item._id}
                            data={item}
                            index={index}
                            dragStartHandler={dragStartHandler}
                            dragEnterHandler={dragEnterHandler}
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