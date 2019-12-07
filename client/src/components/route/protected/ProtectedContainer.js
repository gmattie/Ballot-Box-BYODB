/**
 * @description ProtectedContainer component.
 * 
 * @requires Admin
 * @requires constants
 * @requires Edit
 * @requires react
 * @requires react-router-dom
 * @requires Results
 * @requires useUsers
 * @requires useWebSocket
 * @requires Vote

 * @public
 * @module
 * 
 */
import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom";
import * as C from "../../../support/constants";
import Admin from "./Admin";
import Edit from "./Edit";
import React, { useState } from "react";
import Results from "./Results";
import useUsers from "../../../hooks/useUsers";
import useWebSocket from "../../../hooks/useWebSocket";
import Vote from "./Vote";

/**
 * @description The ProtectedContainer component groups the UI components of the application that are only accessible via user authentication.
 * ProtectedContainer contains polling and user information, router links and all the other protected route components: Admin, Edit, Results and Vote.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const ProtectedContainer = () => {
    
    /**
     * State
     * 
     */
    const [ isLoading, setIsLoading ] = useState(false);

    /**
     * Hooks
     * 
     */
    const { path } = useRouteMatch();
    const { fetchLogout, usersSelf } = useUsers();
    const { webSocketMessage } = useWebSocket();
    const history = useHistory();

    /**
     * @description Retrieves a CSS style based on the hypertext reference link argument.
     * 
     * @param {string} href - A hypertext reference link.
     * @private
     * @function
     *  
     */
    const getButtonStyle = (href) => {

        const style = (href === path)
            ? C.Style.PROTECTED_CONTAINER_BUTTON_SELECTED
            : C.Style.PROTECTED_CONTAINER_BUTTON;

        return style;
    };

    /**
     * @description Creates a button with textual content, a click callback and a hypertext reference link.
     * 
     * @param {string} label - The button's textual content.
     * @param {function} callback - The function to execute when the button is clicked.
     * @param {string|null} href - A hypertext reference link.
     * @private
     * @function
     * 
     */
    const createButton = (label, callback, href) => {

        if (href === C.Route.ADMIN && !usersSelf.user.admin) {

            return null;
        }
 
        return (

            <button
                className={getButtonStyle(href)}
                onClick={callback.bind(null, href)}
            >
                {label}
            </button>
        );
    };

    /**
     * @description Adds a new route to the router history.
     * 
     * @param {string} route - the added route.
     * @private
     * @function
     * 
     */
    const addRouterHistory = (route) => {

        history.push(route);
    };

    /**
     * @description Logs out the user and redirects the the login page.
     * 
     * @async
     * @private
     * @function
     * 
     */
    const logout = async () => {

        setIsLoading(true);

        await fetchLogout();

        addRouterHistory(C.Route.LOGIN);
    };

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.PROTECTED_CONTAINER}>
            {(usersSelf && !isLoading) &&
                <>
                    <div className={C.Style.PROTECTED_CONTAINER_WEBSOCKET_MESSAGE}>
                        {webSocketMessage}
                    </div>

                    <div className={C.Style.PROTECTED_CONTAINER_USER_INFO}>
                        {JSON.stringify(usersSelf)}
                    </div>

                    <div>
                        {createButton(C.Label.VOTE, addRouterHistory, C.Route.VOTE)}
                        {createButton(C.Label.RESULTS, addRouterHistory, C.Route.RESULTS)}
                        {createButton(C.Label.ADMIN, addRouterHistory, C.Route.ADMIN)}
                        {createButton(C.Label.EDIT, addRouterHistory, C.Route.EDIT)}
                        {createButton(C.Label.LOGOUT, logout, null)}
                    </div>

                    <Switch>
                        <Route path={C.Route.VOTE}>
                            <Vote />
                        </Route>

                        <Route path={C.Route.RESULTS}>
                            <Results />
                        </Route>
                        
                        <Route path={C.Route.ADMIN}>
                            <Admin logout={logout} />
                        </Route>

                        <Route path={C.Route.EDIT}>
                            <Edit logout={logout} />
                        </Route>
                    </Switch>
                </>
            }

            {(!usersSelf || isLoading) &&
                <>
                    {/* TODO: Replace with style animation */}
                    <div>LOADING...</div>
                </>
            }
        </div>
    );
};

/**
 * Export module
 * 
 */
export default ProtectedContainer;