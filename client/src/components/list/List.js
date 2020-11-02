/**
 * @description List component.
 * 
 * @requires constants
 * @requires ItemDetail
 * @requires PropTypes
 * @requires react
 * @requires react-beautiful-dnd
 * @requires react-virtualized-auto-sizer
 * @requires react-window
 * @requires utilities
 * @public
 * @module
 * 
 */
import { debounce, doubleClick, getReactElementSize, getStyleVariable } from "../../support/utilities";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FixedSizeList as VirtualList } from "react-window";
import * as C from "../../support/constants";
import AutoSizer from "react-virtualized-auto-sizer";
import ItemDetail from "../modal/ItemDetail";
import ListItem from "./ListItem";
import PropTypes from "prop-types";
import React, { createContext, memo, useCallback, useEffect, useRef, useState } from "react";

/**
 * @description Creates an exportable Context object.
 * This Context object allows the List component to provide its "isCompactWidth" state to be consumed by
 * ListItem component instances without having to pass props down manually to each component.
 * 
 * @public
 * @object
 * 
 */
const ResizeAPI = createContext();

/**
 * @description The List component displays a list of items fetched from /api/items and supports item reordering via drag and drop functionality.
 * The data is separated and passed down individually to ListItem child components.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const List = ({
    
        ID,
        title,
        placeholder,
        data,
        scrollOffset,
        scrollHandler
    }) => {

    /**
     * State
     * 
     */
    const [ showDialog, setShowDialog ] = useState(false);
    const [ itemRendererHeight, setItemRendererHeight ] = useState();
    const [ listHeaderHeight, setListHeaderHeight ] = useState();
    const [ isCompactWidth, setIsCompactWidth ] = useState(false);
    
    /**
     * Refs
     * 
     */
    const itemName = useRef(null);
    const itemImageURL = useRef(null);
    const listRef = useRef(null);

    /**
     * @description Subscribes to a ResizeObserver that may update the "isCompactWidth" state when the width of the List component changes.
     * The "isCompactWidth" boolean state is true when the width of the List component is less than or equal to C.StyleVariable.LIST_WIDTH_BOUNDARY.
     * 
     * @returns {function} Cleanup code to execute when the component dismounts.
     * @private
     * @function
     * 
     */
    useEffect(() => {

        const listElement = listRef.current;

        if (listElement) {

            let resizeObserver = new ResizeObserver(debounce(C.Duration.DEBOUNCE_RESIZE, (entries) => {
                
                for (let entry of entries) {
                    
                    if (entry.target === listElement) {
                        
                        const width = entry.contentRect.width;
                        const listWidthBoundary = parseInt(getStyleVariable(C.StyleVariable.LIST_WIDTH_BOUNDARY));

                        setIsCompactWidth(width <= listWidthBoundary);
                    }
                }
            }));

            resizeObserver.observe(listElement);

            return () => {
                    
                resizeObserver.disconnect();
                resizeObserver = null;
            };
        }
    }, []);

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

        if (imageURL) {

            itemName.current = name;
            itemImageURL.current = imageURL;

            setShowDialog(true);
        }
    };

    /**
     * Set the itemRendererHeight and listHeaderHeight states
     * Retrieves the memoized height values for the "ListItem" component and for an element with a style class of "C.Style.LIST_TITLE".
     * 
     */
    if (!itemRendererHeight && !listHeaderHeight) {

        if (!window[C.Global.COMPONENT_HEIGHT_LIST_ITEM]) {

            const elementSize = getReactElementSize(

                <div className={C.Style.LIST_ITEM} />
            );

            window[C.Global.COMPONENT_HEIGHT_LIST_ITEM] = elementSize.height;
        }

        
        if (!window[C.Global.COMPONENT_HEIGHT_LIST_HEADER]) {
            
            const elementSize = getReactElementSize(
            
                <div className={C.Style.LIST_TITLE}>
                    {title}
                </div>
            );
        
            window[C.Global.COMPONENT_HEIGHT_LIST_HEADER] = elementSize.height;
        }

        setItemRendererHeight(window[C.Global.COMPONENT_HEIGHT_LIST_ITEM]);
        setListHeaderHeight(window[C.Global.COMPONENT_HEIGHT_LIST_HEADER]);
    }

    /**
     * @description Handler for creating memoized list items for the VirtualList component.
     * 
     * @param {object} props - Properties populated by the VirtualList component.
     * @private
     * @function
     * 
     */
    const listItemRenderer = useCallback(({ data, index, style }) => {

        const item = (data && data[index]);

        if (!item) {

            return null;
        }

        return (

            <Draggable
                key={item[C.Model.ID]}
                draggableId={item[C.Model.ID]}
                index={index}
            >
                {(provided) =>

                    <ListItem
                        data={item}
                        draggableProvided={provided}
                        virtualStyle={style}
                        clickHandler={doubleClick(showItemDetails)}
                    />
                }
            </Draggable>
        );
    }, []);

    /**
     * JSX markup
     * 
     */
    return (

        <ResizeAPI.Provider value={isCompactWidth}>
            {showDialog &&
                <ItemDetail 
                    imageURL={itemImageURL.current}
                    title={itemName.current}
                    dismountCallback={() => setShowDialog(false)}
                />
            }

            <Droppable
                droppableId={ID}
                mode={C.Mode.VIRTUAL}
                renderClone={(provided, snapshot, rubric) => (

                    <ListItem
                        data={data[rubric.source.index]}
                        draggableProvided={provided}
                        isDragging={snapshot.isDragging}
                    />
                )}
            >
                {(provided, snapshot) => {

                    const dataLength = (data)
                        ? data.length
                        : 0;

                    const itemCount = (snapshot.isUsingPlaceholder)
                        ? dataLength + 1
                        : dataLength;

                    return (

                        <div
                            ref={listRef}
                            className={C.Style.LIST}
                        >
                            <div className={C.Style.LIST_TITLE}>
                                {title}
                            </div>

                            {itemRendererHeight && listHeaderHeight &&
                                <AutoSizer
                                    defaultHeight={listHeaderHeight}
                                    defaultWidth={1}
                                >
                                    {({ width, height }) => (

                                        <>
                                            <div
                                                className={C.Style.LIST_BACKGROUND}
                                                style={{
                                                    
                                                    width: C.CSS.PERCENT_100,
                                                    height: height - listHeaderHeight
                                                }}>
                                                {placeholder &&
                                                    <div className={C.Style.LIST_PLACEHOLDER}>
                                                        {placeholder}
                                                    </div>
                                                }
                                            </div>

                                            <VirtualList
                                                className={C.Style.LIST_CONTENT}
                                                width={width}
                                                height={height - listHeaderHeight}
                                                itemSize={itemRendererHeight}
                                                itemCount={itemCount}
                                                itemData={data}
                                                outerRef={provided.innerRef}
                                                onScroll={scrollHandler}
                                                initialScrollOffset={
                                            
                                                    (height >= itemRendererHeight * itemCount)
                                                        ? 0
                                                        : scrollOffset
                                                }
                                            >
                                                {listItemRenderer}
                                            </VirtualList>
                                        </>
                                    )}
                                </AutoSizer>
                            }
                        </div>
                    );
                }}
            </Droppable>
        </ResizeAPI.Provider>
    );
};

/**
 * Default Props
 * 
 */
List.defaultProps = {

    placeholder: null,
    data: null,
    scrollOffset: null,
    scrollHandler: null,
};

/**
 * Prop Types
 * 
 */
List.propTypes = {

    ID: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    data: PropTypes.array,
    scrollOffset: PropTypes.number,
    scrollHandler: PropTypes.func
};

/**
 * Export module
 * 
 */
export default memo(List);
export { ResizeAPI };