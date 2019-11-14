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
 *      fetchSelf: function,
 *      login: function,
 *      reset: function,
 *      usersError: object,
 *      usersReset: object,
 *      usersSelf: object,
 * }
 * @public
 * @function 
 * 
 */
const useUsers = () => {

    const dispatch = useDispatch();

    const fetchSelf = (authToken) => dispatch(userActions.fetchSelf(authToken));
    const login = (email, password) => dispatch(userActions.login(email, password));
    const reset = (email, password) => dispatch(userActions.reset(email, password));

    const usersReset = useSelector((state) => state.users[C.Action.Type.USERS_RESET], null);
    const usersError = useSelector((state) => state.users[C.Action.Type.USERS_ERROR], null);
    const usersSelf = useSelector((state) => state.users[C.Action.Type.USERS_SELF], null);

    return {

        fetchSelf,
        login,
        reset,
        usersError,
        usersReset,
        usersSelf,
    };
};

/**
 * Export module
 * 
 */
export default useUsers;