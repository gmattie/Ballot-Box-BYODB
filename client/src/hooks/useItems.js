/**
 * @description useItems hook module
 * 
 * @requires constants
 * @requires itemActions
 * @requires react
 * @requires react-redux
 * @public
 * @module
 * 
 */
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as C from "../support/constants";
import * as itemActions from "../state/actions/itemActions";

/**
 * @description Populate the application state with fetched data from /api/items.
 * This hook provides access to getting both item and error data as well as setting item data via the returned array. 
 * 
 * @returns {
 * 
 *      itemsCandidate: object,
 *      itemsError: object,
 *      itemsVote: object,
 *      setItemsCandidate: function
 *      setItemsError: function
 *      setItemsVote: function
 * }
 * @public
 * @function 
 * 
 */
const useItems = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        const authToken = localStorage.getItem(C.Local.TOKEN);

        dispatch(itemActions.fetchItems(authToken));
    }, [dispatch]);

    const setItemsCandidate = (data) => dispatch(itemActions.setItemsCandidate(data));
    const itemsCandidate = useSelector((state) => state.items[C.Action.Type.ITEMS_CANDIDATE], null);

    const setItemsError = (data) => dispatch(itemActions.setItemsError(data));
    const itemsError = useSelector((state) => state.items[C.Action.Type.ITEMS_ERROR]);

    const setItemsVote = (data) => dispatch(itemActions.setItemsVote(data));
    const itemsVote = useSelector((state) => state.items[C.Action.Type.ITEMS_VOTE], null);

    return {

        itemsCandidate,
        itemsError,
        itemsVote,
        setItemsCandidate,
        setItemsError,
        setItemsVote,
    };
};

/**
 * Export module
 * 
 */
export default useItems;