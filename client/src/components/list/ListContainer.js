/**
 * @description ListContainer component.
 * 
 * @requires constants
 * @requires List
 * @requires react
 * @requires react-beautiful-dnd
 * @requires useItems
 * @public
 * @module
 * 
 */
import { DragDropContext } from "react-beautiful-dnd";
import * as C from "../../support/constants";
import List from "./List";
import React from "react";
import useItems from "../../hooks/useItems";

/**
 * @description The ListContainer component contains two separate List components that can both share and reorder ListItem components via drag and drop functionality.
 * Item data is fetched from /api/items and passed down as a prop to the List components, ListItemContainer components and, finally, the ListItem components.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const ListContainer = () => {

    /**
     * State
     * 
     */
    const {
        
        itemsCandidate,
        itemsError,
        itemsVote,
        setItemsCandidate,
        setItemsVote,
     } = useItems();

    /**
     * @description Reorders and/or transfers item data between the "itemsCandidate" and "itemsVote" List components according to the results of a drag.
     * 
     * @param {object} result - An object containing information about the drag.
     * @private
     * @function
     * 
     */
    const dragEndHandler = (result) => {

        const { source, destination } = result;

        if (!destination) {
            
            return;
        }
    
        if (source.droppableId === destination.droppableId) {

            const dragIndex = source.index;
            const dropIndex = destination.index;
        
            if (dragIndex === dropIndex) {

                return;
            }
        
            const reorderItems = (items) => {

                const result = Array.from(items);
                const [targetItem] = result.splice(dragIndex, 1);
                result.splice(dropIndex, 0, targetItem);

                return result;
            };

            if (source.droppableId === C.ID.LIST_ITEMS_CANDIDATE) {

                const items = reorderItems(itemsCandidate);
                setItemsCandidate(items);
            }
            
            if (source.droppableId === C.ID.LIST_ITEMS_VOTE) {

                const items = reorderItems(itemsVote);
                setItemsVote(items);
            }
        }
        else {

            const transferItem = (droppableSource, droppableDestination) => {

                const sourceItems = ((droppableSource.droppableId === C.ID.LIST_ITEMS_CANDIDATE)
                    ? itemsCandidate
                    : itemsVote)
                   || [];

                const destinationItems = ((droppableDestination.droppableId === C.ID.LIST_ITEMS_VOTE)
                    ? itemsVote
                    : itemsCandidate)
                   || [];

                const sourceItemsCopy = Array.from(sourceItems);
                const [movedItem] = sourceItemsCopy.splice(droppableSource.index, 1);

                const destinationItemsCopy = Array.from(destinationItems);
                destinationItemsCopy.splice(droppableDestination.index, 0, movedItem);

                return {

                    [droppableSource.droppableId]: sourceItemsCopy,
                    [droppableDestination.droppableId]: destinationItemsCopy
                };
            };

            const transferResult = transferItem(source, destination);

            setItemsCandidate(transferResult[C.ID.LIST_ITEMS_CANDIDATE]);
            setItemsVote(transferResult[C.ID.LIST_ITEMS_VOTE]);
        }
    };

    /**
     * JSX markup
     * 
     */
    if (itemsError) {

        return (

            <>{JSON.stringify(itemsError)}</>
        );
    }

    if (itemsCandidate || itemsVote) {

        return (

            <DragDropContext
                onDragEnd={dragEndHandler}
                style={C.Style.LIST_CONTAINER}
            >
                <List
                    ID={C.ID.LIST_ITEMS_CANDIDATE}
                    data={itemsCandidate}
                />
                <List
                    ID={C.ID.LIST_ITEMS_VOTE}
                    data={itemsVote}
                />
            </DragDropContext>
        );
    }

    return null;
};

/**
 * Export module
 * 
 */
export default ListContainer;