/**
 * @description ResultsContainer component.
 * 
 * @requires constants
 * @requires ProtectedContainer
 * @requires react
 * @requires react-virtualized-auto-sizer
 * @requires react-window
 * @requires Result
 * @requires ResultDetail
 * @requires useAuth
 * @requires useMount
 * @requires usePersist
 * @requires useVotes
 * @requires utilities

 * @public
 * @module
 * 
 */
import { FixedSizeList as VirtualList } from "react-window";
import { debounce, getReactElementSize } from "../../../../support/utilities";
import { LogoutAPI } from "../ProtectedContainer";
import * as C from "../../../../support/constants";
import AutoSizer from "react-virtualized-auto-sizer";
import React, { memo, useContext, useCallback, useRef, useState } from "react";
import Result from "./Result";
import ResultDetail from "../../../modal/result/ResultDetail";
import useAuth from "../../../../hooks/useAuth";
import useMount from "../../../../hooks/useMount";
import usePersist from "../../../../hooks/usePersist";
import useVotes from "../../../../hooks/useVotes";

/**
 * @description The memoized ResultsContainer component contains a virtualized list of Result components.
 * This component facilitates fetching all Vote documents from the database, if required, and/or populates the list with the latest data.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const ResultsContainer = () => {

    /**
     * Context
     * 
     */
    const logout = useContext(LogoutAPI);

    /**
     * State
     * 
     */
    const [ isLoading, setIsLoading ] = useState(true);
    const [ showDialog, setShowDialog ] = useState(false);
    const [ itemRendererHeight, setItemRendererHeight ] = useState();

    /**
     * Refs
     * 
     */
    const resultDetailDocumentID = useRef(null);

    /**
     * Hooks
     * 
     */
    const { authError } = useAuth();
    const { onMount } = useMount();
    
    const {

        persistScrollResults: scrollOffset,
        setPersistScrollResults: setScrollOffset
    } = usePersist();

    const {

        fetchAll,
        votesAll,
    } = useVotes();

    /**
     * @description Fetches all Vote documents to populate the "votesAll" state if the state is null. 
     * 
     * @private
     * @function
     * 
     */
    const mount = () => {

        (async () => {

            if (!votesAll) {

                await fetchAll();
            }

            setIsLoading(false);
        })();
    };

    onMount(mount);

    /**
     * Auth failure
     * Logout user if authentication fails while fetching data.
     * 
     */
    if (authError) {

        setTimeout(() => logout());
    }

    /**
     * Set the itemRendererHeight state
     * Retrieves the memoized height of the "Result" component when the "votesAll" state contains items.
     * 
     */
    if (votesAll && votesAll.length && !itemRendererHeight) {

        if (!window[C.Global.COMPONENT_HEIGHT_RESULT]) {

            const elementSize = getReactElementSize(
            
                <div className={C.Style.RESULTS_CONTAINER_LIST_ITEM_SIZE_CONTAINER}>
                    <Result
                        voteDocument={votesAll[0]}
                        clickCallback={() => {}}
                    />
                </div>
            );

            window[C.Global.COMPONENT_HEIGHT_RESULT] = elementSize.height;
        }

        setItemRendererHeight(window[C.Global.COMPONENT_HEIGHT_RESULT]);
    }

    /**
     * @description Displays a ResultDetail modal dialog component.
     * 
     * @param {string} voteID - The ID of the target Vote document.
     * @private
     * @function
     * 
     */
    const showResultDetails = (voteID) => {

        resultDetailDocumentID.current = voteID;

        setShowDialog(true);
    };

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
            <Result
                key={data[index][C.Model.ID]}
                voteDocument={data[index]}
                clickCallback={showResultDetails}
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

        <div className={C.Style.RESULTS_CONTAINER}>
            {showDialog &&
                <ResultDetail 
                    voteID={resultDetailDocumentID.current}
                    dismountCallback={() => setShowDialog(false)}
                    logout={logout}
                />
            }
            {(isLoading)
                ?   <div className={C.Style.RESULTS_CONTAINER_PRELOADER} />
                :   (votesAll && votesAll.length)
                    ?   <AutoSizer>
                            {({ width, height }) => (

                                <VirtualList
                                    className={C.Style.RESULTS_CONTAINER_LIST}
                                    width={width}
                                    height={height}
                                    itemData={votesAll}
                                    itemCount={votesAll.length}
                                    itemSize={itemRendererHeight}
                                    onScroll={debounce(C.Duration.DEBOUNCE_SCROLL, scrollHandler)}
                                    initialScrollOffset={
                                        
                                        (height >= itemRendererHeight * votesAll.length)
                                            ? 0
                                            : scrollOffset
                                    }
                                >
                                    {listItemRenderer}
                                </VirtualList>
                            )}
                        </AutoSizer>
                    :   <div className={C.Style.RESULTS_CONTAINER_EMPTY}>
                            {C.Label.EMPTY_RESULTS}
                        </div>
            }
        </div>
    );
};

/**
 * Export module
 * 
 */
export default memo(ResultsContainer);