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
 *      register: function,
 *      reset: function,
 *      usersError: object,
 *      usersRegister: object,
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
    const register = (name, email, password, adminUsername = null, adminPassword = null) => dispatch(userActions.register(name, email, password, adminUsername, adminPassword));
    const reset = (email, password) => dispatch(userActions.reset(email, password));

    const usersError = useSelector((state) => state.users[C.Action.Type.USERS_ERROR], null);
    const usersRegister = useSelector((state) => state.users[C.Action.Type.USERS_REGISTER], null);
    const usersReset = useSelector((state) => state.users[C.Action.Type.USERS_RESET], null);
    const usersSelf = useSelector((state) => state.users[C.Action.Type.USERS_SELF], null);

    return {

        fetchSelf,
        login,
        register,
        reset,
        usersError,
        usersRegister,
        usersReset,
        usersSelf,
    };
};

/**
 * Export module
 * 
 */
export default useUsers;