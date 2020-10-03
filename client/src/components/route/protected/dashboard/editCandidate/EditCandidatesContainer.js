/**
 * @description EditCandidatesContainer component.
 * 
 * @requires Collapsible
 * @requires constants
 * @requires EditCandidate
 * @requires react
 * @requires react-redux
 * @requires react-window
 * @requires store
 * @requires useItems
 * @requires usePersist
 * @requires utilities
 * @public
 * @module
 * 
 */
import { FixedSizeList as VirtualList } from "react-window";
import { debounce, getReactElementSize, suppressConsoleMessage } from "../../../../../support/utilities";
import { Provider } from "react-redux";
import * as C from "../../../../../support/constants";
import Collapsible from "../../../../controls/Collapsible";
import EditCandidate from "./EditCandidate";
import React, { memo, useCallback, useState } from "react";
import store from "../../../../../state/store";
import useItems from "../../../../../hooks/useItems";
import usePersist from "../../../../../hooks/usePersist";


/**
 * @description The memoized EditCandidatesContainer component contains a list of EditCandidate components.
 * This component facilitates fetching all Item documents from the database in order to populate the list of EditCandidate components.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const EditCandidatesContainer = () => {

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
    const { fetchAll, itemsAll } = useItems();

    const {
        
        persistCollapsedEditItems: collapsed,
        persistScrollEditItems: scrollOffset,

        setPersistCollapsedEditItems: setCollapsed,
        setPersistScrollEditItems: setScrollOffset
    } = usePersist();

    /**
     * @description Callback executed when the "collapsed" state of the Collapsible component is updated.
     * 
     * @param {boolean} collapsed - the "collapsed" state of the Collapsible component.
     * @private
     * @function
     *  
     */
    const collapsibleHandler = async (collapsed) => {

        setCollapsed(collapsed);

        if (!collapsed) {
            
            if (!itemsAll) {

                setIsLoading(true);

                await fetchAll();
            }

            setIsLoading(false);
        }
    };

    /**
     * Set the itemRendererHeight state
     * Retrieves the memoized height of the EditCandidate component.
     * 
     */
    if (!itemRendererHeight) {

        if (!window[C.Global.COMPONENT_HEIGHT_EDIT_ITEM]) {

            suppressConsoleMessage(C.Error.USE_LAYOUT_EFFECT_ON_SERVER, C.Console.Method.ERROR);

            const elementSize = getReactElementSize(
    
                <div className={C.Style.EDIT_CANDIDATES_CONTAINER_CONTENT_LIST_ITEM_SIZE_CONTAINER}>
                    <Provider store={store}>
                        <EditCandidate
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
            <EditCandidate
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
     * @description Handler for a dispatched "scroll" event.
     * 
     * @param {object} event - The event object
     * @private
     * @function
     * 
     */
    const scrollHandler = (event) => {

        const offset = event[C.Event.Property.SCROLL_OFFSET];

        if (scrollOffset !== offset) {

            setScrollOffset(offset);
        }
    };

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.EDIT_CANDIDATES_CONTAINER}>
            <Collapsible
                title={C.Label.EDIT_CANDIDATES}
                eventHandler={collapsibleHandler}
                collapsed={collapsed}
            >
                <div
                    className={C.Style.EDIT_CANDIDATES_CONTAINER_CONTENT}
                    style={{ height: itemRendererHeight * 2 }}
                >
                    {(isLoading || !itemsAll)
                        ?   <div className={C.Style.EDIT_CANDIDATES_CONTAINER_CONTENT_PRELOADER} />
                        :   (itemsAll && itemsAll.length)
                            ?   <>
                                    <div className={C.Style.EDIT_CANDIDATES_CONTAINER_CONTENT_SHADOW} />

                                    <VirtualList
                                        className={C.Style.EDIT_CANDIDATES_CONTAINER_CONTENT_LIST}
                                        width={C.CSS.PERCENT_100}
                                        height={itemRendererHeight * 2}
                                        itemData={itemsAll}
                                        itemCount={itemsAll.length}
                                        itemSize={itemRendererHeight}
                                        onScroll={debounce(C.Duration.DEBOUNCE_SCROLL, scrollHandler)}
                                        initialScrollOffset={scrollOffset}
                                    >
                                        {listItemRenderer}
                                    </VirtualList>
                                </>
                            :   <div className={C.Style.EDIT_CANDIDATES_CONTAINER_CONTENT_EMPTY}>
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
export default memo(EditCandidatesContainer);