/**
 * @description ListItemContainer component.
 * 
 * @requires ListItem
 * @requires prop-types
 * @requires react
 * @public
 * @module
 * 
 */
import ListItem from "./ListItem";
import PropTypes from "prop-types";
import React, { memo } from "react";

/**
 * @description The memoized ListItemContainer component separates and distributes data from the props array to individual ListItem child components.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const ListItemContainer = ({ data }) => {

    /**
     * JSX markup
     * 
     */
    return data.map((data, index) => (

        <ListItem
            data={data}
            index={index}
            key={data._id}
        />
    ));
};

/**
 * Prop Types
 * 
 */
ListItemContainer.propTypes = {

    data: PropTypes.arrayOf(PropTypes.shape({

        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string,
        date: PropTypes.string
    })).isRequired,
};

/**
 * Export module
 * 
 */
export default memo(ListItemContainer);