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
 *      items: object,
 *      itemsError: object,
 *      setItems: function
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

    const setItems = (items) => dispatch(itemActions.setItems(items));

    const items = useSelector((state) => (state.items[C.Action.Type.ITEMS]), null);
    const itemsError = useSelector((state) => state.items[C.Action.Type.ERROR]);

    return [

        items,
        itemsError,
        setItems
    ];
};

/**
 * Export module
 * 
 */
export default useItems;