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
 *      fetchEdit: function,
 *      itemsAdd: object,
 *      itemsAll: object,
 *      itemsCandidate: object,
 *      itemsEdit: object,
 *      itemsError: object,
 *      itemsVote: object,
 *      setItemsAdd: function,
 *      setItemsAll: function,
 *      setItemsCandidate: function,
 *      setItemsEdit: function,
 *      setItemsError: function,
 *      setItemsVote: function,
 * }
 * @public
 * @function 
 * 
 */
const useItems = () => {

    const dispatch = useDispatch();

    const fetchAdd = (name, thumbnail, image) => dispatch(itemActions.fetchAdd(name, thumbnail, image));
    const fetchAll = () => dispatch(itemActions.fetchAll());
    const fetchEdit = (itemID, name, thumbnail, image) => dispatch(itemActions.fetchEdit(itemID, name, thumbnail, image));

    const setItemsAdd = (data) => dispatch(itemActions.setItemsAdd(data));
    const itemsAdd = useSelector((state) => state.items[C.Action.Type.ITEMS_ADD], null);

    const setItemsAll = (data) => dispatch(itemActions.setItemsAll(data));
    const itemsAll = useSelector((state) => state.items[C.Action.Type.ITEMS_ALL], null);

    const setItemsCandidate = (data) => dispatch(itemActions.setItemsCandidate(data));
    const itemsCandidate = useSelector((state) => state.items[C.Action.Type.ITEMS_CANDIDATE], null);

    const setItemsEdit = (data) => dispatch(itemActions.setItemsEdit(data));
    const itemsEdit = useSelector((state) => state.items[C.Action.Type.ITEMS_EDIT], null);

    const setItemsError = (data) => dispatch(itemActions.setItemsError(data));
    const itemsError = useSelector((state) => state.items[C.Action.Type.ITEMS_ERROR], null);

    const setItemsVote = (data) => dispatch(itemActions.setItemsVote(data));
    const itemsVote = useSelector((state) => state.items[C.Action.Type.ITEMS_VOTE], null);

    return {

        fetchAdd,
        fetchAll,
        fetchEdit,
        itemsAdd,
        itemsAll,
        itemsCandidate,
        itemsEdit,
        itemsError,
        itemsVote,
        setItemsAdd,
        setItemsAll,
        setItemsCandidate,
        setItemsEdit,
        setItemsError,
        setItemsVote,
    };
};

/**
 * Export module
 * 
 */
export default useItems;