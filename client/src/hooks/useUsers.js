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
 *      fetchLogin: function,
 *      fetchRegister: function,
 *      fetchReset: function,
 *      fetchSelf: function,
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

    const fetchLogin = (email, password) => dispatch(userActions.fetchLogin(email, password));
    const fetchRegister = (name, email, password, passwordConfirm, adminUsername = null, adminPassword = null) => dispatch(userActions.fetchRegister(name, email, password, passwordConfirm, adminUsername, adminPassword));
    const fetchReset = (email, password, passwordConfirm) => dispatch(userActions.fetchReset(email, password, passwordConfirm));
    const fetchSelf = (authToken) => dispatch(userActions.fetchSelf(authToken));

    const setUsersError = (data) => dispatch(userActions.setUsersError(data));
    const usersError = useSelector((state) => state.users[C.Action.Type.USERS_ERROR], null);

    const setUsersRegister = (data) => dispatch(userActions.setUsersRegister(data));
    const usersRegister = useSelector((state) => state.users[C.Action.Type.USERS_REGISTER], null);

    const setUsersReset = (data) => dispatch(userActions.setUsersReset(data));
    const usersReset = useSelector((state) => state.users[C.Action.Type.USERS_RESET], null);

    const setUsersSelf = (data) => dispatch(userActions.setUsersSelf(data));
    const usersSelf = useSelector((state) => state.users[C.Action.Type.USERS_SELF], null);

    return {

        fetchLogin,
        fetchRegister,
        fetchReset,
        fetchSelf,
        setUsersError,
        setUsersRegister,
        setUsersReset,
        setUsersSelf,
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