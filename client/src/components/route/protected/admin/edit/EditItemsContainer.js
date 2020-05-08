/**
 * @description EditItemsContainer component.
 * 
 * @requires Collapsible
 * @requires constants
 * @requires EditItem
 * @requires react
 * @public
 * @module
 * 
 */
import * as C from "../../../../../support/constants";
import Collapsible from "../../../../controls/Collapsible";
import EditItem from "./EditItem";
import React, { memo, useState } from "react";
import useItems from "../../../../../hooks/useItems";

/**
 * @description The memoized EditItemsContainer component contains a list of EditItem components.
 * This component facilitates fetching all Item documents from the database in order to populate the list of EditItem components.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const EditItemsContainer = () => {

    /**
     * State
     * 
     */
    const [ isLoading, setIsLoading ] = useState(true);

    /**
     * Hooks
     * 
     */
    const {
        
        fetchAll,
        itemsAll
    } = useItems();

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

        if (!isCollapsed) {
            
            if (!itemsAll) {

                await fetchAll();
            }

            setIsLoading(false);
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
                eventHandler={collapsibleHandler}
            >
                <div className={C.Style.EDIT_ITEMS_CONTAINER_CONTENT}>
                    {isLoading &&
                        <div className={C.Style.EDIT_ITEMS_CONTAINER_CONTENT_PRELOADER} />
                    }

                    {!isLoading && itemsAll &&
                        <>
                            {itemsAll.map((item) => {

                                return (
                                
                                    <EditItem
                                        key={item._id}
                                        itemID={item._id}
                                        itemName={item.name}
                                        itemThumbnail={item.thumbnail}
                                        itemImage={item.image}
                                    />
                                );
                            })}
                        </>
                    }
                </div>
            </Collapsible>
        </div>
    );
};

/**
 * Export module
 * 
 */
export default memo(EditItemsContainer);