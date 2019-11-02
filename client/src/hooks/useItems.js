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
 * @returns {Array<{
 * 
 *      itemsCandidate: object,
 *      itemsVote: object,
 *      itemsError: object,
 *      setItemsCandidate: function
 *      setItemsVote: function
 * }}
 * @public
 * @function 
 * 
 */
const useItems = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        // // TODO: Retrieve authToken // //
        let authToken; 

        if (process.env.NODE_ENV === C.Local.ENV_DEVELOPMENT) {

            authToken = process.env.REACT_APP_DEV_JWT;
        }

        dispatch(itemActions.fetchItems(authToken));
    }, [dispatch]);

    const setItemsCandidate = (items) => dispatch(itemActions.setItemsCandidate(items));
    const itemsCandidate = useSelector((state) => state.items[C.Action.Type.ITEMS_CANDIDATE], null);

    const setItemsVote = (items) => dispatch(itemActions.setItemsVote(items));
    const itemsVote = useSelector((state) => state.items[C.Action.Type.ITEMS_VOTE], null);

    const itemsError = useSelector((state) => state.items[C.Action.Type.ITEMS_ERROR]);

    return [

        setItemsCandidate,
        itemsCandidate,
        setItemsVote,
        itemsVote,
        itemsError
    ];
};

/**
 * Export module
 * 
 */
export default useItems;