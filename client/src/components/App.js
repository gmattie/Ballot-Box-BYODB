/**
 * @description App component.
 * 
 * @requires constants
 * @requires ListContainer
 * @requires react
 * @requires react-redux
 * @requires useWebSocket
 * @public
 * @module
 * 
 */
import { useSelector } from "react-redux";
import * as C from "../support/constants";
import ListContainer from "./list/ListContainer";
import React from "react";
import useWebSocket from "../hooks/useWebSocket";

/**
 * @description The parent component of the application.
 * 
 * @public
 * @function
 * 
 */
const App = () => {

    /**
     * Initiate a WebSocket
     * 
     */
    useWebSocket();
    
    const webSocketMessage = useSelector((state) => state.webSocket[C.Action.Type.WEBSOCKET_MESSAGE]);

    /**
     * JSX markup
     * 
     */
    return (
        <>
            <div className={C.Style.APP}>
                WebSocket Data: {webSocketMessage}
            </div>
            <ListContainer />
        </>
    );
};

/**
 * Export module
 * 
 */
export default App;