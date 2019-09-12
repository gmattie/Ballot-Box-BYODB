/**
 * @description The parent component of the application.
 * 
 * @requires constants
 * @requires react
 * @requires react-redux
 * @requires useWebSocket
 * @public
 * @module
 * 
 */
import * as C from "../support/constants";
import React from "react";
import useWebSocket from "../hooks/useWebSocket";
import { useSelector } from "react-redux";

/**
 * @description Displays messages pushed from the server via a WebSocket connection.
 * 
 * @public
 * @function
 * 
 */
const App = () => {

    useWebSocket();
    
    const webSocketMessage = useSelector((state) => state.webSocket[C.Action.Type.MESSAGE]);

    return (
        <div className={C.ClassName.APP}>
            WebSocket Data: {webSocketMessage}
        </div>
    );
};

/**
 * Export module
 * 
 */
export default App;