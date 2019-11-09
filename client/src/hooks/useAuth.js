/**
 * @description useUsers hook module
 * 
 * @requires authActions
 * @requires constants
 * @requires react
 * @requires react-redux
 * @public
 * @module
 * 
 */
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../state/actions/authActions";
import * as C from "../support/constants";

/**
 * @description Provides access to setting and getting auth data. 
 * 
 * @returns {Array<{
 * 
 *      setAuthToken: function,
 *      authToken: string,
 *      setAuthError: function,
 *      authError: object
 * }}
 * @public
 * @function 
 * 
 */
const useAuth = () => {

    const dispatch = useDispatch();

    const setAuthToken = (token) => dispatch(authActions.setAuthToken(token));
    const authToken = useSelector((state) => state.auth[C.Action.Type.AUTH_TOKEN]);

    const setAuthError = (error) => dispatch(authActions.setAuthToken(error));
    const authError = useSelector((state) => state.auth[C.Action.Type.AUTH_ERROR], null);

    return [

        setAuthToken,
        authToken,
        setAuthError,
        authError
    ];
};

/**
 * Export module
 * 
 */
export default useAuth;