/**
 * @description ListItemContainer component.
 * 
 * @requires ItemDetail
 * @requires ListItem
 * @requires prop-types
 * @requires react
 * @public
 * @module
 * 
 */
import ItemDetail from "../modal/ItemDetail";
import ListItem from "./ListItem";
import PropTypes from "prop-types";
import React, { memo, useRef, useState } from "react";

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
     * State
     * 
     */
    const [ showDialog, setShowDialog ] = useState(false);

    /**
     * Refs
     * 
     */
    const itemName = useRef(null);
    const itemImageURL = useRef(null);

    /**
     * @description Displays the name and full size image of an item.
     * 
     * @param {string} name - The name of the item. 
     * @param {string} imageURL - the image URL of the item.
     * @private
     * @function
     * 
     */
    const showItemDetails = (name, imageURL) => {

        itemName.current = name;
        itemImageURL.current = imageURL;

        setShowDialog(true);
    };

    /**
     * JSX markup
     * 
     */
    return (

        <>
            {showDialog &&
                <ItemDetail 
                    imageURL={itemImageURL.current}
                    title={itemName.current}
                    okCallback={() => setShowDialog(false)}
                />
            }

            {data && data.map((datum, index) => {

                return (
                
                    <ListItem
                        data={datum}
                        index={index}
                        showItemDetails={showItemDetails}
                        key={datum._id}
                    />
                );
            })}
        </>
    );
};

/**
 * Default Props
 * 
 */
ListItemContainer.defaultProps = {

    data: null
};

/**
 * Prop Types
 * 
 */
ListItemContainer.propTypes = {

    data: PropTypes.array
};

/**
 * Export module
 * 
 */
export default memo(ListItemContainer);