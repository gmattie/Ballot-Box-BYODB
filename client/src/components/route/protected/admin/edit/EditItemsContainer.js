/**
 * @description EditItemsContainer component.
 * 
 * @requires Collapsible
 * @requires constants
 * @requires EditItem
 * @requires react
 * @requires react-window
 * @requires utilities
 * @public
 * @module
 * 
 */
import { FixedSizeList as VirtualList } from "react-window";
import { getReactElementSize, suppressConsoleMessage } from "../../../../../support/utilities";
import { Provider } from "react-redux";
import * as C from "../../../../../support/constants";
import Collapsible from "../../../../controls/Collapsible";
import EditItem from "./EditItem";
import React, { memo, useCallback, useState } from "react";
import store from "../../../../../state/store";
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
    const [ isLoading, setIsLoading ] = useState(false);
    const [ itemRendererHeight, setItemRendererHeight ] = useState();

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

                setIsLoading(true);

                await fetchAll();
            }

            setIsLoading(false);
        }
    };

    /**
     * Set the itemRendererHeight state
     * Retrieves the memoized height of the "EditItem" component.
     * 
     */
    if (!itemRendererHeight) {

        if (!window[C.Global.COMPONENT_HEIGHT_EDIT_ITEM]) {

            suppressConsoleMessage(C.Error.USE_LAYOUT_EFFECT_ON_SERVER, C.Console.Method.ERROR);

            const elementSize = getReactElementSize(
    
                <div className={C.Style.EDIT_ITEMS_CONTAINER_CONTENT_LIST_ITEM_SIZE_CONTAINER}>
                    <Provider store={store}>
                        <EditItem
                            itemID={C.Model.ID}
                            itemName={C.Model.NAME}
                            itemThumbnail={C.Model.THUMBNAIL}
                            itemImage={C.Model.IMAGE}
                            itemActive={true}
                        />
                    </Provider>
                </div>
            );
    
            window[C.Global.COMPONENT_HEIGHT_EDIT_ITEM] = elementSize.height;
        }

        setItemRendererHeight(window[C.Global.COMPONENT_HEIGHT_EDIT_ITEM]);
    }

    /**
     * @description Handler for creating memoized list items for the VirtualList component.
     * 
     * @param {object} props - Properties populated by the VirtualList component.
     * @private
     * @function
     * 
     */
    const listItemRenderer = useCallback(({ data, index, style }) => (

        <div style={style}>
            <EditItem
                key={data[index][C.Model.ID]}
                itemID={data[index][C.Model.ID]}
                itemName={data[index][C.Model.NAME]}
                itemThumbnail={data[index][C.Model.THUMBNAIL]}
                itemImage={data[index][C.Model.IMAGE]}
                itemActive={data[index][C.Model.ACTIVE]}
            />
        </div>
    ), []);

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
                <div
                    className={C.Style.EDIT_ITEMS_CONTAINER_CONTENT}
                    style={{ height: itemRendererHeight * 2 }}
                >
                    {(isLoading || !itemsAll)
                        ?   <div className={C.Style.EDIT_ITEMS_CONTAINER_CONTENT_PRELOADER} />
                        :   (itemsAll && itemsAll.length)
                            ?   <>
                                    <div className={C.Style.EDIT_ITEMS_CONTAINER_CONTENT_SHADOW} />

                                    <VirtualList
                                        className={C.Style.EDIT_ITEMS_CONTAINER_CONTENT_LIST}
                                        width={C.CSS.PERCENT_100}
                                        height={itemRendererHeight * 2}
                                        itemData={itemsAll}
                                        itemCount={itemsAll.length}
                                        itemSize={itemRendererHeight}
                                    >
                                        {listItemRenderer}
                                    </VirtualList>
                                </>
                            :   <div className={C.Style.EDIT_ITEMS_CONTAINER_CONTENT_EMPTY}>
                                    {C.Label.EMPTY_ITEMS}
                                </div>
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