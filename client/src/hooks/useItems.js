/**
 * @description useItems hook module
 * 
 * @requires constants
 * @requires itemActions
 * @requires react-redux
 * @public
 * @module
 * 
 */
import { useDispatch, useSelector } from "react-redux";
import * as C from "../support/constants";
import * as itemActions from "../state/actions/itemActions";

/**
 * @description Populate the application state with fetched data from /api/items.
 * This hook provides access to getting both item and error data as well as setting item data via the returned array. 
 * 
 * @returns {
 * 
 *      fetchAdd: function,
 *      fetchAll: function,
 *      itemsAdd: object,
 *      itemsAll: object,
 *      itemsError: object,
 *      itemsVote: object,
 *      setItemsAdd: function,
 *      setItemsAll: function,
 *      setItemsError: function,
 *      setItemsVote: function,
 * }
 * @public
 * @function 
 * 
 */
const useItems = () => {

    const dispatch = useDispatch();

    const fetchAdd = (name, image) => dispatch(itemActions.fetchAdd(name, image));
    const fetchAll = () => dispatch(itemActions.fetchAll());

    const setItemsAdd = (data) => dispatch(itemActions.setItemsAdd(data));
    const itemsAdd = useSelector((state) => state.items[C.Action.Type.ITEMS_ADD], null);

    const setItemsAll = (data) => dispatch(itemActions.setItemsAll(data));
    const itemsAll = useSelector((state) => state.items[C.Action.Type.ITEMS_ALL], null);

    const setItemsError = (data) => dispatch(itemActions.setItemsError(data));
    const itemsError = useSelector((state) => state.items[C.Action.Type.ITEMS_ERROR], null);

    const setItemsVote = (data) => dispatch(itemActions.setItemsVote(data));
    const itemsVote = useSelector((state) => state.items[C.Action.Type.ITEMS_VOTE], null);

    return {

        fetchAdd,
        fetchAll,
        itemsAdd,
        itemsAll,
        itemsError,
        itemsVote,
        setItemsAdd,
        setItemsAll,
        setItemsError,
        setItemsVote,
    };
};

/**
 * Export module
 * 
 */
export default useItems;