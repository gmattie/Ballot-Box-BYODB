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

    const setAuthToken = (token) => dispatch(authActions.setAuthToken(token));
    const authToken = useSelector((state) => state.auth[C.Action.Type.AUTH_TOKEN], null);

    const setAuthError = (error) => dispatch(authActions.setAuthError(error));
    const authError = useSelector((state) => state.auth[C.Action.Type.AUTH_ERROR], null);

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