/**
 * @description List component.
 * 
 * @requires constants
 * @requires ListItemContainer
 * @requires react
 * @requires react-beautiful-dnd
 * @requires useItems
 * @public
 * @module
 * 
 */
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import * as C from "../../support/constants";
import ListItemContainer from "./ListItemContainer";
import React from "react";
import useItems from "../../hooks/useItems";

/**
 * @description The List component displays a list of items fetched from /api/items and supports item reordering via drag and drop functionality.
 * Fetched item data is passed down as a prop to the ListItemContainer child component, which is then separated and passed down individually to ListItem grandchild components.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const List = () => {

    /**
     * State
     * 
     */
    const [ items, itemsError, setItems ] = useItems();

    /**
     * @description Reorder the "items" state according to the results of a drag.
     * 
     * @param {object} result - An object containing information about the drag.
     * @private
     * @function
     * 
     */
    const dragEndHandler = (result) => {

        if (!result.destination) {
            
            return;
        }
    
        const dragIndex = result.source.index;
        const dropIndex = result.destination.index;
    
        if (dragIndex === dropIndex) {

            return;
        }
    
        const reorderedItems = Array.from(items);
        const [targetItem] = reorderedItems.splice(dragIndex, 1);
        reorderedItems.splice(dropIndex, 0, targetItem);

        setItems(reorderedItems);
    };

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.LIST}>
            {(itemsError !== null) && (
                <>
                    {JSON.stringify(itemsError)}
                </>
            )}

            {(items !== null) && (
                <DragDropContext onDragEnd={dragEndHandler}>
                    <Droppable droppableId={C.ID.LIST}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <ListItemContainer data={items} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
        </div>
    );
};

/**
 * Export module
 * 
 */
export default List;