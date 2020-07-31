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
 *      fetchLogout: function,
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

    const fetchEdit = (name, avatar, password, passwordConfirm, adminUsername, adminPassword) => dispatch(userActions.fetchEdit(name, avatar, password, passwordConfirm, adminUsername, adminPassword));
    const fetchLogin = (email, password) => dispatch(userActions.fetchLogin(email, password));
    const fetchLogout = (authToken = null) => dispatch(userActions.fetchLogout(authToken));
    const fetchRegister = (name, email, password, passwordConfirm, adminUsername, adminPassword) => dispatch(userActions.fetchRegister(name, email, password, passwordConfirm, adminUsername, adminPassword));
    const fetchReset = (email, password, passwordConfirm) => dispatch(userActions.fetchReset(email, password, passwordConfirm));
    const fetchSelf = (authToken) => dispatch(userActions.fetchSelf(authToken));

    const setUsersEdit = (data) => dispatch(userActions.setUsersEdit(data));
    const usersEdit = useSelector((state) => state.users[C.Action.Type.USERS_EDIT], null);

    const setUsersError = (data) => dispatch(userActions.setUsersError(data));
    const usersError = useSelector((state) => state.users[C.Action.Type.USERS_ERROR], null);

    const setUsersRegister = (data) => dispatch(userActions.setUsersRegister(data));
    const usersRegister = useSelector((state) => state.users[C.Action.Type.USERS_REGISTER], null);

    const setUsersReset = (data) => dispatch(userActions.setUsersReset(data));
    const usersReset = useSelector((state) => state.users[C.Action.Type.USERS_RESET], null);

    const setUsersSelf = (data) => dispatch(userActions.setUsersSelf(data));
    const usersSelf = useSelector((state) => state.users[C.Action.Type.USERS_SELF], null);

    return {

        fetchEdit,
        fetchLogin,
        fetchLogout,
        fetchRegister,
        fetchReset,
        fetchSelf,
        setUsersEdit,
        setUsersError,
        setUsersRegister,
        setUsersReset,
        setUsersSelf,
        usersEdit,
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