/**
 * @description useAuth hook module
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
 * @returns {
 * 
 *      authError: object,
 *      authToken: string,
 *      setAuthError: function,
 *      setAuthToken: function,
 * }
 * @public
 * @function 
 * 
 */
const useAuth = () => {

    const dispatch = useDispatch();

    const setAuthError = (data) => dispatch(authActions.setAuthError(data));
    const authError = useSelector((state) => state.auth[C.Action.Type.AUTH_ERROR], null);

    const setAuthToken = (data) => dispatch(authActions.setAuthToken(data));
    const authToken = useSelector((state) => state.auth[C.Action.Type.AUTH_TOKEN], null);

    return {

        authError,
        authToken,
        setAuthError,
        setAuthToken,
    };
};

/**
 * Export module
 * 
 */
export default useAuth;