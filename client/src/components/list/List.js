/**
 * @description List component.
 * 
 * @requires constants
 * @requires ListItemContainer
 * @requires PropTypes
 * @requires react
 * @requires react-beautiful-dnd
 * @public
 * @module
 * 
 */
import { Droppable } from "react-beautiful-dnd";
import * as C from "../../support/constants";
import ListItemContainer from "./ListItemContainer";
import PropTypes from "prop-types";
import React from "react";

/**
 * @description The List component displays a list of items fetched from /api/items and supports item reordering via drag and drop functionality.
 * Fetched item data is passed down as a prop to the ListItemContainer child component, which is then separated and passed down individually to ListItem grandchild components.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const List = ({ ID, data }) => {

    /**
     * JSX markup
     * 
     */
    return (

        <Droppable droppableId={ID}>
            {(provided) => (
                <div
                    className={C.Style.LIST}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <ListItemContainer data={data} />
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

/**
 * Default Props
 */
List.defaultProps = {

    data: null
};

/**
 * Prop Types
 * 
 */
List.propTypes = {

    ID: PropTypes.string.isRequired,
    data: PropTypes.array
};

/**
 * Export module
 * 
 */
export default List;