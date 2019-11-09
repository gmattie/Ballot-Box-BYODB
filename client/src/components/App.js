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
import { useDispatch } from "react-redux";
import * as C from "../support/constants";
import * as userActions from "../state/actions/userActions";
import ListContainer from "./list/ListContainer";
import React, { useEffect, useState } from "react";
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
     * Init
     * 
     */
    const [ render, setRender ] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {

        async function login(email, password) {

            await dispatch(userActions.login(email, password));

            setRender(true);
        }

        if (process.env.NODE_ENV === C.Local.ENV_DEVELOPMENT) {

            const authToken = process.env.REACT_APP_DEV_JWT;
            localStorage.setItem(C.Local.TOKEN, authToken);

            setRender(true);
        }
        else {

            login("", "");
        }
    }, [dispatch]);

    const [ webSocketMessage ] = useWebSocket();

    /**
     * JSX markup
     * 
     */
    if (render) {

        return (
            <>
                <div className={C.Style.APP}>
                    WebSocket Data: {webSocketMessage}
                </div>
                <ListContainer />
            </>
        );
    }

    return null;
};

/**
 * Export module
 * 
 */
export default App;