/**
 * @description The parent component of the application.
 * 
 * @requires react
 * @requires constants
 * @requires package
 * @public
 * @module
 * 
 */
import { proxy } from "../../package.json";
import * as C from "../support/constants";
import React, { useEffect, useState } from "react";

/**
 * @description Subscribes to and displays data from WebSocket events.
 * 
 * @public
 * @function
 * 
 */
const App = () => {
    
    const [webSocketMessage, setWebSocketMessage] = useState("");

    useEffect(() => {
        
        const locationOrigin = (process.env.NODE_ENV === C.Local.ENV_DEVELOPMENT) ? proxy : window.location.origin;
        const webSocketURL = locationOrigin.replace(new RegExp(`^${C.Local.PROTOCOL_HTTP}`), C.Local.PROTOCOL_WEB_SOCKET);
        const webSocket = new WebSocket(webSocketURL);

        const handleWebSocket = (message, close) => {

            setWebSocketMessage(message);

            if (close) {

                webSocket.close();
            }
        }

        const webSocketOpen = (event) => handleWebSocket(event.type, false);
        const webSocketMessage = (event) => handleWebSocket(event.data, false);
        const webSocketClose = (event) => handleWebSocket(event.type, true);

        webSocket.addEventListener(C.Event.OPEN, webSocketOpen);
        webSocket.addEventListener(C.Event.MESSAGE, webSocketMessage)
        webSocket.addEventListener(C.Event.CLOSE, webSocketClose);
        webSocket.addEventListener(C.Event.ERROR, webSocketClose);

        return () => {

            webSocket.removeEventListener(C.Event.OPEN, webSocketOpen);
            webSocket.removeEventListener(C.Event.MESSAGE, webSocketMessage);
            webSocket.removeEventListener(C.Event.CLOSE, webSocketClose);
            webSocket.removeEventListener(C.Event.ERROR, webSocketClose);
        }
    }, [])

    return (

        <div className={C.CSSClass.TITLE}>
            WebSocket Data: {webSocketMessage}
        </div>
    );
}

/**
 * Export module
 * 
 */
export default App;