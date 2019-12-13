/**
 * @description ListItemContainer component.
 * 
 * @requires ListItem
 * @requires prop-types
 * @requires react
 * @requires Dialog
 * @public
 * @module
 * 
 */
import ListItem from "./ListItem";
import PropTypes from "prop-types";
import React, { memo, useRef, useState } from "react";
import Dialog from "../../components/modal/Dialog";

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
                <Dialog 
                    imageURL={itemImageURL.current}
                    message={itemName.current}
                    okCallback={() => setShowDialog(false)}
                />
            }

            {data &&
                <>
                    {data.map((data, index) => {

                        return (
                        
                            <ListItem
                                data={data}
                                index={index}
                                showItemDetails={showItemDetails}
                                key={data._id}
                            />
                        );
                    })}
                </>
            }
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