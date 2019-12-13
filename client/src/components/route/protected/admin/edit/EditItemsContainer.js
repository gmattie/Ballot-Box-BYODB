/**
 * @description EditItemsContainer component.
 * 
 * @requires Collapsible
 * @requires constants
 * @requires EditItem
 * @requires prop-types
 * @requires react
 * @public
 * @module
 * 
 */
import * as C from "../../../../../support/constants";
import Collapsible from "../../../../Collapsible";
import EditItem from "./EditItem";
import PropTypes from "prop-types";
import React, { memo, useState } from "react";
import useItems from "../../../../../hooks/useItems";

/**
 * @description The memoized EditItemsContainer component contains a list of EditItem components.
 * This component facilitates fetching all Item documents from the database in order to populate the list of EditItem components.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const EditItemsContainer = ({ logout }) => {

    /**
     * State
     * 
     */
    const [ isMounting, setIsMounting ] = useState(true);

    /**
     * Hooks
     * 
     */
    const { fetchAll, itemsAll } = useItems();

    /**
     * @description Callback executed each time the collapsed or expanded state of the Collapsible component is updated.
     * 
     * @param {boolean} isCollapsed - Indicates the state of the Collapsible component.
     * @async
     * @private
     * @function
     *  
     */
    const collapsibleHandler = async (isCollapsed) => {

        if (isMounting && !isCollapsed) {

            await fetchAll();
    
            setIsMounting(false);
        }
    };

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.EDIT_ITEMS_CONTAINER}>
            <Collapsible
                title={C.Label.EDIT_ITEMS}
                headerStyle={C.Style.COLLAPSIBLE_HEADER_SECTION}
                eventHandler={collapsibleHandler}
            >
                {!isMounting &&
                    <>
                        {itemsAll.map((item) => {

                            return (
                            
                                <EditItem
                                    key={item._id}
                                    itemID={item._id}
                                    itemName={item.name}
                                    itemImage={item.image}
                                    logout={logout}
                                />
                            );
                        })}
                    </>
                }

                {
                    //TODO: Replace with style animation
                    isMounting && <div>LOADING...</div>
                }
            </Collapsible>
        </div>
    );
};

/**
 * Prop Types
 * 
 */
EditItemsContainer.propTypes = {

    logout: PropTypes.func.isRequired
};

/**
 * Export module
 * 
 */
export default memo(EditItemsContainer);