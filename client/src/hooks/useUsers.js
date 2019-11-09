/**
 * @description useUsers hook module
 * 
 * @requires constants
 * @requires react
 * @requires react-redux
 * @requires userActions
 * @public
 * @module
 * 
 */
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as C from "../support/constants";
import * as userActions from "../state/actions/userActions";

/**
 * @description Populate the application state with fetched data from /api/users.
 * This hook provides access to setting and getting users data. 
 * 
 * @returns {Array<{
 * 
 *      usersSelf: object,
 *      usersError: object
 * }}
 * @public
 * @function 
 * 
 */
const useUsers = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        const authToken = localStorage.getItem(C.Local.TOKEN);

        dispatch(userActions.fetchUsersSelf(authToken));
    }, [dispatch]);

    const usersSelf = useSelector((state) => state.users[C.Action.Type.USERS_SELF], null);
    const usersError = useSelector((state) => state.users[C.Action.Type.USERS_ERROR], null);

    return [

        usersSelf,
        usersError
    ];
};

/**
 * Export module
 * 
 */
export default useUsers;