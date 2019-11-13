/**
 * @description useUsers hook module
 * 
 * @requires constants
 * @requires react-redux
 * @requires userActions
 * @public
 * @module
 * 
 */
import { useDispatch, useSelector } from "react-redux";
import * as C from "../support/constants";
import * as userActions from "../state/actions/userActions";

/**
 * @description Provides access to setting and getting users data. 
 * 
 * @returns {
 * 
 *      fetchUsersSelf: function,
 *      login: function,
 *      usersError: object
 *      usersSelf: object,
 * }
 * @public
 * @function 
 * 
 */
const useUsers = () => {

    const dispatch = useDispatch();

    const login = (email, password) => dispatch(userActions.login(email, password));
    const fetchUsersSelf = (authToken) => dispatch(userActions.fetchUsersSelf(authToken));

    const usersSelf = useSelector((state) => state.users[C.Action.Type.USERS_SELF], null);
    const usersError = useSelector((state) => state.users[C.Action.Type.USERS_ERROR], null);

    return {

        fetchUsersSelf,
        login,
        usersError,
        usersSelf,
    };
};

/**
 * Export module
 * 
 */
export default useUsers;