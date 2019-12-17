/**
 * @description ListContainer component.
 * 
 * @requires constants
 * @requires List
 * @requires react
 * @requires react-beautiful-dnd
 * @requires useItems
 * @requires useVotes
 * @public
 * @module
 * 
 */
import { DragDropContext } from "react-beautiful-dnd";
import * as C from "../../support/constants";
import List from "./List";
import React from "react";
import useItems from "../../hooks/useItems";
import useVotes from "../../hooks/useVotes";

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
        
        itemsAll,
        itemsCandidate,
        itemsVote,
        setItemsCandidate,
        setItemsVote,
    } = useItems();

    const { votesActive } = useVotes();

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
     * @description Retrieves the title of the "itemsVote" list with updated vote count.
     * 
     * @private
     * @function
     * 
     */
    const getVotesListTitle = () => {

        const quantity = Math.min(itemsAll.length, votesActive[C.Model.VOTE][C.Model.QUANTITY]);
        const count = Math.min((itemsVote) ? itemsVote.length : 0, quantity);

        return `${C.Label.VOTES} (${count}/${quantity})`;
    };

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.LIST_CONTAINER}>
            {(itemsCandidate || itemsVote) &&
                <DragDropContext onDragEnd={dragEndHandler}>
                    <List
                        ID={C.ID.LIST_ITEMS_CANDIDATE}
                        title={C.Label.CANDIDATES}
                        data={itemsCandidate}
                    />

                    {(votesActive && votesActive[C.Model.VOTE]) &&
                        <List
                            ID={C.ID.LIST_ITEMS_VOTE}
                            title={getVotesListTitle()}
                            data={itemsVote}
                        />
                    }
                </DragDropContext>
            }
        </div>
    );
};

/**
 * Export module
 * 
 */
export default ListContainer;