/**
 * @description WebSocket hook module
 * 
 * @requires constants
 * @requires package
 * @requires react
 * @requires react-redux
 * @requires webSocketActions
 * @public
 * @module
 * 
 */
import { proxy } from "../../package.json";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import * as C from "../support/constants";
import * as webSocketActions from "../state/actions/webSocketActions";

/**
 * @description Initialize a WebSocket connection with event subscriptions.
 * All messages pushed from the server are dispatched to the Redux store in order to be accessible throughout the application.
 * 
 * @public
 * @function 
 * 
 */
const useWebSocket = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        const locationOrigin = (process.env.NODE_ENV === C.Local.ENV_DEVELOPMENT) ? proxy : window.location.origin;
        const webSocketURL = locationOrigin.replace(new RegExp(`^${C.Local.PROTOCOL_HTTP}`), C.Local.PROTOCOL_WEB_SOCKET);
        const webSocket = new WebSocket(webSocketURL);

        const handleWebSocket = (message, close) => {

            dispatch(webSocketActions.setMessage(message));

            if (close) {

                webSocket.close();
            }
        };

        const handleOpen = (event) => handleWebSocket(event.type, false);
        const handleMessage = (event) => handleWebSocket(event.data, false);
        const handleClose = (event) => handleWebSocket(event.type, true);

        webSocket.addEventListener(C.Event.OPEN, handleOpen);
        webSocket.addEventListener(C.Event.MESSAGE, handleMessage);
        webSocket.addEventListener(C.Event.CLOSE, handleClose);
        webSocket.addEventListener(C.Event.ERROR, handleClose);

        return () => {

            webSocket.removeEventListener(C.Event.OPEN, handleMessage);
            webSocket.removeEventListener(C.Event.MESSAGE, handleMessage);
            webSocket.removeEventListener(C.Event.CLOSE, handleClose);
            webSocket.removeEventListener(C.Event.ERROR, handleClose);
        };
    }, [dispatch]);
};

/**
 * Export module
 * 
 */
export default useWebSocket; 