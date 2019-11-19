/**
 * @description Vote component.
 * 
 * @requires ListContainer
 * @requires react
 * @requires useWebSocket
 * @public
 * @module
 * 
 */
import ListContainer from "../../list/ListContainer";
import React from "react";
import useWebSocket from "../../../hooks/useWebSocket";

/**
 * @description The Vote component of the application.
 * 
 * @public
 * @function
 * 
 */
const Vote = () => {

    /**
     * Custom Hook
     * 
     */
    const { webSocketMessage } = useWebSocket();

    /**
     * JSX markup
     * 
     */
    return (
        <>
            WebSocket Data: {webSocketMessage}
            <ListContainer />
        </>
    );
};

/**
 * Export module
 * 
 */
export default Vote;